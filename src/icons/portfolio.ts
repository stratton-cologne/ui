// src/components/icons/portfolio.ts
import { createIcon } from "./_core/createIcon";
import type { IconNode } from "./_core/types";

/** Portfolio: Briefcase + kleine Performance-Balken */
const node: IconNode = [
    // Henkel
    ["path", { d: "M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }],
    // Korpus
    [
        "path",
        {
            d: "M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z",
        },
    ],
    // Deckellinie
    ["path", { d: "M3 13h18" }],
    // Balken im Inneren (Portfolio-„Performance“)
    ["path", { d: "M8 18v-4" }],
    ["path", { d: "M12 18v-6" }],
    ["path", { d: "M16 18v-3" }],
];

export default createIcon("portfolio", node);
