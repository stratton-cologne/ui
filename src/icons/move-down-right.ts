// src/icons/move-down-right.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["path", { d: "M13 19H19V13" }],
    ["path", { d: "M5 5L19 19" }],
];

export default createIcon("move-down-right", node);
