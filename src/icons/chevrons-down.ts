import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["path", { d: "m7 6 5 5 5-5" }],
    ["path", { d: "m7 13 5 5 5-5" }],
];

export default createIcon("chevrons-down", node);
