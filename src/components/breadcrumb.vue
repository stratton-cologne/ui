<template>
    <nav v-bind="$attrs" :aria-label="computedAriaLabel" data-id="stratton">
        <ol>
            <li v-for="(item, i) in crumbs" :key="item.path ?? i">
                <slot name="item" :item="resolvedItem(item)" :index="i" :is-last="i === crumbs.length - 1">
                    <RouterLink v-if="i < crumbs.length - 1 && item.path" :to="item.path">
                        {{ resolvedItem(item).label }}
                    </RouterLink>
                    <span v-else>{{ resolvedItem(item).label }}</span>
                </slot>
                <slot v-if="i < crumbs.length - 1" name="separator">
                    <span class="separator">{{ separatorText }}</span>
                </slot>
            </li>
        </ol>
    </nav>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useUiI18n } from '../i18n'

export interface Crumb {
    path?: string
    labelKey?: string
    label?: string
}

const props = withDefaults(defineProps<{
    fromRouter?: boolean
    items?: Crumb[]
    ariaLabel?: string
    separator?: string
    includeRoot?: boolean
}>(), {
    fromRouter: true,
    includeRoot: true,
})

const route = useRoute()
const { t } = useUiI18n('breadcrumb')

const computedAriaLabel = computed(() => props.ariaLabel ?? t('ariaLabel', {}, 'Breadcrumb'))
const separatorText = computed(() => props.separator ?? t('separator', {}, '›'))

function mapRecordToCrumb(r: any): Crumb {
    return {
        path: r.path || undefined,
        label: (r.meta as any)?.breadcrumb ?? (r.name as any) ?? (r.path || ''),
    }
}

const baseCrumbs = computed<Crumb[]>(() => {
    // 1) explizite Items?
    if (props.items?.length) return props.items
    // 2) Router-basiert?
    if (!props.fromRouter) return []
    return route.matched.map(mapRecordToCrumb)
})

const crumbs = computed<Crumb[]>(() => {
    const arr = baseCrumbs.value.slice()
    if (props.includeRoot === false && arr.length) arr.shift()
    return arr
})

function resolvedItem(item: Crumb): Required<Pick<Crumb, 'label'>> & Pick<Crumb, 'path'> {
    if (item.labelKey) {
        const tr = t(`items.${item.labelKey}`, {}, item.labelKey)
        return { label: tr, path: item.path }
    }
    return { label: item.label ?? '', path: item.path }
}
</script>
