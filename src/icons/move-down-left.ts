// src/icons/move-down-left.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["path", { d: "M11 19H5V13" }],
    ["path", { d: "M19 5L5 19" }],
];

export default createIcon("move-down-left", node);
