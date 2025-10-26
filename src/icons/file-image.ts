// src/components/icons/file-image.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";
import { fileBase } from "./_fileBase";

const node: IconNode = [
    ...fileBase,
    ["rect", { x: "7.5", y: "9.5", width: "9", height: "9", rx: "1", ry: "1" }],
    ["circle", { cx: "10.5", cy: "12", r: "1.2" }],
    ["path", { d: "m8.5 18 3-3 2 2 2.5-2.5 1.5 1.5" }],
];

export default createIcon("file-image", node);
