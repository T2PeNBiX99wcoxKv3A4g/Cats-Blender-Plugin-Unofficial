import en from "./i18n/en.json";
import zhTW from "./i18n/zh-TW.json";

const copy: Record<string, Record<string, string>> = {
    en,
    "zh-TW": zhTW,
};

export type Language = {id: string; label: string};

export const languages: Language[] = [
    {id: "en", label: "English"},
    {id: "zh-TW", label: "繁體中文"},
];

/** Site text for the given language, falling back to English per key. */
export function translate(language: string, key: string): string {
    return copy[language]?.[key] ?? en[key as keyof typeof en] ?? key;
}

export function detectLanguage(stored: string | null, browser: string): string {
    const available = languages.map((language) => language.id);
    if (stored && available.includes(stored)) return stored;

    for (const candidate of [browser, browser.split("-")[0]]) {
        const match = available.find((id) => id.toLowerCase() === candidate.toLowerCase());
        if (match) return match;
    }
    return "en";
}
