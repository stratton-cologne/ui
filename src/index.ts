// index.ts

export * from "./composables/useTheme";
export * from "./i18n";

// entries | components
export { default as ThemeToggle } from "./entries/theme-toggle";
export { default as ThemeSwitcher } from "./entries/theme-toggle";
export { default as Dropdown } from "./components/dropdown.vue";

// icons
export { default as Icon } from "./components/icon.vue";
export * as icons from "./icons";
export { Sun, Moon, Menu, MenuSolid, MenuHero } from "./icons";
