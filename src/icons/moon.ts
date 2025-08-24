import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

// klassische Mondsichel
const node: IconNode = [
    ["path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" }],
];

export default createIcon("moon", node);
