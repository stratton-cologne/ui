<template>
    <div
        class="grid-item"
        :class="{ 'is-static': item.static, 'is-dragging': isDragging, 'is-resizing': isResizing }"
        :style="itemStyle"
        @mousedown="handleMouseDown"
    >
        <div class="grid-item-content">
            <slot />
        </div>

        <div v-if="!item.static" class="grid-item-resize-handle" @mousedown.stop="handleResizeStart" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, CSSProperties } from 'vue';
import type { GridItem } from './types';

interface Props {
    item: GridItem;
    cols: number;
    rowHeight: number;
    containerWidth: number;
    isDragging?: boolean;
    isResizing?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    isDragging: false,
    isResizing: false,
});

const emit = defineEmits<{
    'drag-start': [e: MouseEvent];
    'drag': [delta: { deltaX: number; deltaY: number }];
    'drag-end': [];
    'resize-start': [e: MouseEvent];
    'resize': [delta: { deltaX: number; deltaY: number }];
    'resize-end': [];
}>();

const isDragging = ref(false);
const isResizing = ref(false);
const startX = ref(0);
const startY = ref(0);

const colWidth = computed(() => props.containerWidth / props.cols);

const itemStyle = computed<CSSProperties>(() => ({
    position: 'absolute',
    left: `${props.item.x * colWidth.value}px`,
    top: `${props.item.y * props.rowHeight}px`,
    width: `${props.item.w * colWidth.value}px`,
    height: `${props.item.h * props.rowHeight}px`,
}));

function handleMouseDown(e: MouseEvent) {
    if (props.item.static || isResizing.value) return;
    if ((e.target as HTMLElement).classList.contains('grid-item-resize-handle')) return;

    isDragging.value = true;
    startX.value = e.clientX;
    startY.value = e.clientY;

    emit('drag-start', e);

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
}

function handleDragMove(e: MouseEvent) {
    if (!isDragging.value) return;

    const deltaX = e.clientX - startX.value;
    const deltaY = e.clientY - startY.value;

    emit('drag', { deltaX, deltaY });
}

function handleDragEnd() {
    isDragging.value = false;
    emit('drag-end');
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
}

function handleResizeStart(e: MouseEvent) {
    if (props.item.static) return;

    isResizing.value = true;
    startX.value = e.clientX;
    startY.value = e.clientY;

    emit('resize-start', e);

    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
}

function handleResizeMove(e: MouseEvent) {
    if (!isResizing.value) return;

    const deltaX = e.clientX - startX.value;
    const deltaY = e.clientY - startY.value;

    emit('resize', { deltaX, deltaY });
}

function handleResizeEnd() {
    isResizing.value = false;
    emit('resize-end');
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
}

onMounted(() => {
    watch(
        () => props.isDragging,
        (val) => {
            isDragging.value = val ?? false;
        }
    );
});
</script>

<style scoped>
.grid-item {
    position: absolute;
    touch-action: none;
    border: 1px solid var(--color-border, #ddd);
    background: var(--color-background, #fff);
    border-radius: 6px;
    padding: 12px;
    box-sizing: border-box;
    user-select: none;
    transition: box-shadow 0.2s ease;
}

.grid-item:not(.is-static) {
    cursor: move;
}

.grid-item:not(.is-static):hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.grid-item.is-dragging {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}

.grid-item.is-resizing {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    z-index: 999;
}

.grid-item.is-static {
    background: var(--color-background-secondary, #f5f5f5);
    cursor: default;
}

.grid-item-content {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    overflow: auto;
    pointer-events: auto;
}

.grid-item-resize-handle {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    cursor: se-resize;
    background: linear-gradient(135deg, transparent 50%, var(--color-primary, #007bff) 50%);
    border-radius: 0 0 6px 0;
    z-index: 10;
    pointer-events: auto;
}

.grid-item-resize-handle:hover {
    background: linear-gradient(135deg, transparent 50%, var(--color-primary-dark, #0056b3) 50%);
}
</style>
