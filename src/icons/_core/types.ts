export type IconNode = Array<[tag: string, attrs?: Record<string, any>]>;

export interface IconProps {
    name?: string;
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
    class?: any;
    style?: any;
    title?: string; // setzt role/aria
}
