<!-- src/components/breadcrumb.vue -->
<template>
    <nav v-bind="$attrs" :id="rootId" data-id="stratton" data-component="sc-breadcrumb" :data-instance="instanceAttr"
        role="navigation" :aria-label="computedAriaLabel">
        <ol data-role="list">
            <li v-for="(item, i) in crumbs" :key="item.path ?? i" data-role="item"
                :data-last="i === crumbs.length - 1 || null">
                <slot name="item" :item="resolvedItem(item)" :index="i" :is-last="i === crumbs.length - 1">
                    <RouterLink v-if="i < crumbs.length - 1 && item.path" :to="item.path" data-role="link">
                        {{ resolvedItem(item).label }}
                    </RouterLink>

                    <span v-else data-role="current" aria-current="page">
                        {{ resolvedItem(item).label }}
                    </span>
                </slot>

                <slot v-if="i < crumbs.length - 1" name="separator">
                    <span data-role="separator">{{ separatorText }}</span>
                </slot>
            </li>
        </ol>
    </nav>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useUiI18n } from '../i18n'
import { useStableId } from '../composables/useStableId'

export interface Crumb {
    path?: string
    labelKey?: string
    label?: string
}

const props = withDefaults(defineProps<{
    /** Wenn true, aus der aktuellen Route generieren (Fallback, falls items leer). */
    fromRouter?: boolean
    /** Explizite Crumbs (haben Vorrang vor fromRouter). */
    items?: Crumb[]
    /** ARIA-Label des Navigations-Containers. */
    ariaLabel?: string
    /** Text/Zeichen als Separator zwischen den Crumbs. */
    separator?: string
    /** Root-/Start-Route auslassen. */
    includeRoot?: boolean
    /** Stabile ID am Root-Element. */
    id?: string
    /** Instanz-Attribut für gezieltes Styling von außen. */
    instance?: string
}>(), {
    fromRouter: true,
    includeRoot: true,
})

const route = useRoute()
const { t } = useUiI18n('breadcrumb')

/* Stable IDs / data-instance */
const makeId = useStableId('breadcrumb')
const rootId = computed(() => props.id ?? makeId('root'))
const instanceAttr = computed(() => props.instance ?? makeId('inst'))

/* A11y / Texte */
const computedAriaLabel = computed(() => props.ariaLabel ?? t('ariaLabel', {}, 'Breadcrumb'))
const separatorText = computed(() => props.separator ?? t('separator', {}, '›'))

/* Route → Crumb */
function mapRecordToCrumb(r: any): Crumb {
    return {
        path: r.path || undefined,
        label: (r.meta as any)?.breadcrumb ?? (r.name as any) ?? (r.path || ''),
    }
}

/* Basis-Datenquelle */
const baseCrumbs = computed<Crumb[]>(() => {
    if (props.items?.length) return props.items
    if (!props.fromRouter) return []
    return route.matched.map(mapRecordToCrumb)
})

/* Optionale Root-Unterdrückung */
const crumbs = computed<Crumb[]>(() => {
    const arr = baseCrumbs.value.slice()
    if (props.includeRoot === false && arr.length) arr.shift()
    return arr
})

/* i18n-LabelKeys auflösen */
function resolvedItem(item: Crumb): Required<Pick<Crumb, 'label'>> & Pick<Crumb, 'path'> {
    if (item.labelKey) {
        const tr = t(`items.${item.labelKey}`, {}, item.labelKey)
        return { label: tr, path: item.path }
    }
    return { label: item.label ?? '', path: item.path }
}
</script>
