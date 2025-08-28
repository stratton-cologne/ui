import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["path", { d: "m11 17-5-5 5-5" }],
    ["path", { d: "m18 17-5-5 5-5" }],
];

export default createIcon("chevrons-left", node);
