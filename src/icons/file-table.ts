// src/components/icons/file-table.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";
import { fileBase } from "./_fileBase";

const node: IconNode = [
    ...fileBase,
    ["rect", { x: "8", y: "10", width: "8", height: "8", rx: "0.8" }],
    ["path", { d: "M8 13h8" }],
    ["path", { d: "M12 10v8" }],
];

export default createIcon("file-table", node);
