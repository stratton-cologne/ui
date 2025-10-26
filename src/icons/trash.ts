// src/components/icons/trash-2.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

/** Lucide "trash-2" */
const node: IconNode = [
    ["path", { d: "M10 11v6" }],
    ["path", { d: "M14 11v6" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
    ["path", { d: "M3 6h18" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }],
];

export default createIcon("trash", node);
