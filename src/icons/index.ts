// Einzel-Exports (tree-shakebar)
export { default as Sun } from "./sun";
export { default as Moon } from "./moon";
export { default as Menu } from "./menu";
export { default as MenuSolid } from "./menu-solid";
export { default as MenuHero } from "./menu-hero";

// Default-Map (für <Icon name="...">)
import Sun from "./sun";
import Moon from "./moon";

import Menu from "./menu";
import MenuSolid from "./menu-solid";
import MenuHero from "./menu-hero";

export default {
    sun: Sun,
    moon: Moon,
    menu: Menu,
    "menu-solid": MenuSolid,
    "menu-hero": MenuHero,
};
