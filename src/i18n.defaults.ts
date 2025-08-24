import enNested from "./locales/en.json";
import deNested from "./locales/de.json";

export type LocaleDict = Record<string, Record<string, string>>;

type AnyRecord = Record<string, any>;
function flatten(obj: AnyRecord, prefix = ""): Record<string, string> {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(obj)) {
        const key = prefix ? `${prefix}.${k}` : k;
        if (v !== null && typeof v === "object" && !Array.isArray(v)) {
            Object.assign(out, flatten(v, key));
        } else {
            out[key] = String(v);
        }
    }
    return out;
}

export const UI_DEFAULT_NESTED = {
    en: enNested,
    de: deNested,
};

export const UI_DEFAULT_MESSAGES: LocaleDict = {
    en: flatten(enNested as AnyRecord),
    de: flatten(deNested as AnyRecord),
};
