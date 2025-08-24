import type { App } from "vue";
import { inject, getCurrentInstance } from "vue";
import {
    UI_DEFAULT_MESSAGES,
    UI_DEFAULT_NESTED,
    type LocaleDict,
} from "./i18n.defaults";

export type TranslateFn = (
    key: string,
    params?: Record<string, unknown>
) => string;
const UiI18nKey = Symbol("sc-ui-i18n");
const SC_UI_SENTINEL_KEY = "__sentinel__"; // Marker, um Installationsstatus je Locale zu erkennen
const SC_UI_PATCHED = "__scUiPatched"; // Marker, ob setLocaleMessage bereits gepatcht wurde

export interface UiI18nConfig {
    t?: TranslateFn;
    namespace?: string;
    defaults?: LocaleDict; // zusätzliche Defaults aus Consumer/anderen SC-UI-Modulen
}

/* ---------- helpers ---------- */
function pickStr(
    ...vals: Array<string | undefined | null>
): string | undefined {
    for (const v of vals) if (typeof v === "string" && v.length) return v;
    return undefined;
}
function interpolate(str: string, params?: Record<string, unknown>) {
    if (!params) return str;
    return str.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? `{${k}}`));
}
function resolveFromDict(
    dict: LocaleDict,
    key: string,
    locale?: string,
    fallbackLocale?: string
) {
    const lc = locale ?? "en";
    const fb = fallbackLocale ?? "en";
    return dict[lc]?.[key] ?? dict[fb]?.[key];
}
function normalizeLocale(v: unknown): string | undefined {
    if (typeof v === "string" && v) return v;
    if (Array.isArray(v))
        return v.find((x) => typeof x === "string") as string | undefined;
    return undefined;
}

/* ---------- plugin ---------- */
export function createUi(config: UiI18nConfig = {}) {
    const t = config.t ?? ((k: string) => k);
    const namespace = config.namespace ?? "sc.ui";

    const mergedDefaults: LocaleDict = { ...UI_DEFAULT_MESSAGES };
    if (config.defaults) {
        for (const lc of Object.keys(config.defaults)) {
            mergedDefaults[lc] = {
                ...(mergedDefaults[lc] ?? {}),
                ...config.defaults[lc],
            };
        }
    }
    return {
        install(app: App) {
            app.provide(UiI18nKey, {
                t,
                namespace,
                __defaults: mergedDefaults,
            });
        },
    };
}

/**
 * Sorgt dafür, dass die UI-Defaults in der angegebenen Locale vorhanden sind.
 * - erkennt per Sentinel, ob (noch) installiert
 * - mergen NESTED-Objekte (mergeLocaleMessage) + setzen Sentinel
 */
function ensureLocaleInstalled(composer: any, lc: string) {
    if (
        !composer ||
        typeof composer.getLocaleMessage !== "function" ||
        typeof composer.mergeLocaleMessage !== "function"
    )
        return;

    const msg = composer.getLocaleMessage(lc) || {};
    const hasSentinel = !!msg?.sc?.ui?.[SC_UI_SENTINEL_KEY];

    if (!hasSentinel) {
        const nested = UI_DEFAULT_NESTED[lc as "de" | "en"] || {};
        try {
            composer.mergeLocaleMessage(lc, nested);
            composer.mergeLocaleMessage(lc, {
                sc: { ui: { [SC_UI_SENTINEL_KEY]: true } },
            });
        } catch {
            /* ignore */
        }
    }
}

/**
 * Patcht setLocaleMessage so, dass nach JEDEM Ersetzen durch Drittmodule
 * unsere Defaults wieder installiert werden (idempotent).
 */
function patchSetLocaleMessage(composer: any) {
    if (!composer || (composer as any)[SC_UI_PATCHED]) return;
    const orig = composer.setLocaleMessage?.bind(composer);
    if (typeof orig !== "function") return;

    composer.setLocaleMessage = (lc: string, msgs: any) => {
        orig(lc, msgs);
        // direkt nach dem Replace unsere Defaults reinmergen
        ensureLocaleInstalled(composer, lc);
    };
    (composer as any)[SC_UI_PATCHED] = true;
}

/**
 * Priorität:
 * 1) App-i18n (wenn Key existiert, te === true) → keine Warnungen
 * 2) UI-Defaults (de/en), dynamisch & robust selbst installiert
 * 3) Fallback: Identity oder übergebener Fallback-Text
 */
export function useUiI18n(sub?: string) {
    const provided = inject<{
        t: TranslateFn;
        namespace: string;
        __defaults?: LocaleDict;
    }>(UiI18nKey, undefined as any);
    const inst = getCurrentInstance();
    const gp = inst?.appContext.config.globalProperties as any;

    const namespace = provided?.namespace ?? "sc.ui";
    const translate: TranslateFn =
        provided?.t ??
        (typeof gp?.$t === "function" ? gp.$t.bind(gp) : (k) => k);
    const defaults: LocaleDict = provided?.__defaults ?? UI_DEFAULT_MESSAGES;

    // vue-i18n (Composer bevorzugt, sonst legacy)
    const composer =
        gp?.$i18n?.global &&
        typeof gp.$i18n.global.getLocaleMessage === "function"
            ? gp.$i18n.global
            : gp?.$i18n && typeof gp.$i18n.getLocaleMessage === "function"
            ? gp.$i18n
            : null;

    // (1) setLocaleMessage patchen (einmalig), damit spätere Replaces durch Remote-Module abgefedert werden
    if (composer) patchSetLocaleMessage(composer);

    // (2) Relevante Locales bestimmen
    const currentLocale =
        pickStr(
            normalizeLocale(gp?.$i18n?.global?.locale?.value),
            normalizeLocale(gp?.$i18n?.locale),
            typeof navigator !== "undefined"
                ? navigator.language?.split("-")[0]
                : undefined
        ) ?? "en";

    const fallbackLocale =
        pickStr(
            normalizeLocale(gp?.$i18n?.global?.fallbackLocale?.value),
            normalizeLocale(gp?.$i18n?.fallbackLocale)
        ) ?? "en";

    // (3) Sicherstellen, dass unsere Defaults für aktuelle & Fallback-Locales vorhanden sind
    if (composer) {
        ensureLocaleInstalled(composer, currentLocale);
        if (fallbackLocale !== currentLocale)
            ensureLocaleInstalled(composer, fallbackLocale);
        // plus: immer de/en installierbar machen (kostenlos & idempotent)
        ensureLocaleInstalled(composer, "de");
        ensureLocaleInstalled(composer, "en");
    }

    // Hilfsfunktionen
    const te = (fullKey: string): boolean => {
        try {
            if (composer && typeof composer.te === "function")
                return composer.te(fullKey);
            if (gp?.$i18n?.global && typeof gp.$i18n.global.te === "function")
                return gp.$i18n.global.te(fullKey);
            if (gp?.$i18n && typeof gp.$i18n.te === "function")
                return gp.$i18n.te(fullKey);
        } catch {}
        return false;
    };

    const makeKey = (k: string) =>
        [namespace, sub, k].filter(Boolean).join(".");

    const t = (
        k: string,
        params?: Record<string, unknown>,
        fallback?: string
    ) => {
        const full = makeKey(k);

        // 1) App-Übersetzung falls vorhanden
        if (te(full)) return translate(full, params);

        // 1.5) Falls Remote-Module gerade ersetzt haben und Sentinel weg ist → nochmal sicherstellen & re-check
        if (composer) {
            ensureLocaleInstalled(composer, currentLocale);
            if (te(full)) return translate(full, params);
        }

        // 2) UI-Defaults
        const fromDefaults = resolveFromDict(
            defaults,
            full,
            currentLocale,
            fallbackLocale
        );
        if (fromDefaults) return interpolate(fromDefaults, params);

        // 3) Fallback
        return fallback ?? full;
    };

    return { t };
}
