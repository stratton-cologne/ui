// src/icons/home-alt.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

/** Home (Outline) – alternative zu deinem bestehenden "home" (filled) */
const node: IconNode = [
    ["path", { d: "M3 9l9-7 9 7" }], // Dach
    ["path", { d: "M2 22h20" }], // Bodenlinie
    ["path", { d: "M5 22V11h14v11" }], // Außenwände
    ["path", { d: "M9 22V15h6v7" }], // Tür/Innen
];

export default createIcon("home-alt", node);
