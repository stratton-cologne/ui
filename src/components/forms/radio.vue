<template>
    <label v-bind="$attrs" :id="rootId" data-id="stratton" data-component="sc-radio" :data-instance="instanceAttr">
        <input type="radio" :id="inputId" :name="name" :value="value" :checked="modelValue === value"
            :required="required || undefined" @change="onChg" />
        <span data-role="label">
            <slot />
        </span>
    </label>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { useStableId } from '../../composables/useStableId'
const props = withDefaults(defineProps<{
    id?: string
    instance?: string
    name: string
    value: string | number
    modelValue?: string | number
    required?: boolean
}>(), {})

const emit = defineEmits<{ (e: 'update:modelValue', v: string | number): void }>()
const makeId = useStableId('radio')
const rootId = computed(() => props.id ?? makeId('root'))
const inputId = makeId('inp')
const instanceAttr = computed(() => props.instance ?? makeId('inst'))
function onChg() { emit('update:modelValue', props.value) }
</script>
