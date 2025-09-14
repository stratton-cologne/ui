<template>
    <div v-bind="$attrs" :id="rootId" data-id="stratton" data-component="sc-form-row" :data-instance="instanceAttr">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { useStableId } from '../../composables/useStableId'
const props = withDefaults(defineProps<{ id?: string; instance?: string }>(), {})
const makeId = useStableId('frow')
const rootId = computed(() => props.id ?? makeId('root'))
const instanceAttr = computed(() => props.instance ?? makeId('inst'))
</script>
