<template>
    <div class="grid-layout" :style="containerStyle" ref="container">
        <div class="grid-container" :style="gridStyle">
            <GridItem
                v-for="item in layout.items.value"
                :key="item.id"
                :item="item"
                :cols="layout.cols.value"
                :row-height="layout.rowHeight.value"
                :container-width="containerWidth"
                :is-dragging="layout.draggingId.value === item.id"
                :is-resizing="layout.resizingId.value === item.id"
                @drag-start="handleItemDragStart(item.id, $event)"
                @drag="handleItemDrag(item.id, $event)"
                @drag-end="handleItemDragEnd(item.id)"
                @resize-start="handleItemResizeStart(item.id, $event)"
                @resize="handleItemResize(item.id, $event)"
                @resize-end="handleItemResizeEnd(item.id)"
            >
                <slot :item="item" />
            </GridItem>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, CSSProperties } from 'vue';
import GridItem from './GridItem.vue';
import { useGridLayout } from './composables/useGridLayout';
import type { GridItem as IGridItem, ResponsiveBreakpoint } from './types';

interface Props {
    modelValue?: IGridItem[];
    storageKey?: string;
    breakpoints?: ResponsiveBreakpoint[];
    rowHeight?: number;
    margin?: [number, number];
    compactType?: 'vertical' | 'horizontal' | null;
    autoCompact?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    storageKey: 'grid-layout',
    rowHeight: 30,
    margin: () => [10, 10],
    compactType: 'vertical',
    autoCompact: true,
});

const emit = defineEmits<{
    'update:modelValue': [items: IGridItem[]];
    'change': [items: IGridItem[]];
}>();

const container = ref<HTMLElement>();
const containerWidth = ref(0);

const layout = useGridLayout(props.storageKey, props.breakpoints, props.rowHeight);

const containerStyle = computed<CSSProperties>(() => {
    const maxY = Math.max(
        ...layout.items.value.map((i) => (i.y + i.h) * layout.rowHeight.value),
        layout.rowHeight.value
    );
    return {
        position: 'relative',
        width: '100%',
        height: `${maxY + props.margin[1] * 2}px`,
    };
});

const gridStyle = computed<CSSProperties>(() => ({
    position: 'relative',
    width: '100%',
    height: '100%',
}));

const dragStartItem = ref<IGridItem | null>(null);
const dragStartXY = ref({ x: 0, y: 0 });
const resizeStartItem = ref<IGridItem | null>(null);

function handleItemDragStart(id: string, e: MouseEvent) {
    const item = layout.getItemById(id);
    if (item && !item.static) {
        dragStartItem.value = { ...item };
        dragStartXY.value = { x: item.x, y: item.y };
        layout.draggingId.value = id;
    }
}

function handleItemDrag(id: string, event: { deltaX: number; deltaY: number }) {
    const item = layout.getItemById(id);
    if (!item || !dragStartItem.value || item.static) return;

    const colWidth = containerWidth.value / layout.cols.value;
    const newX = Math.max(
        0,
        Math.min(
            dragStartXY.value.x + Math.round(event.deltaX / colWidth),
            layout.cols.value - item.w
        )
    );
    const newY = Math.max(0, dragStartXY.value.y + Math.round(event.deltaY / layout.rowHeight.value));

    if (!layout.isColliding(newX, newY, item.w, item.h, item.id)) {
        item.x = newX;
        item.y = newY;
    }
}

function handleItemDragEnd(id: string) {
    layout.draggingId.value = null;
    dragStartItem.value = null;

    if (props.autoCompact && props.compactType) {
        layout.compactLayout();
    }

    layout.saveLayout();
    emitChange();
}

function handleItemResizeStart(id: string, e: MouseEvent) {
    const item = layout.getItemById(id);
    if (item && !item.static) {
        resizeStartItem.value = { ...item };
        layout.resizingId.value = id;
    }
}

function handleItemResize(id: string, event: { deltaX: number; deltaY: number }) {
    const item = layout.getItemById(id);
    if (!item || !resizeStartItem.value || item.static) return;

    const colWidth = containerWidth.value / layout.cols.value;
    const newW = Math.max(
        item.minW ?? 1,
        Math.min(
            resizeStartItem.value.w + Math.round(event.deltaX / colWidth),
            layout.cols.value - item.x,
            item.maxW ?? layout.cols.value
        )
    );
    const newH = Math.max(
        item.minH ?? 1,
        resizeStartItem.value.h + Math.round(event.deltaY / layout.rowHeight.value),
        item.maxH ?? Infinity
    );

    if (!layout.isColliding(item.x, item.y, newW, newH, item.id)) {
        item.w = newW;
        item.h = newH;
    }
}

function handleItemResizeEnd(id: string) {
    layout.resizingId.value = null;
    resizeStartItem.value = null;

    if (props.autoCompact && props.compactType) {
        layout.compactLayout();
    }

    layout.saveLayout();
    emitChange();
}

function handleResize() {
    if (container.value) {
        containerWidth.value = container.value.offsetWidth;
        layout.updateBreakpoint(containerWidth.value);
    }
}

function emitChange() {
    emit('update:modelValue', layout.items.value);
    emit('change', layout.items.value);
}

onMounted(() => {
    layout.loadLayout();

    if (props.modelValue && props.modelValue.length > 0) {
        layout.items.value = props.modelValue;
    }

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    if (container.value) {
        resizeObserver.observe(container.value);
    }

    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});

watch(
    () => props.modelValue,
    (newVal) => {
        if (newVal && newVal.length > 0) {
            layout.items.value = newVal;
        }
    },
    { deep: true }
);

defineExpose({
    addItem: layout.addItem,
    removeItem: layout.removeItem,
    updateItem: layout.updateItem,
    clearLayout: layout.clearLayout,
    compactLayout: layout.compactLayout,
    items: layout.items,
});
</script>

<style scoped>
.grid-layout {
    position: relative;
    width: 100%;
    background: var(--color-background, #fff);
}

.grid-container {
    position: relative;
    width: 100%;
}
</style>
