<template>
    <div v-bind="$attrs" :id="rootId" data-id="stratton" data-component="sc-table" :data-instance="instanceAttr"
        role="region" :aria-label="computedAriaLabel">
        <div data-role="scroll">
            <table data-role="table">
                <thead data-role="head">
                    <tr data-role="row head-row">
                        <!-- Select-All -->
                        <th data-role="cell head-cell select">
                            <input type="checkbox" :checked="allChecked" :indeterminate="indeterminate"
                                @change="toggleAll" :aria-label="ariaSelectAll" />
                        </th>

                        <!-- Spalten-Header -->
                        <th v-for="col in columns" :key="col.key" data-role="cell head-cell" :data-key="col.key"
                            :id="thId(col.key)" scope="col">
                            <slot name="th" :column="col">{{ col.label }}</slot>
                        </th>

                        <!-- Aktionen-Header (optional) -->
                        <th v-if="hasActions" data-role="cell head-cell actions" scope="col">
                            <slot name="actions-header">Aktionen</slot>
                        </th>
                    </tr>
                </thead>

                <tbody data-role="body">
                    <!-- Datensätze -->
                    <tr v-for="(entry, index) in data" :key="String(rowKeyValue(entry, index))" data-role="row body-row"
                        :data-clickable="isRowClickable(entry, index) || null" @click="onRowClickMaybe(entry, index)">
                        <!-- Row-Checkbox -->
                        <td data-role="cell select" @click.stop>
                            <input type="checkbox" :checked="isSelected(entry, index)"
                                @change="toggleOne(entry, index, $event)" :aria-label="ariaSelectRow(index)" />
                        </td>

                        <!-- Zellen -->
                        <td v-for="col in columns" :key="col.key" data-role="cell" :data-key="col.key"
                            :headers="thId(col.key)">
                            <slot name="cell" :column="col" :entry="entry" :value="entry[col.key]" :index="index">
                                {{ entry[col.key] }}
                            </slot>
                        </td>

                        <!-- Aktionen-Zelle -->
                        <td v-if="hasActions" data-role="cell actions" @click.stop>
                            <slot name="actions" :entry="entry" :index="index" :emitAction="emitAction"></slot>
                        </td>
                    </tr>

                    <!-- Leerzustand -->
                    <tr v-if="!data || data.length === 0" data-role="row empty">
                        <td data-role="cell empty" :colspan="columns.length + (hasActions ? 2 : 1)">
                            <slot name="empty">Keine Einträge</slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, withDefaults, useSlots } from 'vue'
import { useStableId } from '../composables/useStableId'

/** ===== Typen ===== */
export type RowKey = string | number
export type TableEntry = Record<string, any>
export type TableColumn = { key: string; label: string }
type RowClickableProp = boolean | ((entry: TableEntry, index: number) => boolean)

/** ===== Props ===== */
const props = withDefaults(defineProps<{
    /** Datenzeilen */
    data: TableEntry[]
    /** Spalten-Definition */
    columns: TableColumn[]
    /** Eindeutiger Schlüssel je Zeile (Propertyname oder Function) */
    rowKey?: string | ((entry: TableEntry, index: number) => RowKey)
    /** Zeilen klickbar machen */
    rowClickable?: RowClickableProp
    /** Aktionen-Spalte anzeigen */
    showActions?: boolean
    /** ARIA */
    ariaLabel?: string
    /** Root-ID / Instanzkennung */
    id?: string
    instance?: string
    /** Kontrollierte Selektion (v-model) */
    selectedKeys?: RowKey[]
}>(), {
    data: () => [],
    columns: () => [],
    rowKey: 'id',
    rowClickable: false,
    showActions: true,
    ariaLabel: 'Datentabelle',
})

/** ===== Emits ===== */
const emit = defineEmits<{
    (e: 'row-click', entry: TableEntry): void
    (e: 'action', payload: { action: string; entry: TableEntry }): void
    (e: 'update:selectedKeys', keys: RowKey[]): void
}>()

/** ===== Stable IDs ===== */
const makeId = useStableId('table')
const rootId = computed(() => props.id ?? makeId('root'))
const instanceAttr = computed(() => props.instance ?? makeId('inst'))
const thId = (key: string) => makeId(`th-${key}`)

/** ===== Slots / Aktionen-Erkennung ===== */
const slots = useSlots()
const hasActions = computed(() => props.showActions)

/** ===== ARIA ===== */
const computedAriaLabel = computed(() => props.ariaLabel || 'Datentabelle')
const ariaSelectAll = 'Alle auswählen'
const ariaSelectRow = (i: number) => `Zeile ${i + 1} auswählen`

/** ===== Selektion: kontrolliert / unkontrolliert ===== */
const isControlled = computed(() => props.selectedKeys !== undefined)
const internalSet = ref<Set<RowKey>>(new Set<RowKey>())

watch(() => props.selectedKeys, (v) => {
    if (isControlled.value) {
        internalSet.value = new Set(v ?? [])
    }
}, { immediate: true })

function selectedSet(): Set<RowKey> {
    return isControlled.value ? new Set(props.selectedKeys ?? []) : internalSet.value
}
function updateSelected(next: Set<RowKey>) {
    if (isControlled.value) emit('update:selectedKeys', Array.from(next))
    else internalSet.value = next
}

/** Helpers */
function rowKeyValue(entry: TableEntry, index: number): RowKey {
    const rk = props.rowKey
    return typeof rk === 'function' ? rk(entry, index) : (entry?.[rk] as RowKey)
}
function isSelected(entry: TableEntry, index: number): boolean {
    return selectedSet().has(rowKeyValue(entry, index))
}

/** Select-All / Indeterminate */
const allKeys = computed<RowKey[]>(() => props.data.map((e, i) => rowKeyValue(e, i)))
const allChecked = computed(() => {
    const set = selectedSet()
    return allKeys.value.length > 0 && allKeys.value.every(k => set.has(k))
})
const indeterminate = computed(() => {
    const set = selectedSet()
    const total = allKeys.value.length
    if (total === 0) return false
    const count = allKeys.value.filter(k => set.has(k)).length
    return count > 0 && count < total
})

function toggleAll(e: Event) {
    const checked = (e.target as HTMLInputElement).checked
    const next = new Set<RowKey>(selectedSet())
    if (checked) {
        allKeys.value.forEach(k => next.add(k))
    } else {
        allKeys.value.forEach(k => next.delete(k))
    }
    updateSelected(next)
}

function toggleOne(entry: TableEntry, index: number, e: Event) {
    const checked = (e.target as HTMLInputElement).checked
    const key = rowKeyValue(entry, index)
    const next = new Set<RowKey>(selectedSet())
    if (checked) next.add(key)
    else next.delete(key)
    updateSelected(next)
}

/** Row click */
function isRowClickable(entry: TableEntry, index: number): boolean {
    const rc = props.rowClickable
    return typeof rc === 'function' ? !!rc(entry, index) : !!rc
}
function onRowClickMaybe(entry: TableEntry, index: number) {
    if (!isRowClickable(entry, index)) return
    emit('row-click', entry)
}

/** Aktionen aus Slot heraus weiterreichen */
function emitAction(action: string, entry: TableEntry) {
    emit('action', { action, entry })
}
</script>
