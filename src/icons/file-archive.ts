// src/components/icons/file-archive.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";
import { fileBase } from "./_fileBase";

const node: IconNode = [
    ...fileBase,
    ["rect", { x: "8", y: "10", width: "8", height: "10", rx: "1" }],
    ["path", { d: "M12 10v2" }],
    ["path", { d: "M12 14v2" }],
    ["path", { d: "M12 18v1" }],
];

export default createIcon("file-archive", node);
