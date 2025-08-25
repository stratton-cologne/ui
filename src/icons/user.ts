import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    [
        "path",
        {
            d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z",
            fill: "currentColor",
            stroke: "none",
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            transform: "scale(1.2)",
        },
    ],
];

export default createIcon("user", node);
