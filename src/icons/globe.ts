// src/components/icons/globe.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

/** Globe */
const node: IconNode = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }],
    ["path", { d: "M2 12h20" }],
];

export default createIcon("globe", node);
