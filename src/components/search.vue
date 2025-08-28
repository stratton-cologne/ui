<template>
    <div v-bind="$attrs" :id="rootId" data-id="stratton" data-component="sc-search" :data-instance="instanceAttr"
        role="search" :aria-label="computedAriaLabel">
        <!-- Icon/Button (optional trigger) -->
        <button type="button" data-role="submit" :aria-label="ariaSearchLabel" @click="handleSearch">
            <slot name="icon">
                <Icon name="search" size="16" />
            </slot>
        </button>

        <!-- Eingabefeld -->
        <input ref="inputEl" :id="inputId" data-role="search" v-model="localValue" type="text"
            :placeholder="placeholder" :aria-controls="listId" :aria-expanded="showDropdown" autocomplete="off"
            autocapitalize="off" autocorrect="off" spellcheck="false" @input="handleInput"
            @keydown.down.prevent="highlightNext" @keydown.up.prevent="highlightPrev"
            @keydown.home.prevent="highlightFirst" @keydown.end.prevent="highlightLast" @keydown.enter.prevent="onEnter"
            @keydown.esc.prevent="closeDropdown" />

        <!-- Dropdown (gleich breit; Rendering per Slots anpassbar) -->
        <ul v-if="showDropdown" :id="listId" data-role="dropdown" role="listbox" :aria-labelledby="inputId">
            <li v-for="(opt, i) in filteredOptions" :key="opt.key + '-' + opt.label" data-role="option" role="option"
                :aria-selected="i === highlighted" @mousedown.prevent="selectOption(opt)"
                :class="{ 'is-highlighted': i === highlighted }">
                <slot name="option" :option="opt" :index="i" :active="i === highlighted">
                    {{ opt.key }} <span data-role="option-meta">({{ opt.label }})</span>
                </slot>
            </li>

            <li v-if="filteredOptions.length === 0" data-role="empty">
                <slot name="empty">{{ tNoResults }}</slot>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, withDefaults } from 'vue'
import { useStableId } from '../composables/useStableId'
import Icon from './icon.vue';

/** ===== Types ===== */
type FilterOption = { key: string; label: string }

const props = withDefaults(defineProps<{
    modelValue: string
    placeholder?: string
    filters?: Record<string, string[]>   // z. B. { firstName: ["vorname","vn"], ... }
    manual?: boolean                     // true → nur Button/Enter löst Suche aus
    ariaLabel?: string                   // für role="search"
    ariaSearchLabel?: string             // für den Submit-Button
    id?: string                          // optionale feste DOM-ID am Root
    instance?: string                    // optionale Instanzkennung → data-instance
}>(), {
    modelValue: '',
    manual: false,
    ariaLabel: 'Search',
    ariaSearchLabel: 'Search',
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'search', value: string): void
}>()

/** ===== Stable IDs ===== */
const makeId = useStableId('search')
const rootId = computed(() => props.id ?? makeId('root'))
const inputId = makeId('input')
const listId = makeId('list')
const instanceAttr = computed(() => props.instance ?? makeId('inst'))

/** ===== i18n-Fallbacks (ohne Abhängigkeit) ===== */
const tNoResults = 'Keine Treffer'

/** ===== State ===== */
const inputEl = ref<HTMLInputElement | null>(null)
const localValue = ref(props.modelValue)
watch(() => props.modelValue, v => { localValue.value = v })

const showDropdown = ref(false)
const highlighted = ref(0)

/** ===== Derived ===== */
const computedAriaLabel = computed(() => props.ariaLabel || 'Search')

/** Optionen aus filters mappen */
const allOptions = computed<FilterOption[]>(() => {
    if (!props.filters) return []
    return Object.entries(props.filters).flatMap(([field, aliases]) =>
        (aliases || []).map(alias => ({ key: alias, label: field }))
    )
})

/** Cursorposition robust lesen */
function getCaret(): number {
    const el = inputEl.value
    return el ? (el.selectionStart ?? localValue.value.length) : localValue.value.length
}

/** Schlüssel-Fragment links vom Cursor (bis Whitespace/Start) */
const activeKeyFragment = computed(() => {
    const caret = getCaret()
    const left = localValue.value.slice(0, caret)
    const match = left.match(/(^|\s)([a-zA-Z0-9_-]{0,30})$/)
    return match?.[2] ?? ''
})

/** Filterung (Prefix-Match) */
const filteredOptions = computed(() => {
    const fragment = activeKeyFragment.value.trim().toLowerCase()
    if (!fragment) return allOptions.value
    return allOptions.value.filter(o => o.key.toLowerCase().startsWith(fragment))
})

/** Hat die letzte Klausel „key:“ ohne Wert? (am Stringende prüfen) */
function hasIncompleteFilter(q: string): boolean {
    return /(^|[\s])[^:\s]*:\s*$/.test(q)
}

/** Dropdown-Sichtbarkeit aktualisieren */
let prevValue = localValue.value
function updateDropdownVisibility(_prev: string, curr: string) {
    showDropdown.value = curr.includes(':') && allOptions.value.length > 0
    if (showDropdown.value) {
        highlighted.value = Math.min(highlighted.value, Math.max(filteredOptions.value.length - 1, 0))
    }
}

/** ===== Handlers ===== */
function handleInput() {
    emit('update:modelValue', localValue.value)
    updateDropdownVisibility(prevValue, localValue.value)
    prevValue = localValue.value

    if (!props.manual && !hasIncompleteFilter(localValue.value)) {
        emit('search', localValue.value)
    }
}

function handleSearch() {
    emit('update:modelValue', localValue.value)
    if (hasIncompleteFilter(localValue.value)) return
    emit('search', localValue.value)
    updateDropdownVisibility(prevValue, localValue.value)
    prevValue = localValue.value
}

/** Tastatur-Navigation */
function highlightNext() {
    if (!showDropdown.value || filteredOptions.value.length === 0) return
    highlighted.value = (highlighted.value + 1) % filteredOptions.value.length
}
function highlightPrev() {
    if (!showDropdown.value || filteredOptions.value.length === 0) return
    highlighted.value = (highlighted.value - 1 + filteredOptions.value.length) % filteredOptions.value.length
}
function highlightFirst() {
    if (!showDropdown.value || filteredOptions.value.length === 0) return
    highlighted.value = 0
}
function highlightLast() {
    if (!showDropdown.value || filteredOptions.value.length === 0) return
    highlighted.value = filteredOptions.value.length - 1
}
function onEnter() {
    if (showDropdown.value && filteredOptions.value.length) {
        selectHighlighted()
        return
    }
    if (props.manual) handleSearch()
}
function closeDropdown() { showDropdown.value = false }

function selectHighlighted() {
    if (!filteredOptions.value.length) return
    const idx = Math.max(0, Math.min(highlighted.value, filteredOptions.value.length - 1))
    selectOption(filteredOptions.value[idx])
}

/** Auswahl einsetzen: ersetzt aktives Schlüssel-Fragment durch „key: “ */
function selectOption(opt: FilterOption) {
    const el = inputEl.value
    const caret = getCaret()

    const leftFull = localValue.value.slice(0, caret)
    const right = localValue.value.slice(caret)

    const lastColon = leftFull.lastIndexOf(':')
    const lastSpace = leftFull.lastIndexOf(' ')
    let replaceStart = leftFull.length
    const fragmentMatch = leftFull.match(/(^|[\s:])([a-zA-Z0-9_-]{0,30})$/)

    if (lastColon > lastSpace) {
        replaceStart = Math.max(0, lastColon)
    } else if (fragmentMatch) {
        replaceStart =
            (fragmentMatch.index ?? (leftFull.length - fragmentMatch[0].length)) +
            (fragmentMatch[1] ? fragmentMatch[1].length : 0)
    }

    const left = leftFull.slice(0, replaceStart)
    const insert = `${opt.key}: `
    const nextValue = left + insert + right

    localValue.value = nextValue
    emit('update:modelValue', nextValue)

    if (!props.manual && !hasIncompleteFilter(nextValue)) {
        emit('search', nextValue)
    }

    showDropdown.value = false

    nextTick(() => {
        if (!el) return
        el.focus()
        const newCaretPos = left.length + insert.length
        el.setSelectionRange(newCaretPos, newCaretPos)
    })
}
</script>
