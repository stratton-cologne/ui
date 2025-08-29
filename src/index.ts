// @file: src/index.ts

export * from "./composables/useTheme";
export * from "./i18n";

// entries | components
export { default as Breadcrumb } from "./entries/breadcrumb";
export { default as ThemeToggle } from "./entries/theme-toggle";
export { default as ThemeSwitcher } from "./entries/theme-toggle";
export { default as Dropdown } from "./components/dropdown.vue";
export { default as TabPanel } from "./components/tab-panel.vue";
export { default as Toolbar } from "./components/toolbar.vue";
export { default as SearchField } from "./components/search.vue";
export { default as Table } from "./components/table.vue";
export { default as Pagination } from "./components/pagination.vue";

// icons
export { default as Icon } from "./components/icon.vue";
export * as icons from "./icons";
export { Sun, Moon, Menu, MenuSolid, MenuHero, Home, Search } from "./icons";

export { default } from "./entries/theme-toggle";
