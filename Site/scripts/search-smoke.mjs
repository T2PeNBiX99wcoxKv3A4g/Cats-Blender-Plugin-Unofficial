import fs from "node:fs";

const [, , outPath, query, url] = process.argv;
const base = `http://127.0.0.1:${process.env.CDP_PORT ?? 9222}`;

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

await send("Runtime.enable");
await send("Page.enable");

// The first tab may be a browser promo; go to the page under test explicitly.
await send("Page.navigate", {url});
await new Promise((resolve) => setTimeout(resolve, 1200));

// Wait until React rendered the search box.
for (let attempt = 0; attempt < 60; attempt += 1) {
    const ready = await evaluate("Boolean(document.querySelector('input[aria-controls=\"cats-search-results\"]'))");
    if (ready) break;
    await new Promise((resolve) => setTimeout(resolve, 250));
}

await evaluate("document.querySelector('input[aria-controls=\"cats-search-results\"]').focus()");
await send("Input.insertText", {text: query});
await new Promise((resolve) => setTimeout(resolve, 500));

const listed = JSON.parse(
    await evaluate(`JSON.stringify({
        count: document.querySelectorAll('[role=option]').length,
        titles: [...document.querySelectorAll('[role=option]')].map((node) => node.innerText.split("\\n")[0]),
        snippetHasMark: Boolean(document.querySelector('[role=option] mark'))
    })`)
);

const shot = await send("Page.captureScreenshot", {format: "png"});
fs.writeFileSync(outPath, Buffer.from(shot.data, "base64"));

// Keyboard: second result, then Enter.
for (const type of ["keyDown", "keyUp"]) {
    await send("Input.dispatchKeyEvent", {
        type,
        key: "ArrowDown",
        code: "ArrowDown",
        windowsVirtualKeyCode: 40,
        nativeVirtualKeyCode: 40,
    });
}
await new Promise((resolve) => setTimeout(resolve, 150));
for (const type of ["keyDown", "keyUp"]) {
    await send("Input.dispatchKeyEvent", {
        type,
        key: "Enter",
        code: "Enter",
        windowsVirtualKeyCode: 13,
        nativeVirtualKeyCode: 13,
    });
}
await new Promise((resolve) => setTimeout(resolve, 400));

const after = JSON.parse(
    await evaluate(`JSON.stringify({
        hash: location.hash,
        searchStillOpen: Boolean(document.querySelector('[role=listbox]')),
        heading: document.querySelector('main h1')?.innerText ?? null
    })`)
);

console.log(JSON.stringify({listed, after}, null, 1));
socket.close();
