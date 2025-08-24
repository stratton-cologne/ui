<template>
    <nav v-bind="$attrs" :aria-label="computedAriaLabel" data-id="stratton">
        <ol>
            <li v-for="(item, i) in items" :key="item.path ?? i">
                <slot name="item" :item="resolvedItem(item)" :index="i" :is-last="i === items.length - 1">
                    <RouterLink v-if="i < items.length - 1 && item.path" :to="item.path">
                        {{ resolvedItem(item).label }}
                    </RouterLink>
                    <span v-else>{{ resolvedItem(item).label }}</span>
                </slot>
                <slot v-if="i < items.length - 1" name="separator">{{ separatorText }}</slot>
            </li>
        </ol>
    </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useUiI18n } from '../i18n'

export interface Crumb {
    path?: string
    labelKey?: string
    label?: string
}

const props = defineProps<{
    fromRouter?: boolean
    items?: Crumb[]
    ariaLabel?: string
    separator?: string
}>()

const route = useRoute()
const { t } = useUiI18n('breadcrumb')

const computedAriaLabel = computed(() => props.ariaLabel ?? t('ariaLabel', {}, 'Breadcrumb'))
const separatorText = computed(() => props.separator ?? t('separator', {}, '›'))

const items = computed<Crumb[]>(() => {
    if (props.items && props.items.length) return props.items
    if (props.fromRouter === false) return []
    const matched = route.matched.filter((r) => r.path !== '/')
    return matched.map((m) => ({
        path: m.path,
        label: (m.meta as any)?.breadcrumb ?? (m.name as any) ?? m.path,
    }))
})

function resolvedItem(item: Crumb): Required<Pick<Crumb, 'label'>> & Pick<Crumb, 'path'> {
    if (item.labelKey) {
        const tr = t(`items.${item.labelKey}`, {}, item.labelKey)
        return { label: tr, path: item.path }
    }
    return { label: item.label ?? '', path: item.path }
}
</script>
