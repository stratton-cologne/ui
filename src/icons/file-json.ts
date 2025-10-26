// src/components/icons/file-json.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";
import { fileBase } from "./_fileBase";

const node: IconNode = [
    ...fileBase,
    ["path", { d: "M10 12c-1 0-1.5.5-1.5 1.5S9 15 10 15" }],
    ["path", { d: "M14 12c1 0 1.5.5 1.5 1.5S15 15 14 15" }],
    ["path", { d: "M11.5 11.5v4" }],
];

export default createIcon("file-json", node);
