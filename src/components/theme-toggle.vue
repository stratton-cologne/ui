<!-- src/components/theme-toggle.vue -->
<template>
    <button data-id="stratton" type="button" :aria-label="computedAriaLabel" :aria-pressed="isDark" @click="toggle">
        <!-- Slot-API: Werte NUR an den Slot geben, nicht als DOM-Attribute -->
        <slot :isDark="isDark" :toggle="toggle" :theme="theme" :setTheme="setTheme">
            <!-- Default-Content (ohne Klassen) -->
            <span aria-hidden="true">
                <component v-if="hasLucide" is="lucide-icon" :name="isDark ? 'Moon' : 'Sun'" />
                <span style="margin-right: 5px;" v-else>{{ isDark ? '☀️' : '🌙' }}</span>
            </span>
            <span>{{ labelText }}</span>
        </slot>
    </button>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import { useUiI18n } from '../i18n'
import { useTheme } from '../composables/useTheme'

const props = defineProps<{
    /** Überschreibt das aria-label komplett */
    ariaLabel?: string
    /** Statisches Label (überschreibt mode-spezifisches Label) */
    label?: string
    /** Optional: individuelles Fallback für Light-/Dark-Label */
    labelLight?: string
    labelDark?: string
}>()

const { theme, isDark, toggleTheme: toggle, setTheme } = useTheme()
const { t } = useUiI18n('theme-toggle')

// Prüfen, ob der Consumer <lucide-icon> global registriert hat
const inst = getCurrentInstance()
const hasLucide = !!inst?.appContext.components?.['lucide-icon']

// i18n-Label je Modus (mit sinnvollen Fallbacks)
const modeKey = computed(() => (isDark.value ? 'label.light' : 'label.dark'))
const modeFallback = computed(() =>
    isDark.value ? (props.labelLight ?? 'Hellen Modus aktivieren')
        : (props.labelDark ?? 'Dunklen Modus aktivieren')
)

const labelText = computed(() => props.label ?? t(modeKey.value, {}, modeFallback.value))
const computedAriaLabel = computed(() => props.ariaLabel ?? labelText.value)

// (optional) TS-Intellisense für die Slot-Props
defineSlots<{
    default(props: {
        isDark: boolean
        theme: string
        toggle: () => void
        setTheme: (v: 'light' | 'dark') => void
    }): any
}>()
</script>
