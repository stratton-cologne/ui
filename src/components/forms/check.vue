<template>
    <label v-bind="$attrs" :id="rootId" data-id="stratton" data-component="sc-check" :data-instance="instanceAttr"
        :data-invalid="invalid || null">
        <input type="checkbox" :id="inputId" :name="name" :checked="modelValue" :required="required || undefined"
            :aria-invalid="invalid || undefined" @change="onChg" />
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
    name?: string
    modelValue?: boolean
    required?: boolean
    invalid?: boolean
}>(), { modelValue: false })

const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()

const makeId = useStableId('check')
const rootId = computed(() => props.id ?? makeId('root'))
const inputId = makeId('inp')
const instanceAttr = computed(() => props.instance ?? makeId('inst'))
function onChg(e: Event) { emit('update:modelValue', (e.target as HTMLInputElement).checked) }
</script>
