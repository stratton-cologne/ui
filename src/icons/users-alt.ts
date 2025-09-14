// src/icons/users-alt.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

/** Users (Outline) – Alternative zu deinem "users" (filled) */
const node: IconNode = [
    // Hauptgruppe (2 Personen)
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }],
    ["circle", { cx: "9", cy: "7", r: "4" }],

    // Sekundärperson rechts
    ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }],
    ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75" }],
];

export default createIcon("users-alt", node);
