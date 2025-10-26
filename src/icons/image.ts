// src/components/icons/image.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }],
    ["circle", { cx: "9", cy: "9", r: "2" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }],
];

export default createIcon("image", node);
