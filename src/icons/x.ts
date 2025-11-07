import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["path", { d: "M18 6 6 18" }],
    ["path", { d: "m6 6 12 12" }],
];

export default createIcon("x", node);
