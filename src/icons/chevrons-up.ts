import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["path", { d: "m17 11-5-5-5 5" }],
    ["path", { d: "m17 18-5-5-5 5" }],
];

export default createIcon("chevrons-up", node);
