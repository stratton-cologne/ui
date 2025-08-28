import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["path", { d: "m21 21-4.34-4.34" }],
    ["circle", { cx: 11, cy: 11, r: 8 }],
];

export default createIcon("search", node);
