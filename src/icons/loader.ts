// src/icons/loader.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["path", { d: "M12 2v4" }],
    ["path", { d: "m16.2 7.8 2.9-2.9" }],
    ["path", { d: "M18 12h4" }],
    ["path", { d: "m16.2 16.2 2.9 2.9" }],
    ["path", { d: "M12 18v4" }],
    ["path", { d: "m4.9 19.1 2.9-2.9" }],
    ["path", { d: "M2 12h4" }],
    ["path", { d: "m4.9 4.9 2.9 2.9" }],
];

export default createIcon("loader", node);
