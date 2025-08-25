import { defineComponent, h, mergeProps } from "vue";
import type { IconNode, IconProps } from "./types";

export function createIcon(iconName: string, iconNode: IconNode) {
    return defineComponent<IconProps>({
        name: pascal(`${iconName}-icon`),
        inheritAttrs: false,
        props: {
            size: { type: [Number, String], default: 24 },
            color: { type: String, default: "currentColor" },
            strokeWidth: { type: [Number, String], default: 2 },
            absoluteStrokeWidth: { type: Boolean, default: false },
            title: { type: String, default: "" },
        } as any,
        setup(props, { attrs }) {
            const s = normalizeSize(props.size);
            const sw = Number(props.strokeWidth);
            const w = Number(s);
            const adjStroke =
                props.absoluteStrokeWidth && w ? (sw * 24) / w : sw;

            const baseSvg = {
                xmlns: "http://www.w3.org/2000/svg",
                width: s,
                height: s,
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: props.color,
                "stroke-width": adjStroke,
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                role: props.title ? "img" : undefined,
                "aria-hidden": props.title ? undefined : "true",
                "aria-label": props.title || undefined,
                style: props.color ? { color: props.color } : undefined,
            };

            const children = iconNode.map(([tag, attributes]) =>
                h(tag, attributes)
            );
            if (props.title) children.unshift(h("title", null, props.title));

            return () => h("svg", mergeProps(baseSvg, attrs), children);
        },
    });
}

function normalizeSize(v?: number | string): string | number {
    if (v == null) return 24;
    if (typeof v === "number") return v;
    const trimmed = String(v).trim();
    if (/^\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
    return trimmed;
}
function pascal(s: string) {
    return s.replace(/(^\w|[-_]\w)/g, (m) =>
        m.replace(/[-_]/, "").toUpperCase()
    );
}
