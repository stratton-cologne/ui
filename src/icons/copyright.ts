// src/icons/copyright.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    // Außenkreis
    ["circle", { cx: "12", cy: "12", r: "10" }],
    // "C" innen – halbkreisförmiger Bogen
    ["path", { d: "M15 9a4 4 0 1 0 0 6" }],
];

export default createIcon("copyright", node);
