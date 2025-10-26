<!-- src/components/button.vue -->
<template>
    <component :is="tagName" v-bind="$attrs" :id="rootId" data-id="stratton" data-component="sc-button"
        :data-instance="instanceAttr" :data-variant="variant" :data-tone="tone" :data-size="size"
        :data-block="block || null" :data-loading="loading || null" :data-disabled="isDisabled || null"
        :type="isNativeButton ? type : undefined" :href="hrefAttr" :target="href ? target : undefined"
        :rel="href && rel ? rel : undefined" :aria-busy="loading ? 'true' : undefined"
        :aria-disabled="isDisabled ? 'true' : undefined" :disabled="isNativeButton ? isDisabled : undefined"
        role="button" @click="onClick" @keydown.space.prevent="onKeyActivate" @keydown.enter.prevent="onKeyActivate">
        <!-- Prefix-Icon/Content -->
        <span v-if="$slots.prefix" data-role="prefix">
            <slot name="prefix" />
        </span>

        <!-- Loader -->
        <span v-if="loading" data-role="loader">
            <slot name="loader">…</slot>
        </span>

        <!-- Label -->
        <span data-role="label">
            <slot />
        </span>

        <!-- Suffix-Icon/Content -->
        <span v-if="$slots.suffix" data-role="suffix">
            <slot name="suffix" />
        </span>
    </component>
</template>

<script setup lang="ts">
import { computed, withDefaults, useAttrs } from 'vue'
import { RouterLink } from 'vue-router'
import { useStableId } from '../composables/useStableId'

type Variant = 'solid' | 'soft' | 'outline' | 'ghost' | 'link'
type Tone = 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info'
type Size = 'xs' | 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
    /** Button-Variante (Styling obliegt dem Consumer via [data-variant]) */
    variant?: Variant
    /** Farbton */
    tone?: Tone
    /** Größe */
    size?: Size
    /** Native type (nur wenn <button>) */
    type?: 'button' | 'submit' | 'reset'
    /** Disabled (blockiert Clicks & Tastatur) */
    disabled?: boolean
    /** Loading (setzt aria-busy & zeigt loader-slot) */
    loading?: boolean
    /** Block: nimmt volle Breite ein (Styling im Consumer) */
    block?: boolean
    /** Externes Ziel – wenn gesetzt, wird <a> gerendert */
    href?: string
    target?: '_self' | '_blank' | '_parent' | '_top'
    rel?: string
    /** Router-Ziel – wenn gesetzt, wird <RouterLink> gerendert */
    to?: string | Record<string, any>
    /** Stabile ID/Instanz für selektierbares Styling */
    id?: string
    instance?: string
}>(), {
    variant: 'solid',
    tone: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
    block: false,
})

const emit = defineEmits<{
    (e: 'click', ev: MouseEvent): void
}>()

const makeId = useStableId('button')
const rootId = computed(() => props.id ?? makeId('root'))
const attrs = useAttrs()
const instanceAttr = computed(() => (props.instance ?? (attrs['data-instance'] as string) ?? makeId('inst')))

const isDisabled = computed(() => props.disabled || props.loading)
const isNativeButton = computed(() => !props.href && !props.to)

const tagName = computed(() => {
    if (props.to) return RouterLink
    if (props.href) return 'a'
    return 'button'
})

const hrefAttr = computed(() => (props.href ? props.href : undefined))

function onClick(e: MouseEvent) {
    if (isDisabled.value) {
        e.preventDefault()
        e.stopPropagation()
        return
    }
    emit('click', e)
}

function onKeyActivate(e: KeyboardEvent) {
    // Tastaturaktivierung auch für <a> / <RouterLink>, falls gewünscht
    if (isDisabled.value) return
    // Enter/Space bereits per @keydown.* handled → trigger Click
    // Nur auf nicht-native Buttons sinnvoll, native <button> macht das selbst
    if (!isNativeButton.value) {
        // künstlichen Click feuern
        (e.target as HTMLElement)?.click()
    }
}
</script>
