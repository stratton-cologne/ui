// src/components/icons/file-xml.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";
import { fileBase } from "./_fileBase";

const node: IconNode = [
    ...fileBase,
    ["path", { d: "M9.5 12l-2 2 2 2" }],
    ["path", { d: "M14.5 12l2 2-2 2" }],
    ["path", { d: "M12 12v4" }],
];

export default createIcon("file-xml", node);
