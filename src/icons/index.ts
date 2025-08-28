// @file: src/icons/index.ts

// Einzel-Exports (tree-shakebar)
export { default as Sun } from "./sun";
export { default as Moon } from "./moon";
export { default as Menu } from "./menu";
export { default as MenuSolid } from "./menu-solid";
export { default as MenuHero } from "./menu-hero";
export { default as Home } from "./home";
export { default as User } from "./user";
export { default as Users } from "./users";
export { default as Share } from "./share";
export { default as Ellipsis } from "./ellipsis";

export { default as ChevronDown } from "./chevron-down";
export { default as ChevronUp } from "./chevron-up";
export { default as ChevronLeft } from "./chevron-left";
export { default as ChevronRight } from "./chevron-right";
export { default as ChevronsDown } from "./chevrons-down";
export { default as ChevronsUp } from "./chevrons-up";
export { default as ChevronsLeft } from "./chevrons-left";
export { default as ChevronsRight } from "./chevrons-right";

export { default as Search } from "./search";

// Default-Map (für <Icon name="...">)
import Sun from "./sun";
import Moon from "./moon";

import Menu from "./menu";
import MenuSolid from "./menu-solid";
import MenuHero from "./menu-hero";
import Home from "./home";
import User from "./user";
import Users from "./users";
import Share from "./share";
import Ellipsis from "./ellipsis";

import ChevronDown from "./chevron-down";
import ChevronUp from "./chevron-up";
import ChevronLeft from "./chevron-left";
import ChevronRight from "./chevron-right";
import ChevronsDown from "./chevrons-down";
import ChevronsUp from "./chevrons-up";
import ChevronsLeft from "./chevrons-left";
import ChevronsRight from "./chevrons-right";

import Search from "./search";

export default {
    sun: Sun,
    moon: Moon,
    menu: Menu,
    "menu-solid": MenuSolid,
    "menu-hero": MenuHero,
    "home-hero": Home,
    home: Home,
    user: User,
    users: Users,
    share: Share,
    ellipsis: Ellipsis,

    // single chevrons
    "chevron-down": ChevronDown,
    "chevron-up": ChevronUp,
    "chevron-left": ChevronLeft,
    "chevron-right": ChevronRight,

    // double chevrons (canonical keys)
    "chevrons-down": ChevronsDown,
    "chevrons-up": ChevronsUp,
    "chevrons-left": ChevronsLeft,
    "chevrons-right": ChevronsRight,

    // 🇩🇪 deutsche Aliasse
    "chevron-doppel-down": ChevronsDown,
    "chevron-doppel-up": ChevronsUp,
    "chevron-doppel-left": ChevronsLeft,
    "chevron-doppel-right": ChevronsRight,

    // 🇬🇧 englische Aliasse
    "chevron-double-down": ChevronsDown,
    "chevron-double-up": ChevronsUp,
    "chevron-double-left": ChevronsLeft,
    "chevron-double-right": ChevronsRight,

    search: Search,
};
