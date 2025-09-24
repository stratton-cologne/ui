// src/icons/line-chart.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["path", { d: "M3 3v18h18" }],
    ["path", { d: "m19 9-5 5-4-4-3 3" }],
];

export default createIcon("line-chart", node);
