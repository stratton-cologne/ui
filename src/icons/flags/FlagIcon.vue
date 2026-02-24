<!-- src/icons/flags/FlagIcon.vue -->
<template>
    <img :id="id || undefined" data-id="stratton" data-component="sc-flag" :data-instance="instance || undefined"
        :src="src" :alt="altText" decoding="async" loading="lazy" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { getFlagUrl, type FlagRatio } from './index'

const props = withDefaults(defineProps<{
    code: string
    ratio?: FlagRatio
    id?: string
    instance?: string
    alt?: string
}>(), {
    ratio: '4x3',
})

const src = computed(() => getFlagUrl(props.code, props.ratio))
const altText = computed(() => props.alt ?? `${props.code} (${props.ratio})`)
</script>
