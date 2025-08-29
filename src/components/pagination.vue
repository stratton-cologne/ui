<template>
    <nav v-bind="$attrs" :id="rootId" data-id="stratton" data-component="sc-pagination" :data-instance="instanceAttr"
        role="navigation" :aria-label="computedAriaLabel">
        <div data-role="status">
            <slot name="status" :from="from" :to="to" :total="total">
                {{ statusText }}
            </slot>
        </div>

        <div data-role="pager">
            <button type="button" data-role="first" :disabled="page <= 1" @click="goTo(1)" :aria-label="ariaFirst">
                <Icon name="chevrons-left" size="16" />
            </button>

            <button type="button" data-role="prev" :disabled="page <= 1" @click="goTo(page - 1)" :aria-label="ariaPrev">
                <Icon name="chevron-left" size="16" />
            </button>

            <!-- barrierearme Seitenauswahl -->
            <input :id="pageInputId" data-role="page-input" type="number" :min="1" :max="pageCount || 1" :value="page"
                @change="onPageInput" :aria-labelledby="pageLabelId" />
            <span :id="pageLabelId" data-role="page-label">{{ ofText }}</span>

            <button type="button" data-role="next" :disabled="page >= pageCount" @click="goTo(page + 1)"
                :aria-label="ariaNext">
                <Icon name="chevron-right" size="16" />
            </button>

            <button type="button" data-role="last" :disabled="page >= pageCount" @click="goTo(pageCount)"
                :aria-label="ariaLast">
                <Icon name="chevrons-right" size="16" />
            </button>
        </div>

        <div v-if="pageSizes?.length" data-role="pagesize">
            <label :for="sizeSelectId" data-role="pagesize-label">{{ perPageLabel }}</label>
            <select :id="sizeSelectId" :value="effectivePageSize" @change="onSizeChange">
                <option v-for="sz in pageSizes" :key="sz" :value="sz">{{ sz }}</option>
            </select>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { computed, withDefaults, onMounted } from 'vue'
import { useStableId } from '../composables/useStableId'
import { useUiI18n } from '../i18n'
import Icon from './icon.vue'

const props = withDefaults(defineProps<{
    page: number
    pageSize: number
    total: number
    pageSizes?: number[]
    ariaLabel?: string
    id?: string
    instance?: string
}>(), {
    page: 1,
    pageSize: 25,
    total: 0,
    pageSizes: () => [5, 10, 25, 50, 100],
})

const emit = defineEmits<{
    (e: 'update:page', v: number): void
    (e: 'update:pageSize', v: number): void
    (e: 'change', payload: { page: number; pageSize: number }): void
}>()

/* Stable IDs */
const makeId = useStableId('pagination')
const rootId = computed(() => props.id ?? makeId('root'))
const instanceAttr = computed(() => props.instance ?? makeId('inst'))
const sizeSelectId = makeId('size')
const pageInputId = makeId('page')
const pageLabelId = makeId('plabel')

/* i18n */
const { t } = useUiI18n('pagination')
const computedAriaLabel = computed(() => props.ariaLabel ?? t('ariaNav', {}, 'Seitennavigation'))
const ariaFirst = computed(() => t('first', {}, 'Erste Seite'))
const ariaPrev = computed(() => t('prev', {}, 'Zurück'))
const ariaNext = computed(() => t('next', {}, 'Weiter'))
const ariaLast = computed(() => t('last', {}, 'Letzte Seite'))
const perPageLabel = computed(() => t('perPage', {}, 'Pro Seite'))

/* Seitenberechnung */
const pageCount = computed(() => Math.max(1, Math.ceil(props.total / Math.max(1, props.pageSize))))
const clampedPage = (p: number) => Math.min(pageCount.value, Math.max(1, p))

/* Status-Text (lokalisiert) */
const from = computed(() => props.total === 0 ? 0 : (props.page - 1) * props.pageSize + 1)
const to = computed(() => Math.min(props.total, props.page * props.pageSize))
const statusText = computed(() =>
    t('status', { from: from.value, to: to.value, total: props.total }, `${from.value}–${to.value} von ${props.total}`)
)
const ofText = computed(() => t('of', { count: pageCount.value }, `/ ${pageCount.value}`))

/* Effektive PageSize im Select (falls initiale pageSize nicht in pageSizes enthalten ist) */
const effectivePageSize = computed(() => {
    const sizes = props.pageSizes ?? []
    if (!sizes.length) return props.pageSize
    return sizes.includes(props.pageSize) ? props.pageSize : sizes[0]
})

/* Initial normalisieren, damit Select & Parent konsistent sind */
onMounted(() => {
    const sizes = props.pageSizes ?? []
    if (!sizes.length) return
    const desired = sizes.includes(props.pageSize) ? props.pageSize : sizes[0]
    if (desired !== props.pageSize) {
        emit('update:pageSize', desired)
        emit('update:page', 1)
        emit('change', { page: 1, pageSize: desired })
    }
})

/* Events */
function goTo(p: number) {
    const next = clampedPage(p)
    if (next === props.page) return
    emit('update:page', next)
    emit('change', { page: next, pageSize: props.pageSize })
}

function onSizeChange(e: Event) {
    const nextSize = Math.max(1, Number((e.target as HTMLSelectElement).value))
    if (nextSize === props.pageSize) return
    emit('update:pageSize', nextSize)
    emit('update:page', 1)
    emit('change', { page: 1, pageSize: nextSize })
}

function onPageInput(e: Event) {
    const v = Number((e.target as HTMLInputElement).value)
    goTo(isNaN(v) ? 1 : v)
}
</script>
