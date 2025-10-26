// src/components/icons/file-presentation.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";
import { fileBase } from "./_fileBase";

const node: IconNode = [
    ...fileBase,
    ["rect", { x: "7.5", y: "10", width: "9", height: "6", rx: "1" }],
    ["path", { d: "M9 10v6" }],
    ["path", { d: "M9 12h7" }],
];

export default createIcon("file-presentation", node);
