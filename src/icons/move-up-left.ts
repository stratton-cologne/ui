// src/icons/move-up-left.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["path", { d: "M5 11V5H11" }],
    ["path", { d: "M5 5L19 19" }],
];

export default createIcon("move-up-left", node);
