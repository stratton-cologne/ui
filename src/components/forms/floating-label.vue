<template>
    <div v-bind="$attrs" :id="rootId" data-id="stratton" data-component="sc-floating" :data-instance="instanceAttr"
        :data-active="active || null" :data-invalid="invalid || null" :data-required="required || null">
        <label :for="inputId" data-role="label">{{ label }}</label>
        <div data-role="control">
            <slot :id="inputId" :describedBy="describedBy" />
        </div>
        <div v-if="hint" :id="hintId" data-role="hint">{{ hint }}</div>
    </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { useStableId } from '../../composables/useStableId'

const props = withDefaults(defineProps<{
    id?: string
    instance?: string
    label: string
    modelValue?: string | number | null
    required?: boolean
    invalid?: boolean
    hint?: string
}>(), { modelValue: null })

const makeId = useStableId('floating')
const rootId = computed(() => props.id ?? makeId('root'))
const instanceAttr = computed(() => props.instance ?? makeId('inst'))
const inputId = makeId('inp')
const hintId = makeId('hint')

const active = computed(() => !!(props.modelValue !== null && String(props.modelValue).length))
const describedBy = computed(() => props.hint ? hintId : undefined)
</script>
