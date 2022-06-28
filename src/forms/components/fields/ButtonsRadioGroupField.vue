<template>
  <FieldWrapper v-bind="$props" :error-message="errorMessage">
    <div class="w-full flex gap-4">
      <label v-for="option in settings.options"
             :key="`${id}-option-${option.id}`"
             class="border rounded-md py-2 px-2 flex items-center justify-center text-sm font-medium sm:flex-1 cursor-pointer focus:outline-none"
             :class="{
               'bg-primary-700 border-transparent text-white ring-2 ring-offset-2 ring-primary-500': value === option.id,
               'bg-white dark:bg-primary-900 dark:text-white dark:text-opacity-60 border-gray-200 text-gray-900 hover:bg-gray-50': value !== option.id
             }"
      >
        <input type="radio" v-model="value" :value="option.id" class="sr-only" :aria-labelledby="`${id}-option-${option.id}-label`">
        <p :id="`${id}-option-${option.id}-label`">{{ option.label }}</p>
      </label>
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
