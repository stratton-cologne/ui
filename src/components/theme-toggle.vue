<!-- src/components/theme-toggle.vue -->
<template>
    <button v-bind="$attrs" :id="rootId" data-id="stratton" data-component="sc-theme-toggle"
        :data-instance="instanceAttr" type="button" :aria-label="computedAriaLabel" :aria-pressed="isDark"
        @click="toggle">
        <!-- Slot-API: Werte nur als Slot-Props bereitstellen -->
        <slot :isDark="isDark" :toggle="toggle" :theme="theme" :setTheme="setTheme">
            <!-- Default-Content ohne Styles/Klassen -->
            <span aria-hidden="true" data-role="icon">
                <Icon :name="isDark ? 'Sun' : 'Moon'" />
            </span>
            <span data-role="label">{{ labelText }}</span>
        </slot>
    </button>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { useUiI18n } from '../i18n'
import { useTheme } from '../composables/useTheme'
import { useStableId } from '../composables/useStableId'
import Icon from '../icons/'

const props = withDefaults(defineProps<{
    /** Überschreibt das aria-label komplett */
    ariaLabel?: string
    /** Statisches Label (überschreibt mode-spezifisches Label) */
    label?: string
    /** Individuelle Fallbacks für Light-/Dark-Label */
    labelLight?: string
    labelDark?: string
    /** Optional: feste ID und Instanz */
    id?: string
    instance?: string
}>(), {})

const { theme, isDark, toggleTheme: toggle, setTheme } = useTheme()
const { t } = useUiI18n('theme-toggle')

/** IDs / Instance */
const makeId = useStableId('theme-toggle')
const rootId = computed(() => props.id ?? makeId('root'))
const instanceAttr = computed(() => props.instance ?? makeId('inst'))

/** i18n-Label pro Modus + Fallbacks */
const modeKey = computed(() => (isDark.value ? 'label.light' : 'label.dark'))
const modeFallback = computed(() =>
    isDark.value
        ? (props.labelLight ?? 'Hellen Modus aktivieren')
        : (props.labelDark ?? 'Dunklen Modus aktivieren')
)

const labelText = computed(() => props.label ?? t(modeKey.value, {}, modeFallback.value))
const computedAriaLabel = computed(() => props.ariaLabel ?? labelText.value)

/** Slot-Typing (optional für TS-Intellisense) */
defineSlots<{
    default(props: {
        isDark: boolean
        theme: string
        toggle: () => void
        setTheme: (v: 'light' | 'dark') => void
    }): any
}>()
</script>
