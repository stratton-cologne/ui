// src/icons/move-left.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["path", { d: "M6 8L2 12L6 16" }],
    ["path", { d: "M2 12H22" }],
];

export default createIcon("move-left", node);
