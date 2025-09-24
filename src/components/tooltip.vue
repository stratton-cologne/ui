<!-- src/components/tooltip.vue -->
<template>
    <span :id="rootId" data-id="stratton" data-component="sc-tooltip" :data-instance="instanceAttr"
        :data-open="isOpen || null" :style="wrapStyle">
        <!-- Trigger (Events direkt am Wrapper – funktioniert auch mit Slots/RouterLink) -->
        <span ref="triggerRef" data-role="trigger" tabindex="0" :aria-describedby="isOpen ? tipId : undefined"
            @mouseenter="onEnter" @mouseleave="onLeave" @focusin="onEnter" @focusout="onLeave">
            <slot name="trigger" :open="isOpen">
                <span data-role="trigger-default">ⓘ</span>
            </slot>
        </span>

        <!-- Bubble (kein Teleport, absolut relativ zum Wrapper) -->
        <div v-show="isOpen" ref="bubbleRef" :id="tipId" role="tooltip" data-role="bubble" :data-placement="placement"
            :style="bubblePosStyle" @mouseenter="onBubbleEnter" @mouseleave="onBubbleLeave">
            <slot>{{ content }}</slot>
        </div>
    </span>
</template>

<script setup lang="ts">
import { computed, ref, withDefaults, useAttrs } from 'vue'
import { useStableId } from '../composables/useStableId'

type Placement = 'top' | 'bottom' | 'left' | 'right'

const props = withDefaults(defineProps<{
    /** Tooltip-Text, wenn kein Default-Slot genutzt wird */
    content?: string
    /** Position relativ zum Trigger */
    placement?: Placement
    /** Abstand zwischen Trigger und Bubble (px) */
    offset?: number
    /** Verzögerungen in ms */
    delayOpen?: number
    delayClose?: number
    /** Wenn true: Bubble bleibt offen, wenn Maus darüber ist */
    interactive?: boolean
    /** Deaktiviert Tooltip komplett */
    disabled?: boolean
    /** IDs / Instanz */
    id?: string
    instance?: string
}>(), {
    placement: 'bottom',
    offset: 8,
    delayOpen: 60,
    delayClose: 80,
    interactive: true,
    disabled: false,
})

const emit = defineEmits<{ (e: 'open'): void; (e: 'close'): void }>()

/** IDs & Instanz */
const makeId = useStableId('tooltip')
const rootId = computed(() => props.id ?? makeId('root'))
const tipId = makeId('bubble')
const attrs = useAttrs()
const instanceAttr = computed(() => (props.instance ?? (attrs['data-instance'] as string) ?? makeId('inst')))

/** State */
const isOpen = ref(false)
let openTimer: number | null = null
let closeTimer: number | null = null

const triggerRef = ref<HTMLElement | null>(null)
const bubbleRef = ref<HTMLElement | null>(null)

/** Layout: kein Stylesheet – nur das Nötigste inline */
const wrapStyle = { position: 'relative', display: 'inline-block' } as Record<string, string>

/** Positionierung rein relativ zum Wrapper (kein Messen/nextTick nötig) */
const placement = computed(() => props.placement)
const bubblePosStyle = computed<Record<string, string>>(() => {
    const base: Record<string, string> = {
        position: 'absolute',
        zIndex: '9999',
        // pointer-events nur erlauben, wenn interaktiv – sonst stört Bubble die Hover-Zone nicht
        pointerEvents: props.interactive ? 'auto' : 'none',
    }
    const gap = `${props.offset}px`

    switch (placement.value) {
        case 'top':
            base.bottom = `calc(100% + ${gap})`
            base.left = '50%'
            base.transform = 'translateX(-50%)'
            break
        case 'bottom':
            base.top = `calc(100% + ${gap})`
            base.left = '50%'
            base.transform = 'translateX(-50%)'
            break
        case 'left':
            base.right = `calc(100% + ${gap})`
            base.top = '50%'
            base.transform = 'translateY(-50%)'
            break
        case 'right':
            base.left = `calc(100% + ${gap})`
            base.top = '50%'
            base.transform = 'translateY(-50%)'
            break
    }
    return base
})

/** Hover-Logik */
function clearTimers() {
    if (openTimer) { clearTimeout(openTimer); openTimer = null }
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null }
}
function open() {
    if (props.disabled || isOpen.value) return
    isOpen.value = true
    emit('open')
}
function close() {
    if (!isOpen.value) return
    isOpen.value = false
    emit('close')
}
function onEnter() {
    if (props.disabled) return
    clearTimers()
    openTimer = window.setTimeout(open, props.delayOpen)
}
function onLeave() {
    if (props.disabled) return
    clearTimers()
    closeTimer = window.setTimeout(close, props.delayClose)
}
function onBubbleEnter() {
    if (!props.interactive) return
    clearTimers()
}
function onBubbleLeave() {
    if (!props.interactive) return
    onLeave()
}

/** Für Barrierefreiheit via Tastatur:
 *  Fokus öffnet, Blur schließt – bereits über @focusin/@focusout am Trigger angebunden.
 */
const content = computed(() => props.content ?? '')
</script>
