<!-- src/components/badge.vue -->
<template>
    <span v-bind="$attrs" :id="rootId" data-id="stratton" data-component="sc-badge" :data-instance="instanceAttr"
        :data-variant="variant || null" :data-tone="tone || null" :data-size="size || null" :data-shape="shape || null"
        :data-dot="dot || null" :data-clickable="clickable || null" :data-empty="isEmpty || null" :role="computedRole"
        :aria-label="computedAriaLabel" :aria-live="ariaLive" :tabindex="clickable ? 0 : undefined" @click="onClick"
        @keydown.enter.prevent="onActivate" @keydown.space.prevent="onActivate">
        <!-- Icon (optional) -->
        <span v-if="hasIcon" data-role="icon">
            <slot name="icon">
                <component :is="icon" v-if="icon" v-bind="iconProps || {}" />
            </slot>
        </span>

        <!-- Inhalt (bei dot-Badges ausgeblendet) -->
        <span v-if="!dot && !isEmpty" data-role="content">
            <slot>{{ displayText }}</slot>
        </span>
    </span>
</template>

<script setup lang="ts">
import { computed, withDefaults, useSlots } from 'vue'
import { useStableId } from '../composables/useStableId'
import { useUiI18n } from '../i18n'

export type BadgeVariant = 'solid' | 'soft' | 'outline' | 'ghost' | string
export type BadgeTone = 'primary' | 'success' | 'warning' | 'danger' | 'info' | string
export type BadgeSize = 'sm' | 'md' | 'lg' | string
export type BadgeShape = 'pill' | 'rounded' | 'square' | string

const props = withDefaults(defineProps<{
    /** Inhalt/Zahl der Badge (wird bei dot ignoriert) */
    value?: string | number | null
    /** Max-Kürzung (z.B. 99+ ) */
    max?: number
    /** reine Punkt-Badge ohne Text */
    dot?: boolean
    /** Interaktiv? → Tastatur + role=button */
    clickable?: boolean

    /** Präsentations-Metadaten für Styling im Consumer */
    variant?: BadgeVariant
    tone?: BadgeTone
    size?: BadgeSize
    shape?: BadgeShape

    /** Icon als Komponente (oder Slot 'icon') */
    icon?: any
    iconProps?: Record<string, any>

    /** A11y / IDs */
    ariaLabel?: string
    ariaLive?: 'off' | 'polite' | 'assertive'
    id?: string
    instance?: string
}>(), {
    value: null,
    max: undefined,
    dot: false,
    clickable: false,
    ariaLive: 'off',
})

const emit = defineEmits<{
    (e: 'click'): void
    (e: 'activate'): void
}>()

/* IDs */
const makeId = useStableId('badge')
const rootId = computed(() => props.id ?? makeId('root'))
const instanceAttr = computed(() => props.instance ?? makeId('inst'))

/* i18n */
const { t } = useUiI18n('badge')

/* Slots / Icon */
const slots = useSlots()
const hasIcon = computed(() => !!props.icon || !!slots.icon)

/* Anzeige-Text (bei Zahlen + max → "max+") */
const isNumber = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v)
const displayText = computed(() => {
    const v = props.value
    if (isNumber(v) && typeof props.max === 'number' && v > props.max) return `${props.max}+`
    return v ?? ''
})
const isEmpty = computed(() => (props.value === '' || props.value === null || props.value === undefined))

/* A11y */
const computedRole = computed(() => props.clickable ? 'button' : 'status')
const computedAriaLabel = computed(() =>
    props.ariaLabel
    ?? (props.dot
        ? t('dot', {}, 'Markierung')
        : (displayText.value ? t('label', { value: String(displayText.value) }, String(displayText.value)) : t('empty', {}, 'Leer')))
)

/* Events */
function onClick() { emit('click'); if (props.clickable) emit('activate') }
function onActivate() { emit('activate') }
</script>
