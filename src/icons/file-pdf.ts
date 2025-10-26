// src/components/icons/file-pdf.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";
import { fileBase } from "./_fileBase";

const node: IconNode = [
    ...fileBase,
    ["path", { d: "M16.5 10v6l-2-1-2 1v-6" }],
    ["path", { d: "M8 11h3" }],
    ["path", { d: "M8 15h3" }],
];

export default createIcon("file-pdf", node);
