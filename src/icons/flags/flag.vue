<!-- src/icons/flags/Flag.vue -->
<template>
    <img :src="src" :alt="altText" :aria-label="ariaLabelComputed" loading="lazy" decoding="async" v-bind="$attrs"
        class="flag" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getFlagUrl, normalizeCode, type FlagRatio } from './index'

type Props = {
    /** ISO-Code oder Locale, z. B. 'de', 'de-DE', 'en-US' */
    name: string
    /** Verhältnis der Flagge */
    ratio?: FlagRatio
    /** Alternativtext; wenn leer, wird aus dem Code generiert */
    alt?: string
    /** Optional eigenes aria-label; wenn leer, wird aus dem Code generiert */
    ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
    ratio: '4x3',
    alt: '',
    ariaLabel: ''
})

const normCode = computed(() => normalizeCode(props.name))
const src = computed(() => getFlagUrl(normCode.value, props.ratio))

const altText = computed(() => props.alt || `Flagge ${normCode.value} ${props.ratio}`)
const ariaLabelComputed = computed(() => props.ariaLabel || `Flagge ${normCode.value} ${props.ratio}`)
</script>

<style scoped>
.flag {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 6px;
    box-shadow: 0 0 0 1px #e5e7eb inset;
    /* Wer mag: aspect-ratio via Utility-Klassen setzen */
}
</style>
