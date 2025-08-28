<template>
    <div v-bind="$attrs" :id="rootId" data-id="stratton" data-component="sc-toolbar" :data-instance="instanceAttr"
        role="toolbar" :aria-label="computedAriaLabel" class="sc-toolbar">
        <!-- LEFT -->
        <div class="sc-toolbar__zone sc-toolbar__left">
            <template v-for="it in leftItems" :key="it.key">
                <slot name="item" :item="it" :emitAction="emitAction">
                    <!-- Button -->
                    <button v-if="it.kind === 'button'" :id="btnId(it.key)" :data-testid="btnTestId(it.key)"
                        type="button" class="sc-toolbar__btn" :disabled="it.disabled" :title="it.title || it.label"
                        :aria-label="it.title || it.label" @click="emitAction(it.key)">
                        <span class="sc-toolbar__btn-inner">
                            <!-- Icon in Wrapper-Span (keine Klassen direkt am Icon-Component) -->
                            <span v-if="it.icon" class="sc-toolbar__icon">
                                <component :is="it.icon" v-bind="it.iconProps || {}" />
                            </span>
                            <span class="sc-toolbar__label">{{ it.label }}</span>
                        </span>
                    </button>

                    <!-- Beliebige Komponente -->
                    <component v-else-if="it.kind === 'component'" :is="it.is" v-bind="it.props || {}"
                        v-on="normalizeOn(it.on)" :class="['sc-toolbar__custom', it.class]" />

                    <!-- Spacer -->
                    <div v-else-if="it.kind === 'spacer'" class="sc-toolbar__spacer"
                        :style="{ flexGrow: it.grow ? '1' : '0' }" />
                </slot>
            </template>
        </div>

        <!-- RIGHT -->
        <div v-if="rightItems.length" class="sc-toolbar__zone sc-toolbar__right">
            <template v-for="it in rightItems" :key="it.key">
                <slot name="right-item" :item="it" :emitAction="emitAction">
                    <button v-if="it.kind === 'button'" :id="btnId(it.key)" :data-testid="btnTestId(it.key)"
                        type="button" class="sc-toolbar__btn" :disabled="it.disabled" :title="it.title || it.label"
                        :aria-label="it.title || it.label" @click="emitAction(it.key)">
                        <span class="sc-toolbar__btn-inner">
                            <span v-if="it.icon" class="sc-toolbar__icon">
                                <component :is="it.icon" v-bind="it.iconProps || {}" />
                            </span>
                            <span class="sc-toolbar__label">{{ it.label }}</span>
                        </span>
                    </button>

                    <component v-else-if="it.kind === 'component'" :is="it.is" v-bind="it.props || {}"
                        v-on="normalizeOn(it.on)" :class="['sc-toolbar__custom', it.class]" />

                    <div v-else-if="it.kind === 'spacer'" class="sc-toolbar__spacer"
                        :style="{ flexGrow: it.grow ? '1' : '0' }" />
                </slot>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { useStableId } from '../composables/useStableId'

/** ===== Types ===== */
export type ToolbarItemButton = {
    kind: 'button'
    key: string
    label: string
    title?: string
    disabled?: boolean
    icon?: any
    iconProps?: Record<string, any>
}
export type ToolbarItemComponent = {
    kind: 'component'
    key: string
    is: any                // z. B. importiertes SFC, RouterLink, Icon, …
    props?: Record<string, any>
    on?: Record<string, (...args: any[]) => void>
    class?: string
}
export type ToolbarItemSpacer = {
    kind: 'spacer'
    key: string
    grow?: boolean         // flex-grow:1 → schiebt Zonen auseinander
}
export type ToolbarItem = ToolbarItemButton | ToolbarItemComponent | ToolbarItemSpacer

const props = withDefaults(defineProps<{
    items?: ToolbarItem[]       // links
    rightItems?: ToolbarItem[]  // rechts
    ariaLabel?: string
    /** Optional: feste DOM-ID am Root (sonst auto-stable) */
    id?: string
    /** Optional: Instanz-Schlüssel als data-Attribut (sonst auto-stable) */
    instance?: string
}>(), {
    items: () => [],
    rightItems: () => [],
    ariaLabel: 'Toolbar',
})

const emit = defineEmits<{ (e: 'action', key: string): void }>()

/** Stable IDs */
const makeId = useStableId('toolbar')
const rootId = computed(() => props.id ?? makeId('root'))
const instanceAttr = computed(() => props.instance ?? makeId('inst'))
const btnId = (k: string) => makeId(`btn-${k}`)
const btnTestId = (k: string) => `${btnId(k)}-test`

/** Derived */
const computedAriaLabel = computed(() => props.ariaLabel || 'Toolbar')
const leftItems = computed(() => props.items)
const rightItems = computed(() => props.rightItems)

/** Methods */
function emitAction(key: string) { emit('action', key) }

/** Verhindert Vue-Warnung: v-on ohne Objekt */
function normalizeOn(onVal: unknown) {
    return (onVal && typeof onVal === 'object' && !Array.isArray(onVal))
        ? onVal as Record<string, any>
        : {}
}
</script>
