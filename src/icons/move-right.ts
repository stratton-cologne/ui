// src/icons/move-right.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["path", { d: "M18 8L22 12L18 16" }],
    ["path", { d: "M2 12H22" }],
];

export default createIcon("move-right", node);
