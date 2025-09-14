<template>
    <div v-bind="$attrs" :id="rootId" data-id="stratton" data-component="sc-form-col" :data-instance="instanceAttr"
        :data-span="span || null">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { useStableId } from '../../composables/useStableId'
const props = withDefaults(defineProps<{ id?: string; instance?: string; span?: number | string }>(), {})
const makeId = useStableId('fcol')
const rootId = computed(() => props.id ?? makeId('root'))
const instanceAttr = computed(() => props.instance ?? makeId('inst'))
</script>
