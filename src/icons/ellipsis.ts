import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["circle", { cx: 12, cy: 12, r: 1 }],
    ["circle", { cx: 19, cy: 12, r: 1 }],
    ["circle", { cx: 5, cy: 12, r: 1 }],
];

export default createIcon("ellipsis", node);
