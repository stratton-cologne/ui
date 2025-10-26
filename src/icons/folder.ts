// src/components/icons/folder.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    [
        "path",
        {
            d: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v7a3 3 0 0 1-3 3H5a2 2 0 0 1-2-2z",
        },
    ],
];

export default createIcon("folder", node);
