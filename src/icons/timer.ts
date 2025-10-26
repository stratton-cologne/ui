// src/components/icons/timer.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

/** Timer */
const node: IconNode = [
    ["line", { x1: "10", y1: "2", x2: "14", y2: "2" }],
    ["line", { x1: "12", y1: "14", x2: "15", y2: "11" }],
    ["circle", { cx: "12", cy: "14", r: "8" }],
];

export default createIcon("timer", node);
