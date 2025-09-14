<template>
    <input v-bind="$attrs" :id="id" data-id="stratton" data-component="sc-range" :data-instance="instance" type="range"
        :min="min" :max="max" :step="step" :value="modelValue" @input="onInp" />
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'

const props = withDefaults(defineProps<{
    id?: string
    instance?: string
    modelValue?: number
    min?: number
    max?: number
    step?: number
}>(), { min: 0, max: 100, step: 1, modelValue: 0 })

const emit = defineEmits<{ (e: 'update:modelValue', v: number): void }>()
const instance = computed(() => props.instance)
function onInp(e: Event) { emit('update:modelValue', (e.target as HTMLInputElement).valueAsNumber) }
</script>
