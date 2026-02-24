<template>
    <div v-bind="$attrs" :id="rootId" data-id="stratton" data-component="sc-table" :data-instance="instanceAttr"
        role="region" :aria-label="computedAriaLabel">
        <div data-role="scroll">
            <table data-role="table">
                <thead data-role="head">
                    <tr data-role="row head-row">
                        <!-- Select-All (optional) -->
                        <th v-if="selectable" data-role="cell head-cell select">
                            <input type="checkbox" :checked="allChecked" :indeterminate="indeterminate"
                                @change="toggleAll" :aria-label="ariaSelectAll" />
                        </th>

                        <!-- Spalten-Header (mit Sortierung & Icon) -->
                        <th v-for="col in columns" :key="col.key" data-role="cell head-cell" :data-key="col.key"
                            :id="thId(col.key)" scope="col" :data-sortable="isColumnSortable(col) || null"
                            :data-sorted="sortStateFor(col) || null" @click="onHeaderClick(col)">
                            <div data-role="head-inner">
                                <!-- Slot überschreibt *nur* das Label -->
                                <span data-role="head-label">
                                    <slot name="th" :column="col" :sortable="isColumnSortable(col)"
                                        :sorted="sortStateFor(col)" :direction="sortStateFor(col)"
                                        :toggleSort="() => onHeaderClick(col)" :class="props">
                                        {{ col.label }}
                                    </slot>
                                </span>

                                <!-- Sort-Icons: immer vorhanden, wenn Spalte sortierbar -->
                                <span v-if="isColumnSortable(col)" data-role="head-sort-icon">
                                    <Icon v-if="sortStateFor(col) === 'asc'" name="chevron-up" size="14" />
                                    <Icon v-else-if="sortStateFor(col) === 'desc'" name="chevron-down" size="14" />
                                    <Icon v-else name="chevron-up" size="14" style="opacity: 0.3" />
                                </span>
                            </div>
                        </th>

                        <!-- Aktionen-Header (optional, i18n) -->
                        <th v-if="hasActions" data-role="cell head-cell actions" scope="col">
                            <slot name="actions-header">
                                {{ t('actions', {}, 'Aktionen') }}
                            </slot>
                        </th>
                    </tr>
                </thead>

                <tbody data-role="body">
                    <!-- Datensätze: sortierte Daten -->
                    <tr v-for="(entry, index) in sortedData" :key="String(rowKeyValue(entry, index))"
                        data-role="row body-row" :data-clickable="isRowClickable(entry, index) || null"
                        @click="onRowClickMaybe(entry, index)">
                        <!-- Row-Checkbox (optional) -->
                        <td v-if="selectable" data-role="cell select" @click.stop>
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
                        <td data-role="cell empty" :colspan="columns.length +
                            (selectable ? 1 : 0) +
                            (hasActions ? 1 : 0)
                            ">
                            <slot name="empty">
                                {{ t('empty', {}, 'Keine Daten') }}
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div data-role="footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, withDefaults, useSlots } from 'vue'
import { useUiI18n } from '../i18n'
import { useStableId } from '../composables/useStableId'
import Icon from './icon.vue'

/** ===== Typen ===== */
export type RowKey = string | number
export type TableEntry = Record<string, any>
export type TableColumn = { key: string; label: string }
export type SortDirection = 'asc' | 'desc'
type RowClickableProp = boolean | ((entry: TableEntry, index: number) => boolean)

/** ===== i18n ===== */
const { t } = useUiI18n('table')

/** ===== Props ===== */
const props = withDefaults(
    defineProps<{
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
        /** Checkbox-Spalte anzeigen */
        selectable?: boolean
        /** ARIA */
        ariaLabel?: string
        /** Root-ID / Instanzkennung */
        id?: string
        instance?: string
        /** Kontrollierte Selektion (v-model) */
        selectedKeys?: RowKey[]

        /** Sortierung aktivieren */
        sortable?: boolean
        /** Zulässige sortierbare Spalten (keys).
         *  Wenn leer/undefined → alle Columns sortierbar. */
        sortableColumns?: string[]
        /** Kontrollierte Sortierung: Spalte */
        sortBy?: string | null
        /** Kontrollierte Sortierung: Richtung */
        sortDirection?: SortDirection
    }>(),
    {
        data: () => [],
        columns: () => [],
        rowKey: 'id',
        rowClickable: false,
        showActions: true,
        selectable: false,
        ariaLabel: 'Datentabelle',
        sortable: false,
        sortableColumns: () => [],
        // Keine Defaults für sortBy/sortDirection, damit controlled/uncontrolled sauber erkannt werden
    },
)

/** ===== Emits ===== */
const emit = defineEmits<{
    (e: 'row-click', entry: TableEntry): void
    (e: 'action', payload: { action: string; entry: TableEntry }): void
    (e: 'update:selectedKeys', keys: RowKey[]): void
    (e: 'update:sortBy', sortBy: string | null): void
    (e: 'update:sortDirection', dir: SortDirection): void
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
const computedAriaLabel = computed(
    () => props.ariaLabel || t('ariaLabel', {}, 'Datentabelle'),
)
const ariaSelectAll = t('selectAll', {}, 'Alle auswählen')
const ariaSelectRow = (i: number) =>
    t('selectRow', { index: i + 1 }, `Zeile ${i + 1} auswählen`)

/** ===== Selektion: kontrolliert / unkontrolliert ===== */
const isControlledSelection = computed(() => props.selectedKeys !== undefined)
const internalSet = ref<Set<RowKey>>(new Set<RowKey>())

watch(
    () => props.selectedKeys,
    (v) => {
        if (isControlledSelection.value) {
            internalSet.value = new Set(v ?? [])
        }
    },
    { immediate: true },
)

function selectedSet(): Set<RowKey> {
    return isControlledSelection.value
        ? new Set(props.selectedKeys ?? [])
        : internalSet.value
}
function updateSelected(next: Set<RowKey>) {
    if (isControlledSelection.value) emit('update:selectedKeys', Array.from(next))
    else internalSet.value = next
}

/** ===== Helper: Row-Key ===== */
function rowKeyValue(entry: TableEntry, index: number): RowKey {
    const rk = props.rowKey
    return typeof rk === 'function'
        ? rk(entry, index)
        : (entry?.[rk] as RowKey)
}
function isSelected(entry: TableEntry, index: number): boolean {
    return selectedSet().has(rowKeyValue(entry, index))
}

/** ===== Select-All / Indeterminate ===== */
const allKeys = computed<RowKey[]>(() =>
    props.data.map((e, i) => rowKeyValue(e, i)),
)
const allChecked = computed(() => {
    const set = selectedSet()
    return (
        allKeys.value.length > 0 &&
        allKeys.value.every((k) => set.has(k))
    )
})
const indeterminate = computed(() => {
    const set = selectedSet()
    const total = allKeys.value.length
    if (total === 0) return false
    const count = allKeys.value.filter((k) => set.has(k)).length
    return count > 0 && count < total
})

function toggleAll(e: Event) {
    if (!props.selectable) return
    const checked = (e.target as HTMLInputElement).checked
    const next = new Set<RowKey>(selectedSet())
    if (checked) {
        allKeys.value.forEach((k) => next.add(k))
    } else {
        allKeys.value.forEach((k) => next.delete(k))
    }
    updateSelected(next)
}

function toggleOne(entry: TableEntry, index: number, e: Event) {
    if (!props.selectable) return
    const checked = (e.target as HTMLInputElement).checked
    const key = rowKeyValue(entry, index)
    const next = new Set<RowKey>(selectedSet())
    if (checked) next.add(key)
    else next.delete(key)
    updateSelected(next)
}

/** ===== Row click ===== */
function isRowClickable(entry: TableEntry, index: number): boolean {
    const rc = props.rowClickable
    return typeof rc === 'function' ? !!rc(entry, index) : !!rc
}
function onRowClickMaybe(entry: TableEntry, index: number) {
    if (!isRowClickable(entry, index)) return
    emit('row-click', entry)
}

/** ===== Sortierung: State (controlled/uncontrolled) ===== */
const isSortable = computed(() => !!props.sortable)
const isSortControlled = computed(() => props.sortBy !== undefined)

const internalSortBy = ref<string | null>(null)
const internalSortDirection = ref<SortDirection>('asc')

watch(
    () => props.sortBy,
    (v) => {
        if (isSortControlled.value) {
            internalSortBy.value = v ?? null
        }
    },
    { immediate: true },
)

watch(
    () => props.sortDirection,
    (v) => {
        if (isSortControlled.value && v) {
            internalSortDirection.value = v
        }
    },
    { immediate: true },
)

const currentSortBy = computed<string | null>(() =>
    isSortControlled.value ? props.sortBy ?? null : internalSortBy.value,
)
const currentSortDirection = computed<SortDirection>(() =>
    isSortControlled.value
        ? (props.sortDirection ?? 'asc')
        : internalSortDirection.value,
)

/** Darf diese Spalte sortiert werden? */
function isColumnSortable(col: TableColumn): boolean {
    if (!isSortable.value) return false
    const list = props.sortableColumns
    if (!list || list.length === 0) return true
    return list.includes(col.key)
}

/** Sortierzustand für Column (für Icons / data-sorted) */
function sortStateFor(col: TableColumn): SortDirection | null {
    if (currentSortBy.value !== col.key) return null
    return currentSortDirection.value
}

/** Daten sortieren (interne Darstellung) */
const sortedData = computed<TableEntry[]>(() => {
    const base = props.data ?? []
    const key = currentSortBy.value
    const dir = currentSortDirection.value

    if (!isSortable.value || !key || !dir) return base

    const dirFactor = dir === 'desc' ? -1 : 1

    return [...base].sort((a, b) => {
        const va = a?.[key]
        const vb = b?.[key]

        if (va == null && vb == null) return 0
        if (va == null) return -1 * dirFactor
        if (vb == null) return 1 * dirFactor

        // Numerische Sortierung, wenn beide Zahlen
        if (typeof va === 'number' && typeof vb === 'number') {
            if (va < vb) return -1 * dirFactor
            if (va > vb) return 1 * dirFactor
            return 0
        }

        const sa = String(va)
        const sb = String(vb)
        return sa.localeCompare(sb) * dirFactor
    })
})

/** Header-Klick → Sortierung toggeln */
function onHeaderClick(col: TableColumn) {
    if (!isColumnSortable(col)) return

    const key = col.key
    const curBy = currentSortBy.value
    const curDir = currentSortDirection.value

    let nextBy: string | null = key
    let nextDir: SortDirection = 'asc'

    if (curBy === key) {
        nextDir = curDir === 'asc' ? 'desc' : 'asc'
    } else {
        nextDir = 'asc'
    }

    if (isSortControlled.value) {
        emit('update:sortBy', nextBy)
        emit('update:sortDirection', nextDir)
    } else {
        internalSortBy.value = nextBy
        internalSortDirection.value = nextDir
    }
}

/** Aktionen aus Slot heraus weiterreichen */
function emitAction(action: string, entry: TableEntry) {
    emit('action', { action, entry })
}
</script>
