import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["path", { d: "m13 17 5-5-5-5" }],
    ["path", { d: "m6 17 5-5-5-5" }],
];

export default createIcon("chevrons-right", node);
