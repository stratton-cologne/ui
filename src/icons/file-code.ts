// src/components/icons/file-code.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";
import { fileBase } from "./_fileBase";

const node: IconNode = [
    ...fileBase,
    ["path", { d: "M10 11l-2 2 2 2" }],
    ["path", { d: "M14 11l2 2-2 2" }],
    ["path", { d: "M12 10.5l-1 7" }],
];

export default createIcon("file-code", node);
