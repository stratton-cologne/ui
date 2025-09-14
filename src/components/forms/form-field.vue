<template>
    <div v-bind="$attrs" :id="rootId" data-id="stratton" data-component="sc-field" :data-instance="instanceAttr"
        :data-required="required || null" :data-invalid="invalid || null" :data-valid="(valid && !invalid) || null">
        <label v-if="label" :id="labelId" :for="controlId" data-role="label">{{ label }}</label>

        <slot :inputId="controlId" :describedBy="describedBy" :labelId="labelId" :invalid="invalid"
            :required="required" />

        <div v-if="help" :id="helpId" data-role="help">{{ help }}</div>
        <div v-if="error" :id="errorId" data-role="error">{{ error }}</div>
    </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { useStableId } from '../../composables/useStableId'

const props = withDefaults(defineProps<{
    id?: string
    instance?: string
    label?: string
    help?: string
    error?: string
    required?: boolean
    valid?: boolean
    invalid?: boolean
}>(), {})

const makeId = useStableId('field')
const rootId = computed(() => props.id ?? makeId('root'))
const instanceAttr = computed(() => props.instance ?? makeId('inst'))

const controlId = makeId('control')
const labelId = makeId('label')
const helpId = makeId('help')
const errorId = makeId('error')

const describedBy = computed(() => {
    const ids: string[] = []
    if (props.help) ids.push(helpId)
    if (props.error) ids.push(errorId)
    return ids.join(' ') || undefined
})
</script>
