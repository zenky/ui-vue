<template>
  <FieldWrapper v-bind="$props" :error-message="errorMessage">
    <input :type="settings.type"
           :id="id"
           class="shadow-sm block w-full sm:text-sm rounded-md dark:bg-gray-600 dark:text-white dark:text-opacity-90 dark:border-gray-500"
           :class="inputClasses"
           v-model="value"
           :disabled="settings.disabled"
           v-bind="attributes"
           @change="onChange"
    >
  </FieldWrapper>
</template>

<script setup>
import { useFieldProps, useField } from '@/forms/composables/fields.js';

const props = defineProps(useFieldProps());
const emit = defineEmits(['update:modelValue']);
const {
  value,
  inputClasses,
  attributes,
  onChange,
  errorMessage,
} = useField(props, emit, () => null);
</script>
