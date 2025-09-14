<template>
    <form v-bind="$attrs" :id="rootId" data-id="stratton" data-component="sc-form" :data-instance="instanceAttr"
        :novalidate="novalidate || undefined" @submit.prevent="onSubmit">
        <slot />
    </form>
</template>
<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { useStableId } from '../../composables/useStableId'

const props = withDefaults(defineProps<{
    id?: string
    instance?: string
    novalidate?: boolean
}>(), { novalidate: true })

const emit = defineEmits<{ (e: 'submit', ev: Event): void }>()

const makeId = useStableId('form')
const rootId = computed(() => props.id ?? makeId('root'))
const instanceAttr = computed(() => props.instance ?? makeId('inst'))

function onSubmit(ev: Event) { emit('submit', ev) }
</script>
