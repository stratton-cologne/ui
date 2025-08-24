import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["path", { d: "M4 6h16" }],
    ["path", { d: "M4 12h16" }],
    ["path", { d: "M4 18h16" }],
];

export default createIcon("menu", node);
