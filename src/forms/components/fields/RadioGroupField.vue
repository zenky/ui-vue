<template>
  <FieldWrapper v-bind="$props" :error-message="errorMessage">
    <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
      <div v-for="option in settings.options"
           class="flex items-center"
           :key="`${id}-option-${option.id}`"
      >
        <input :id="`${id}-option-${option.id}`"
               type="radio"
               class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
               :value="option.id"
               v-model="value"
        >
        <label :for="`${id}-option-${option.id}`"
               class="ml-3 block text-sm font-medium text-gray-700 dark:text-white dark:text-opacity-90"
        >
          {{ option.label }}
        </label>
      </div>
    </div>
  </FieldWrapper>
</template>

<script setup>
import { useFieldProps, useField } from '@/forms/composables/fields.js';

const props = defineProps(useFieldProps());
const emit = defineEmits(['update:modelValue']);
const {
  value,
  errorMessage,
} = useField(props, emit, () => null);
</script>
