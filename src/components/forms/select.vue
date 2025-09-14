<template>
    <select v-bind="$attrs" :id="id" data-id="stratton" data-component="sc-select" :data-instance="instance"
        :data-invalid="invalid || null" :data-valid="(valid && !invalid) || null" :multiple="multiple || undefined"
        :required="required || undefined" :aria-invalid="invalid || undefined" :aria-describedby="ariaDescribedby"
        :value="modelValue" @change="onChg">
        <slot />
    </select>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
const props = withDefaults(defineProps<{
    id?: string
    instance?: string
    modelValue?: string | number | (string | number)[]
    multiple?: boolean
    required?: boolean
    invalid?: boolean
    valid?: boolean
    ariaDescribedby?: string
}>(), {})

const emit = defineEmits<{ (e: 'update:modelValue', v: any): void }>()
function onChg(e: Event) {
    const el = e.target as HTMLSelectElement
    if (props.multiple) {
        const vals = Array.from(el.selectedOptions).map(o => o.value)
        emit('update:modelValue', vals)
    } else {
        emit('update:modelValue', el.value)
    }
}
const instance = computed(() => props.instance)
</script>
