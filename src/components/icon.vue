<script setup lang="ts">
import { computed } from 'vue'
import type { IconProps } from '../icons/_core/types'
import * as registry from '../icons' // index.ts (siehe unten)

const props = defineProps<IconProps & { name?: string; icon?: any }>()

const Comp = computed(() => {
    if (props.icon) return props.icon
    if (!props.name) return null
    const key = props.name.toLowerCase()
    // registry exportiert { Sun, Moon, ... } + default map
    return (registry as any).default?.[key] ?? (registry as any)[pascal(key)] ?? null
})

function pascal(s: string) {
    return s.replace(/(^\w|[-_]\w)/g, m => m.replace(/[-_]/, '').toUpperCase())
}
</script>

<template>
    <component v-if="Comp" :is="Comp" v-bind="$attrs" :size="size" :color="color" :stroke-width="strokeWidth"
        :absolute-stroke-width="absoluteStrokeWidth" :title="title" />
    <slot v-else />
</template>
