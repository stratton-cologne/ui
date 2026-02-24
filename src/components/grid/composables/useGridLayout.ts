import { ref, computed, reactive } from "vue";
import type { GridItem, ResponsiveBreakpoint } from "../types";

const DEFAULT_BREAKPOINTS: ResponsiveBreakpoint[] = [
    { name: "xs", cols: 4, minWidth: 0 },
    { name: "md", cols: 8, minWidth: 768 },
    { name: "lg", cols: 12, minWidth: 1024 },
];

const DEFAULT_ROW_HEIGHT = 30;

export function useGridLayout(
    storageKey: string = "grid-layout",
    breakpoints: ResponsiveBreakpoint[] = DEFAULT_BREAKPOINTS,
    rowHeight: number = DEFAULT_ROW_HEIGHT,
) {
    const items = ref<GridItem[]>([]);
    const cols = ref(12);
    const rowHeight_ = ref(rowHeight);
    const draggingId = ref<string | null>(null);
    const resizingId = ref<string | null>(null);
    const dragOffset = reactive({ x: 0, y: 0 });

    const sortedBreakpoints = computed(() =>
        [...breakpoints].sort((a, b) => b.minWidth - a.minWidth),
    );

    const currentBreakpoint = ref<ResponsiveBreakpoint>(
        breakpoints[breakpoints.length - 1],
    );

    function updateBreakpoint(width: number) {
        for (const bp of sortedBreakpoints.value) {
            if (width >= bp.minWidth) {
                currentBreakpoint.value = bp;
                cols.value = bp.cols;
                break;
            }
        }
    }

    function loadLayout() {
        try {
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                items.value = JSON.parse(stored);
            }
        } catch (error) {
            console.warn("Failed to load grid layout:", error);
        }
    }

    function saveLayout() {
        try {
            localStorage.setItem(storageKey, JSON.stringify(items.value));
        } catch (error) {
            console.warn("Failed to save grid layout:", error);
        }
    }

    function addItem(item: GridItem) {
        items.value.push(item);
        saveLayout();
    }

    function removeItem(id: string) {
        items.value = items.value.filter((item) => item.id !== id);
        saveLayout();
    }

    function updateItem(id: string, updates: Partial<GridItem>) {
        const item = items.value.find((i) => i.id === id);
        if (item) {
            Object.assign(item, updates);
            saveLayout();
        }
    }

    function getItemById(id: string) {
        return items.value.find((i) => i.id === id);
    }

    function isColliding(
        x: number,
        y: number,
        w: number,
        h: number,
        excludeId?: string,
    ): boolean {
        return items.value.some((item) => {
            if (item.id === excludeId) return false;
            return !(
                x + w <= item.x ||
                x >= item.x + item.w ||
                y + h <= item.y ||
                y >= item.y + item.h
            );
        });
    }

    function compactLayout() {
        const sorted = [...items.value].sort((a, b) => {
            if (a.y !== b.y) return a.y - b.y;
            return a.x - b.x;
        });

        const placed = new Set<string>();

        for (const item of sorted) {
            if (placed.has(item.id)) continue;

            let placed_ = false;
            for (let y = 0; y <= 100; y++) {
                for (let x = 0; x <= cols.value - item.w; x++) {
                    if (!isColliding(x, y, item.w, item.h, item.id)) {
                        item.x = x;
                        item.y = y;
                        placed_ = true;
                        placed.add(item.id);
                        break;
                    }
                }
                if (placed_) break;
            }
        }

        saveLayout();
    }

    function clearLayout() {
        items.value = [];
        localStorage.removeItem(storageKey);
    }

    return {
        items,
        cols,
        rowHeight: rowHeight_,
        draggingId,
        resizingId,
        dragOffset,
        currentBreakpoint,
        loadLayout,
        saveLayout,
        addItem,
        removeItem,
        updateItem,
        getItemById,
        isColliding,
        compactLayout,
        clearLayout,
        updateBreakpoint,
    };
}
