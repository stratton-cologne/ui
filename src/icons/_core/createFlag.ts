import { h } from "vue";
import type { IconNode } from "./types";

/**
 * Wie createIcon – nur Name ist "flag-..." und standardmäßig NICHT monochrom.
 * Alle Farben kommen direkt aus den Node-Attributen (fill/stroke).
 */
export function createFlag(
    name: string,
    node: IconNode,
    viewBox = "0 0 24 24"
) {
    const Comp = (props: Record<string, any>) => {
        const attrs = {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox,
            fill: "none",
            stroke: "none",
            "aria-hidden": props["aria-label"] ? "false" : "true",
            role: "img",
            ...props,
        } as Record<string, any>;

        // freundlich zu Tailwind o.ä. – Icon-Größe steuerst du über class="h-5 w-5"
        if (!("width" in attrs)) attrs.width = "24";
        if (!("height" in attrs)) attrs.height = "24";

        return h(
            "svg",
            attrs,
            node.map(([tag, at]) => h(tag, at))
        );
    };
    (Comp as any).displayName = `Flag(${name})`;
    return Comp;
}
