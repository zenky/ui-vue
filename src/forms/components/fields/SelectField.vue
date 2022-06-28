<template>
  <FieldWrapper v-bind="$props" :error-message="errorMessage">
    <select :id="id"
            class="shadow-sm block w-full sm:text-sm rounded-md dark:bg-gray-600 dark:text-white dark:text-opacity-90 dark:border-gray-500"
            :class="inputClasses"
            v-model="value"
            :disabled="settings.disabled"
            v-bind="attributes"
            @change="onChange"
    >
      <option v-for="(optionLabel, optionValue) in settings.options"
              :value="optionValue"
              :key="`${id}-${optionValue}-value`"
      >
        {{ optionLabel }}
      </option>
    </select>
  </FieldWrapper>
</template>

<script setup>
import { useFieldProps, useField } from '@/forms/composables/fields.js';

const props = defineProps(useFieldProps());
const emit = defineEmits(['update:modelValue']);
const {
  attributes,
  value,
  inputClasses,
  errorMessage,
  onChange,
} = useField(props, emit, () => '');
</script>
