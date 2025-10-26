// src/components/icons/chart-bar.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

/** Chart Bar */
const node: IconNode = [
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["path", { d: "M7 16h8" }],
    ["path", { d: "M7 11h12" }],
    ["path", { d: "M7 6h3" }],
];

export default createIcon("chart-bar", node);
