// src/components/icons/mouse-pointer.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

/** Mouse Pointer */
const node: IconNode = [
    ["path", { d: "M12.586 12.586 19 19" }],
    [
        "path",
        {
            d: "M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z",
        },
    ],
];

export default createIcon("mouse-pointer", node);
