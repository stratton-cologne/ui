// src/icons/move-up-right.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["path", { d: "M13 5H19V11" }],
    ["path", { d: "M5 19L19 5" }],
];

export default createIcon("move-up-right", node);
