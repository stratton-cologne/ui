// src/icons/pencil.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

const node: IconNode = [
    // Grundform des Stifts (Pfad mit abgerundeten Ecken)
    [
        "path",
        {
            d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
        },
    ],
    // Schräger „Naht“-Strich
    ["path", { d: "m15 5 4 4" }],
];

export default createIcon("pencil", node);
