// src/components/icons/eye.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

/** Eye */
const node: IconNode = [
    [
        "path",
        {
            d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
        },
    ],
    ["circle", { cx: "12", cy: "12", r: "3" }],
];

export default createIcon("eye", node);
