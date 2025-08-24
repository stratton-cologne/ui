import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    // drei gefüllte Riegel mit leichten Rundungen (24er ViewBox)
    [
        "rect",
        {
            x: 4,
            y: 5,
            width: 16,
            height: 2,
            rx: 1,
            fill: "currentColor",
            stroke: "none",
        },
    ],
    [
        "rect",
        {
            x: 4,
            y: 11,
            width: 16,
            height: 2,
            rx: 1,
            fill: "currentColor",
            stroke: "none",
        },
    ],
    [
        "rect",
        {
            x: 4,
            y: 17,
            width: 16,
            height: 2,
            rx: 1,
            fill: "currentColor",
            stroke: "none",
        },
    ],
];

export default createIcon("menu-solid", node);
