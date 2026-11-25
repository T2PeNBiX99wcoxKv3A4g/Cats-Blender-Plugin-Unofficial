// Phone layout regression: drives a live copy of the site through the Chrome DevTools
// protocol and checks the things that break when the top bar is restyled — the header row,
// the tap targets, the collapsed navigation, and the search panel on a short screen.
//
//   npm run preview
//   msedge --headless=new --remote-debugging-port=9222 about:blank
//   CDP_PORT=9222 node scripts/mobile-smoke.mjs "http://localhost:4173/Cats-Blender-Plugin-Unofficial/?lang=en"
import fs from "node:fs";

const [, , origin = "http://localhost:4173/Cats-Blender-Plugin-Unofficial/?lang=en", outPath] = process.argv;
const base = `http://127.0.0.1:${process.env.CDP_PORT ?? 9222}`;
const MIN_TAP = 40;

const PHONES = [
    [320, 640],
    [360, 740],
    [375, 667],
    [390, 844],
    [414, 896],
    [480, 900],
    [540, 960],
];

async function waitForTarget() {
    for (let attempt = 0; attempt < 40; attempt += 1) {
        try {
            const list = await (await fetch(`${base}/json`)).json();
            const page = list.find((item) => item.type === "page" && item.webSocketDebuggerUrl);
            if (page) return page;
        } catch {
            // browser still starting
        }
        await new Promise((resolve) => setTimeout(resolve, 250));
    }
    throw new Error("no debuggable page");
}

const page = await waitForTarget();
const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, {once: true});
    socket.addEventListener("error", reject, {once: true});
});

let nextId = 1;
const pending = new Map();
socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
        const {resolve, reject} = pending.get(message.id);
        pending.delete(message.id);
        if (message.error) reject(new Error(JSON.stringify(message.error)));
        else resolve(message.result);
    }
});

function send(method, params = {}) {
    const id = nextId++;
    socket.send(JSON.stringify({id, method, params}));
    return new Promise((resolve, reject) => pending.set(id, {resolve, reject}));
}

const evaluate = async (expression) => {
    const result = await send("Runtime.evaluate", {expression, returnByValue: true, awaitPromise: true});
    return result.result?.value;
};

const json = async (expression) => JSON.parse(await evaluate(`JSON.stringify(${expression})`));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

await send("Runtime.enable");
await send("Page.enable");

const failures = [];
const check = (label, ok, detail) => {
    if (!ok) failures.push(`${label}${detail === undefined ? "" : ` (${JSON.stringify(detail)})`}`);
};

/* --- top bar at every phone width ---------------------------------------- */

const rows = [];
for (const [width, height] of PHONES) {
    await send("Emulation.setDeviceMetricsOverride", {width, height, deviceScaleFactor: 2, mobile: true});
    await send("Page.navigate", {url: origin});
    await sleep(900);

    const row = await json(`(() => {
        const header = document.querySelector("header");
        const brand = document.querySelector("header a").getBoundingClientRect();
        const menu = document.querySelector("header button[aria-expanded]").getBoundingClientRect();
        const select = document.querySelector("header select").getBoundingClientRect();
        return {
            width: window.innerWidth,
            headerHeight: Math.round(header.getBoundingClientRect().height),
            oneRow: Math.abs(brand.top - menu.top) < 20,
            selectHeight: Math.round(select.height),
            menuWidth: Math.round(menu.width),
            menuHeight: Math.round(menu.height),
            brandRight: Math.round(brand.right),
            menuRight: Math.round(menu.right),
            scrollWidth: document.documentElement.scrollWidth,
            headerFits: Math.round(menu.right) <= window.innerWidth - 8
        };
    })()`);

    rows.push(row);
    check(`${row.width}px: top bar is one row`, row.oneRow, row);
    check(`${row.width}px: header does not overflow`, row.headerFits && row.scrollWidth === row.width, row);
    check(`${row.width}px: header stays short`, row.headerHeight <= 112, row.headerHeight);
    check(`${row.width}px: language selector is tappable`, row.selectHeight >= MIN_TAP, row.selectHeight);
    check(
        `${row.width}px: menu button is tappable`,
        row.menuWidth >= MIN_TAP && row.menuHeight >= MIN_TAP,
        [row.menuWidth, row.menuHeight]
    );
}

/* --- collapsed navigation ------------------------------------------------ */

await send("Emulation.setDeviceMetricsOverride", {width: 390, height: 844, deviceScaleFactor: 2, mobile: true});
await send("Page.navigate", {url: origin});
await sleep(900);

const closed = await json(`(() => ({
    aside: getComputedStyle(document.querySelector("aside")).display,
    glyph: getComputedStyle(document.querySelector("header button[aria-expanded] span")).maskImage
}))()`);
check("navigation starts collapsed", closed.aside === "none", closed);

await evaluate(`document.querySelector("header button[aria-expanded]").click()`);
await sleep(500);

const opened = await json(`(() => {
    const toggle = document.querySelector("header button[aria-expanded]");
    const aside = document.querySelector("aside");
    const links = [...aside.querySelectorAll("a")];
    const glyph = getComputedStyle(toggle.querySelector("span")).maskImage;
    return {
        expanded: toggle.getAttribute("aria-expanded"),
        aside: getComputedStyle(aside).display,
        glyph,
        shortLinks: links.filter((link) => link.getBoundingClientRect().height < ${MIN_TAP - 4}).length,
        overflowX: getComputedStyle(aside).overflowX
    };
})()`);

check("menu opens the navigation", opened.expanded === "true" && opened.aside === "block", opened);
check("open menu shows the close glyph", /close/.test(opened.glyph), opened.glyph);
check("navigation links are tappable", opened.shortLinks === 0, opened.shortLinks);
check("navigation does not scroll sideways", opened.overflowX === "hidden", opened.overflowX);

if (outPath) {
    const shot = await send("Page.captureScreenshot", {format: "png"});
    fs.writeFileSync(`${outPath}-nav.png`, Buffer.from(shot.data, "base64"));
}

await evaluate(`document.querySelectorAll("aside a")[5].click()`);
await sleep(700);
const navigated = await json(`(() => ({
    hash: location.hash,
    expanded: document.querySelector("header button[aria-expanded]").getAttribute("aria-expanded"),
    aside: getComputedStyle(document.querySelector("aside")).display
}))()`);
check("choosing a page closes the navigation", navigated.expanded === "false" && navigated.aside === "none", navigated);

/* --- search panel on the smallest screen -------------------------------- */

await send("Emulation.setDeviceMetricsOverride", {width: 375, height: 667, deviceScaleFactor: 2, mobile: true});
await send("Page.navigate", {url: origin});
await sleep(900);
await evaluate(`document.querySelector('input[aria-controls="cats-search-results"]').focus()`);
await send("Input.insertText", {text: "bone"});
await sleep(500);

const panel = await json(`(() => {
    const list = document.querySelector("[role=listbox]");
    const box = list.getBoundingClientRect();
    const style = getComputedStyle(list);
    return {
        optionCount: document.querySelectorAll("[role=option]").length,
        top: Math.round(box.top),
        bottom: Math.round(box.bottom),
        viewport: window.innerHeight,
        overflowY: style.overflowY,
        background: style.backgroundColor,
        scrollable: list.scrollHeight > list.clientHeight
    };
})()`);

check("search lists results", panel.optionCount > 0, panel.optionCount);
check("results stay inside the screen", panel.bottom <= panel.viewport, panel);
check("results scroll when they do not fit", panel.scrollable && panel.overflowY === "auto", panel);
check("results panel is opaque", panel.background === "rgb(11, 15, 25)", panel.background);

await evaluate(`(() => {
    const list = document.querySelector("[role=listbox]");
    list.scrollTop = list.scrollHeight;
})()`);
await sleep(300);

const lastOption = await json(`(() => {
    const options = [...document.querySelectorAll("[role=option]")];
    const last = options[options.length - 1].getBoundingClientRect();
    return {bottom: Math.round(last.bottom), viewport: window.innerHeight};
})()`);
check("last result can be scrolled into view", lastOption.bottom <= lastOption.viewport, lastOption);

if (outPath) {
    const shot = await send("Page.captureScreenshot", {format: "png"});
    fs.writeFileSync(`${outPath}-search.png`, Buffer.from(shot.data, "base64"));
}

/* --- documentation index ------------------------------------------------- */

await send("Page.navigate", {url: `${origin.split("#")[0]}#/docs`});
await sleep(1000);

const index = await json(`(() => {
    const links = [...document.querySelectorAll("main ul a")];
    return {
        count: links.length,
        short: links.filter((link) => link.getBoundingClientRect().height < 30).length
    };
})()`);
check("documentation links are tappable", index.short === 0, index);

const report = {rows, failures};
console.log(JSON.stringify(report, null, 1));
socket.close();

if (failures.length) {
    console.error(`${failures.length} check(s) failed`);
    process.exitCode = 1;
} else {
    console.log("mobile layout ok");
}
