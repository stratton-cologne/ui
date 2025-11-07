// src/icons/move-down.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["path", { d: "M8 18L12 22L16 18" }],
    ["path", { d: "M12 2V22" }],
];

export default createIcon("move-down", node);
