// src/icons/move-up.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["path", { d: "M8 6L12 2L16 6" }],
    ["path", { d: "M12 2V22" }],
];

export default createIcon("move-up", node);
