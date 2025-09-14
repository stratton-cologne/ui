<template>
    <input v-bind="$attrs" :id="idAttr" data-id="stratton" data-component="sc-input" :data-instance="instance"
        :data-invalid="invalid || null" :data-valid="(valid && !invalid) || null" :type="type" :value="modelValue"
        :required="required || undefined" :aria-invalid="invalid || undefined" :aria-describedby="ariaDescribedby"
        @input="onInp" />
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
const props = withDefaults(defineProps<{
    id?: string
    instance?: string
    modelValue?: string | number
    type?: string
    required?: boolean
    invalid?: boolean
    valid?: boolean
    ariaDescribedby?: string
}>(), { type: 'text' })

const emit = defineEmits<{ (e: 'update:modelValue', v: any): void }>()
const idAttr = computed(() => props.id)
const instance = computed(() => props.instance)

function onInp(e: Event) {
    const t = e.target as HTMLInputElement
    emit('update:modelValue', t.type === 'number' ? (t.valueAsNumber ?? t.value) : t.value)
}
</script>
