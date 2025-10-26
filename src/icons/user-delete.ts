// src/icons/user-x.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
    ["circle", { cx: "9", cy: "7", r: "4" }],
    ["line", { x1: "17", y1: "8", x2: "22", y2: "13" }],
    ["line", { x1: "22", y1: "8", x2: "17", y2: "13" }],
];

export default createIcon("user-x", node);
