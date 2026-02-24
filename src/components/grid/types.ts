export interface GridItem {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    static?: boolean;
    minW?: number;
    minH?: number;
    maxW?: number;
    maxH?: number;
}

export interface GridLayout {
    items: GridItem[];
    cols: number;
    rowHeight: number;
    isDragging?: boolean;
    isResizing?: boolean;
}

export interface Bounds {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

export interface ResponsiveBreakpoint {
    name: string;
    cols: number;
    minWidth: number;
}
