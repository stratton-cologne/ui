// src/components/icons/file-text.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";
import { fileBase } from "./_fileBase";

const node: IconNode = [
    ...fileBase,
    ["path", { d: "M8 9h7" }],
    ["path", { d: "M8 13h8" }],
    ["path", { d: "M8 17h8" }],
];

export default createIcon("file-text", node);
