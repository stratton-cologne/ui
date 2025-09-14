<template>
    <div v-bind="$attrs" :id="rootId" data-id="stratton" data-component="sc-input-group" :data-instance="instanceAttr">
        <span data-role="addon-before">
            <slot name="before" />
        </span>
        <span data-role="control">
            <slot />
        </span>
        <span data-role="addon-after">
            <slot name="after" />
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { useStableId } from '../../composables/useStableId'
const props = withDefaults(defineProps<{ id?: string; instance?: string }>(), {})
const makeId = useStableId('igroup')
const rootId = computed(() => props.id ?? makeId('root'))
const instanceAttr = computed(() => props.instance ?? makeId('inst'))
</script>
