<template>
    <div ref="root" data-component="sc-dropdown" style="position:relative;display:inline-block">
        <!-- Trigger (mit Fallback-Listenern) -->
        <div ref="triggerWrap" data-role="trigger" @click.stop="onTriggerClick" @keydown.enter.prevent.stop="toggle"
            @keydown.space.prevent.stop="toggle">
            <slot name="trigger" :open="panelVisible" :toggle="toggle" :close="close">
                <button type="button" @click.stop="toggle" :aria-expanded="panelVisible" aria-haspopup="menu">
                    Menü ▾
                </button>
            </slot>
        </div>

        <!-- Teleport: Panel bleibt im DOM → v-show + Transition -->
        <Teleport v-if="teleportTo" :to="teleportTo">
            <Transition v-if="useTransition" :name="transitionName || undefined"
                :enter-active-class="enterActiveClass || undefined" :enter-from-class="enterFromClass || undefined"
                :enter-to-class="enterToClass || undefined" :leave-active-class="leaveActiveClass || undefined"
                :leave-from-class="leaveFromClass || undefined" :leave-to-class="leaveToClass || undefined">
                <div v-show="panelVisible" ref="dropdownPanel" data-role="panel" role="menu" :data-placement="placement"
                    :style="teleStyle" @click="onPanelClick" @keydown.stop="onPanelKeydown">
                    <slot :open="panelVisible" :close="close">
                        <div data-role="empty">No items</div>
                    </slot>
                </div>
            </Transition>

            <div v-else v-show="panelVisible" ref="dropdownPanel" data-role="panel" role="menu"
                :data-placement="placement" :style="teleStyle" @click="onPanelClick" @keydown.stop="onPanelKeydown">
                <slot :open="panelVisible" :close="close">
                    <div data-role="empty">No items</div>
                </slot>
            </div>
        </Teleport>

        <!-- Ohne Teleport -->
        <Transition v-else-if="useTransition" :name="transitionName || undefined"
            :enter-active-class="enterActiveClass || undefined" :enter-from-class="enterFromClass || undefined"
            :enter-to-class="enterToClass || undefined" :leave-active-class="leaveActiveClass || undefined"
            :leave-from-class="leaveFromClass || undefined" :leave-to-class="leaveToClass || undefined">
            <div v-show="panelVisible" ref="dropdownPanel" data-role="panel" role="menu" :data-placement="placement"
                :style="localStyle" @click="onPanelClick" @keydown.stop="onPanelKeydown">
                <slot :open="panelVisible" :close="close">
                    <div data-role="empty">No items</div>
                </slot>
            </div>
        </Transition>

        <div v-else v-show="panelVisible" ref="dropdownPanel" data-role="panel" role="menu" :data-placement="placement"
            :style="localStyle" @click="onPanelClick" @keydown.stop="onPanelKeydown">
            <slot :open="panelVisible" :close="close">
                <div data-role="empty">No items</div>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, withDefaults, nextTick, watch } from 'vue'

type Placement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

const props = withDefaults(defineProps<{
    teleportTo?: string | HTMLElement | null
    placement?: Placement
    offset?: number
    closeOnOutside?: boolean
    closeOnItemClick?: boolean
    /* Transition-Steuerung */
    useTransition?: boolean
    transitionName?: string
    enterActiveClass?: string
    enterFromClass?: string
    enterToClass?: string
    leaveActiveClass?: string
    leaveFromClass?: string
    leaveToClass?: string
}>(), {
    // teleportTo: 'body', // optional
    placement: 'bottom-end',
    offset: 6,
    closeOnOutside: true,
    closeOnItemClick: true,
    useTransition: true,
    transitionName: 'fade-slide-dropdown'
})

const emit = defineEmits<{
    (e: 'select', v: unknown): void
    (e: 'open'): void
    (e: 'close'): void
}>()

/* Refs */
const root = ref<HTMLElement | null>(null)
const triggerWrap = ref<HTMLElement | null>(null)
const dropdownPanel = ref<HTMLElement | null>(null)

/* Sichtbarkeit (Panel bleibt im DOM, v-show steuert display) */
const panelVisible = ref(false)

/* Nur Positionierungs-Styles (Optik im Consumer) */
const teleStyle = ref('position:fixed;top:-9999px;left:-9999px;')
const localStyle = computed(() => {
    const gap = props.offset
    const vert = props.placement.startsWith('bottom')
        ? `top:calc(100%);`
        : `bottom:calc(100%);`
    const horiz = props.placement.endsWith('start') ? 'left:0;' : 'right:0;'
    return `position:absolute;${vert}${horiz}z-index:9999;`
})

/* Trigger-Fallback (falls Slot-Button kein @click="toggle" hat) */
function onTriggerClick() { toggle() }

/* API */
function open() {
    if (panelVisible.value) return
    panelVisible.value = true
    emit('open')
    nextTick(() => {
        position()
        requestAnimationFrame(position)
        setTimeout(position, 50)
        focusFirstItem()
    })
}
function close() {
    if (!panelVisible.value) return
    panelVisible.value = false
    emit('close')
}
function toggle() { (panelVisible.value ? close : open)() }

/* Auswahl */
function onPanelClick(e: MouseEvent) {
    const item = (e.target as HTMLElement).closest('[data-dropdown-item]')
    if (item) {
        const value = item.getAttribute('data-value') ?? true
        emit('select', value)
        if (props.closeOnItemClick) close()
    }
}

/* Keyboard-Navigation + ESC */
function focusable(): HTMLElement[] {
    const p = dropdownPanel.value
    if (!p) return []
    return Array.from(p.querySelectorAll<HTMLElement>('[data-dropdown-item], [role="menuitem"], button, a, [tabindex]'))
        .filter(el => !el.hasAttribute('disabled') && el.tabIndex > -1)
}
function focusFirstItem() {
    const xs = focusable()
    xs[0]?.focus()
}
function moveFocus(dir: 1 | -1) {
    const xs = focusable()
    if (!xs.length) return
    const active = document.activeElement as HTMLElement | null
    const idx = Math.max(0, xs.indexOf(active ?? xs[0]))
    xs[(idx + dir + xs.length) % xs.length]?.focus()
}
function onPanelKeydown(e: KeyboardEvent) {
    switch (e.key) {
        case 'ArrowDown': e.preventDefault(); moveFocus(1); break
        case 'ArrowUp': e.preventDefault(); moveFocus(-1); break
        case 'Home': e.preventDefault(); focusFirstItem(); break
        case 'End': e.preventDefault(); { const xs = focusable(); xs[xs.length - 1]?.focus() } break
        case 'Enter':
        case ' ': { (document.activeElement as HTMLElement | null)?.click(); break }
        case 'Escape': e.stopPropagation(); close(); break
    }
}

/* Positionierung (imperativ) */
function position() {
    if (!panelVisible.value) return
    const btn = triggerWrap.value
    const pnl = dropdownPanel.value
    if (!btn || !pnl) return

    const r = btn.getBoundingClientRect()
    const w = pnl.offsetWidth
    const h = pnl.offsetHeight
    const gap = props.offset
    const vw = innerWidth
    const vh = innerHeight

    let top = 0, left = 0
    switch (props.placement) {
        case 'bottom-start': top = r.bottom + gap; left = r.left; break
        case 'bottom-end': top = r.bottom + gap; left = r.right - w; break
        case 'top-start': top = r.top - h - gap; left = r.left; break
        case 'top-end': top = r.top - h - gap; left = r.right - w; break
    }
    top = Math.max(0, Math.min(top, vh - h))
    left = Math.max(0, Math.min(left, vw - w))

    if (props.teleportTo) {
        teleStyle.value = `position:fixed;top:${top}px;left:${left}px;z-index:9999;`
    } // ohne Teleport übernimmt localStyle die Position
}

/* Outside-Close + Reposition */
function onWin() { if (panelVisible.value) position() }
function onDocClick(e: MouseEvent) {
    if (!props.closeOnOutside || !panelVisible.value) return
    const t = e.target as Node
    if (root.value?.contains(t) || dropdownPanel.value?.contains(t)) return
    close()
}
watch(() => [props.placement, props.offset, props.teleportTo], () => {
    if (panelVisible.value) nextTick(() => { position(); requestAnimationFrame(position) })
})

onMounted(() => {
    addEventListener('resize', onWin)
    addEventListener('scroll', onWin, true)
    addEventListener('click', onDocClick, true)
})
onUnmounted(() => {
    removeEventListener('resize', onWin)
    removeEventListener('scroll', onWin, true)
    removeEventListener('click', onDocClick, true)
})
</script>
