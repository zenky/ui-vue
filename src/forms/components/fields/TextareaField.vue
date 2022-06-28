<template>
  <FieldWrapper v-bind="$props" :error-message="errorMessage">
    <textarea :rows="settings.rows || 4"
              :id="id"
              class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-600 dark:text-white dark:text-opacity-90 dark:border-gray-500"
              :class="inputClasses"
              v-model="value"
              :disabled="settings.readonly"
              v-bind="attributes"
              @change="onChange"
    ></textarea>
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
