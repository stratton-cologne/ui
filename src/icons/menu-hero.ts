import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    [
        "rect",
        {
            x: 3.6,
            y: 4.8,
            width: 14.4,
            height: 2.4,
            rx: 1.2,
            fill: "currentColor",
            stroke: "none",
        },
    ],
    [
        "rect",
        {
            x: 3.6,
            y: 10.8,
            width: 7.2,
            height: 2.4,
            rx: 1.2,
            fill: "currentColor",
            stroke: "none",
        },
    ],
    [
        "rect",
        {
            x: 3.6,
            y: 16.8,
            width: 14.4,
            height: 2.4,
            rx: 1.2,
            fill: "currentColor",
            stroke: "none",
        },
    ],
];

export default createIcon("menu-hero", node);
