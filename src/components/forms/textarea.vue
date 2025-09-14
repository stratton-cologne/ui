<template>
    <textarea v-bind="$attrs" :id="id" data-id="stratton" data-component="sc-textarea" :data-instance="instance"
        :data-invalid="invalid || null" :data-valid="(valid && !invalid) || null" :required="required || undefined"
        :aria-invalid="invalid || undefined" :aria-describedby="ariaDescribedby" :value="modelValue" @input="onInp" />
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
const props = withDefaults(defineProps<{
    id?: string
    instance?: string
    modelValue?: string
    required?: boolean
    invalid?: boolean
    valid?: boolean
    ariaDescribedby?: string
}>(), {})

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()
function onInp(e: Event) { emit('update:modelValue', (e.target as HTMLTextAreaElement).value) }
const instance = computed(() => props.instance)
</script>
