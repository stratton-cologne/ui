// src/components/icons/file.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";
import { fileBase } from "./_fileBase";

const node: IconNode = [
    ...fileBase,
    // neutrale „Datei“-Andeutung (drei Zeilen)
    ["path", { d: "M8 10h8" }],
    ["path", { d: "M8 14h8" }],
    ["path", { d: "M8 18h6" }],
];

export default createIcon("file", node);
