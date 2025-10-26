// src/components/icons/file-video.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";
import { fileBase } from "./_fileBase";

const node: IconNode = [
    ...fileBase,
    ["rect", { x: "7.5", y: "10", width: "9", height: "6", rx: "1" }],
    ["polygon", { points: "12 11.5 12 14.5 14.5 13" }],
    ["rect", { x: "7.5", y: "16.5", width: "9", height: "2" }],
];

export default createIcon("file-video", node);
