<!-- src/components/tab-panel.vue -->
<template>
    <!-- Panel -->
    <aside v-bind="$attrs" :id="rootId" data-id="stratton" data-component="sc-tab-panel" :data-instance="instanceAttr"
        :data-width="widthAttr" role="dialog" aria-modal="true">
        <!-- Tabs -->
        <div data-role="tab-list" role="tab-list" :aria-label="t('tab-panel.sectionLabel', {}, 'Sections')"
            aria-orientation="horizontal" ref="tablistRef" @keydown.prevent.stop="onKeydown">
            <button v-for="t in tabs" :key="t.key" role="tab" :id="tabId(t.key)" :aria-controls="panelId(t.key)"
                :aria-selected="t.key === currentTab" :aria-disabled="!!t.disabled"
                :tabindex="t.key === currentTab ? 0 : -1" :disabled="t.disabled" type="button" data-role="tab"
                :data-key="t.key" :data-active="t.key === currentTab || null" :data-disabled="t.disabled || null"
                @click="selectTab(t.key)" :ref="(el) => setItemRef(t.key, el as HTMLButtonElement)">
                <span data-role="tab-label">
                    <span v-if="t.icon" data-role="tab-icon">{{ t.icon }}</span>
                    {{ t.label }}
                    <span v-if="t.badge != null" data-role="tab-badge" :data-badge="String(t.badge)" aria-hidden="true">
                        {{ t.badge }}
                    </span>
                </span>
            </button>
        </div>

        <!-- Content -->
        <div data-role="tab-content">
            <template v-if="tabs.length > 0">
                <section v-for="t in tabs" :key="t.key" role="tabpanel" :id="panelId(t.key)"
                    :aria-labelledby="tabId(t.key)" v-show="t.key === currentTab" data-role="tabpanel" :data-key="t.key"
                    :data-active="t.key === currentTab || null">
                    <slot :name="`tab-${t.key}`" />
                    <slot v-if="!hasNamedSlot(`tab-${t.key}`)" :tab="t" />
                </section>
            </template>
            <template v-else>
                <div data-role="empty-hint">
                    {{ t('tab-panel.empty', {}, 'Keine Tabs definiert.') }}
                </div>
            </template>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { computed, defineEmits, useSlots, ref, watch, nextTick, withDefaults } from 'vue'
import { useStableId } from '../composables/useStableId'
import { useTablistNav } from '../composables/useTablistNav'
import { useUiI18n } from '../i18n'

export type TabKey = string
export interface TabItem {
    key: TabKey
    label: string
    icon?: string
    badge?: number | string
    disabled?: boolean
}

const props = withDefaults(defineProps<{
    tabs: TabItem[]
    activeTab?: TabKey
    title?: string
    /** Breite bleibt als Prop bestehen (Kompatibilität),
     *  wird aber NICHT mehr als Inline-Style gesetzt.
     *  Sie ist nur noch als data-Attribut verfügbar (data-width),
     *  Styling erfolgt im Consumer. */
    width?: string | number
    nameForInitials?: string
    /** Optional: feste DOM-ID und Instanzkennung am Root */
    id?: string
    instance?: string
}>(), {
    width: '560px'
})

const emit = defineEmits<{
    (e: 'update:activeTab', v: TabKey): void
    (e: 'close'): void
    (e: 'refresh'): void
    (e: 'tab-change', payload: { key: TabKey; previous?: TabKey }): void
    (e: 'action', payload: { action: string; data?: unknown }): void
}>()

const { t } = useUiI18n() // nutzt sc.ui.* defaults

/************ Slots & IDs ************/
const slots = useSlots()
const makeId = useStableId('tab-panel')

/** Root-ID & Instance-Attribut */
const rootId = computed(() => props.id ?? makeId('root'))
const instanceAttr = computed(() => props.instance ?? makeId('inst'))

/** Tab/Panel IDs */
const tabId = (k: TabKey) => makeId(`tab-${k}`)
const panelId = (k: TabKey) => makeId(`panel-${k}`)

/** data-width: nur als String-Attribut, Styling im Consumer */
const widthAttr = computed(() => {
    const w = props.width
    return typeof w === 'number' ? `${w}px` : (w ?? '')
})

/************ State ************/
const firstEnabledKey = computed<TabKey>(() => props.tabs.find((t) => !t.disabled)?.key ?? '')
const innerActiveTab = ref<TabKey>(props.activeTab ?? firstEnabledKey.value)

watch(() => props.activeTab, (v) => {
    if (!v) return
    if (props.tabs.some((t) => t.key === v && !t.disabled)) {
        innerActiveTab.value = v
    }
})

const currentTab = computed<TabKey>(() => {
    const keys = props.tabs.filter((t) => !t.disabled).map((t) => t.key)
    const model = props.activeTab ?? innerActiveTab.value
    return keys.includes(model) ? model : firstEnabledKey.value
})

/************ A11y & Tastatur ************/
const { tablistRef, setItemRef, focusItem, onKeydown } = useTablistNav(
    () => props.tabs,
    () => currentTab.value,
    (key) => selectTab(key)
)

function hasNamedSlot(name: string) { return !!slots[name] }

function selectTab(key: TabKey) {
    if (key === currentTab.value) return
    const prev = currentTab.value
    innerActiveTab.value = key
    emit('update:activeTab', key)
    emit('tab-change', { key, previous: prev })
    nextTick(() => focusItem(key))
}
</script>

<!-- keine Styles: komplett konsumergesteuertes Styling -->
