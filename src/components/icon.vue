<script setup lang="ts">
import { computed } from 'vue'
import type { IconProps } from '../icons/_core/types'
import * as registry from '../icons'

/* ⬇︎ WICHTIG: class/style NICHT als Prop schlucken */
type PublicIconProps = Omit<IconProps, 'class' | 'style'> & { name?: string; icon?: any }
const props = defineProps<PublicIconProps>()

const Comp = computed(() => {
    if (props.icon) return props.icon
    if (!props.name) return null
    const key = props.name.toLowerCase()
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
