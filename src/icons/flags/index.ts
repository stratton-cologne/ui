// src/icons/flags/index.ts
import { h, defineComponent } from "vue";
import { FLAG_ALIASES } from "./aliases";
import FlagIcon from "./FlagIcon.vue";
export { default as Flag } from "./flag.vue";

export type FlagRatio = "1x1" | "4x3";
const RATIO_DIR: Record<FlagRatio, string> = { "1x1": "1x1", "4x3": "4x3" };

export function normalizeCode(input: string): string {
    const raw = (input || "").trim();
    if (!raw) throw new Error("Leerer Code");
    const full = raw.toLowerCase();
    if (FLAG_ALIASES[full]) return FLAG_ALIASES[full];
    const base = full.split(/[-_]/)[0];
    const mapped = FLAG_ALIASES[base] ?? base;
    if (!/^[a-z]{2,3}$/.test(mapped)) {
        throw new Error(`Ungültiger Code: "${input}" → "${mapped}"`);
    }
    return mapped;
}

export function getFlagUrl(code: string, ratio: FlagRatio = "4x3"): string {
    const cc = normalizeCode(code);
    const dir = RATIO_DIR[ratio];
    return new URL(`./${dir}/${cc}.svg`, import.meta.url).toString();
}

export function getFlagIcon(code: string, ratio: FlagRatio = "4x3") {
    const normalized = normalizeCode(code);
    return defineComponent({
        name: `Flag_${normalized}_${ratio.replace("x", "_")}`,
        setup(_, { attrs, slots }) {
            return () =>
                h(
                    FlagIcon,
                    { code: normalized, ratio, ...attrs },
                    slots?.default ? { default: slots.default } : undefined
                );
        },
    });
}

export { FlagIcon };
