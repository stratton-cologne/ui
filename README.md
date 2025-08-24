# @stratton-cologne/ui

Headless Vue 3 Komponenten (**ohne CSS**). Optional **Zero‑Config i18n** (automatische `vue-i18n`‑Erkennung via `globalInjection`). **Wildcard Subpath Exports** – keine per‑Komponente `exports` in der `package.json` nötig.

---

## Features

-   **Headless/Renderless**: Keine Styles, keine Klassen – Styling komplett in der Consumer‑App.
-   **Zero‑Config i18n (optional)**: Nutzt `app.config.globalProperties.$t` (wenn `vue-i18n` mit `globalInjection: true` eingebunden ist). Fallbacks, wenn kein i18n vorhanden.
-   **Wildcard Subpath Exports**: `@stratton-cologne/ui/<alias>` ohne jede Einzelpflege in `package.json`.
-   **Auto‑Entries**: Kleines Skript generiert `src/entries/*.ts` aus `src/components/*.vue` und einer optionalen `entries.map.json`.
-   **Vue 3 + Vite (Library Mode)**: ES/UMD Builds, Typs (`.d.ts`) inklusive; `vue`, `vue-router`, `vue-i18n` als Peer‑Deps.
-   **SSR‑safe**: Composables prüfen DOM/Storage.

---

## Installation

```bash
pnpm add @stratton-cologne/ui
# optional für Übersetzungen
pnpm add vue-i18n
```

---

## i18n Zero‑Config Setup (Consumer‑App)

```ts
// main.ts
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";

const messages = {
    de: {
        "sc.ui": {
            breadcrumb: {
                ariaLabel: "Brotkrumen",
                separator: "/",
                items: { home: "Start", products: "Produkte" },
            },
        },
    },
};

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "de",
    messages,
});

createApp(App)
    .use(i18n) // keine weitere UI-Plugin-Registrierung nötig
    .mount("#app");
```

> Ohne i18n funktioniert das Paket mit Fallback‑Strings (z. B. 'Breadcrumb', '›').

---

## Imports (Wildcard Subpaths)

**Kein manuelles Pflegen von `exports` mehr.** Jede gebaute Datei in `dist` ist als Subpath importierbar:

```ts
import ThemeSwitcher from "@stratton-cologne/ui/theme-switcher";
import Breadcrumb from "@stratton-cologne/ui/breadcrumb";
```

Zusätzlich existiert ein bequemer **Root‑Default** (zeigt auf ThemeSwitcher):

```ts
import ThemeSwitcher from "@stratton-cologne/ui";
```

---

## Quickstart im Template

```vue
<script setup lang="ts">
import ThemeSwitcher from "@stratton-cologne/ui/theme-switcher";
import Breadcrumb from "@stratton-cologne/ui/breadcrumb";
</script>

<template>
    <ThemeSwitcher v-slot="{ isDark, toggle }">
        <button class="btn" @click="toggle">{{ isDark ? "🌙" : "☀️" }}</button>
    </ThemeSwitcher>

    <Breadcrumb class="my-breadcrumb" />
</template>
```

> **Styling:** Dieses Paket liefert **keine** CSS‑Klassen. Nutze Tailwind/UnoCSS/SCSS/vanilla nach Bedarf.

---

## Komponenten

### `<Breadcrumb>` (headless, router‑aware, i18n‑aware)

**Props**

-   `items?: { path?: string; labelKey?: string; label?: string }[]`
-   `fromRouter?: boolean` – default: `true` (zieht Einträge aus `vue-router`)
-   `ariaLabel?: string` – überschreibt ARIA‑Label (sonst i18n `breadcrumb.ariaLabel` → Fallback `'Breadcrumb'`)
-   `separator?: string` – überschreibt Separator (sonst i18n `breadcrumb.separator` → Fallback `'›'`)

**Slots**

-   `item` – `{ item, index, isLast }` (Markup/Styling durch Consumer)
-   `separator` – eigener Separator zwischen Items

**Hinweise**

-   `labelKey` löst `sc.ui.breadcrumb.items.<labelKey>` auf; Fallback: `label` bzw. `labelKey`.

**Beispiel Styling**

```css
.my-breadcrumb ol {
    display: flex;
    gap: 0.5rem;
}
.my-breadcrumb a {
    text-decoration: none;
}
.my-breadcrumb .separator {
    opacity: 0.6;
}
```

### `<ThemeSwitcher>` (alias von `<ThemeToggle>`; renderless)

**Slot Props** `{ theme, isDark, toggle, setTheme }`

**Composable**: `useTheme()`

-   Setzt `data-theme="light|dark"` und toggelt `html.dark`.
-   Persistiert Auswahl in `localStorage` (Key: `app.theme`).

---

## Auto‑Entries & Aliase

Beim Build wird vorab `scripts/generate-entries.mjs` ausgeführt und legt `src/entries/*.ts` an.

-   **Ohne Konfiguration**: Jeder Component‑Dateiname (z. B. `ThemeToggle.vue`) ist automatisch unter seinem **kebab‑case** Subpath verfügbar (`@stratton-cologne/ui/theme-toggle`).
-   **Mit Alias‑Map**: Lege optional eine `entries.map.json` an, um Wunsch‑Aliase zu definieren.

**Beispiel `entries.map.json`**

```json
{
    "theme-switcher": "ThemeToggle.vue",
    "breadcrumb": "Breadcrumb.vue"
}
```

---

## TypeScript & Tree‑Shaking

-   Typs (`.d.ts`) werden generiert.
-   `exports: { "./*": "./dist/*.es.js" }` + `typesVersions` → saubere Subpath‑Typauflösung.
-   Peer‑Deps halten das Bundle klein: `vue`, `vue-router`, `vue-i18n` (i18n optional).

---

## Build lokal

```bash
pnpm run build
# führt automatisch: scripts/generate-entries.mjs → vite build
```

---

## Lizenz

MIT © Stratton Cologne

---

## Changelog
