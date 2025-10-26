// src/components/icons/file-markdown.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";
import { fileBase } from "./_fileBase";

const node: IconNode = [
    ...fileBase,
    ["rect", { x: "8", y: "10", width: "8", height: "6", rx: "1" }],
    ["path", { d: "M9 15v-3l1.5 2L12 12v3" }],
    ["path", { d: "M13.5 12.5L15 14l-1.5 1.5" }],
];

export default createIcon("file-markdown", node);
