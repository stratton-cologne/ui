// src/components/icons/file-audio.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";
import { fileBase } from "./_fileBase";

const node: IconNode = [
    ...fileBase,
    ["circle", { cx: "10", cy: "17", r: "1.6" }],
    ["path", { d: "M12 16V11h4v-2h-4v7" }],
    ["rect", { x: "14.5", y: "11", width: "0.01", height: "0.01" }], // noop, just to balance stroke joins (optional)
];

export default createIcon("file-audio", node);
