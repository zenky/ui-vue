<template>
  <div :class="columnClasses">
    <label v-if="label && !withoutLabel"
           :for="id"
           :id="`${id}-label`"
           class="block text-sm font-medium text-gray-700 dark:text-white dark:text-opacity-90"
           :class="{ 'hidden': hiddenLabel }"
    >
      <span :id="`${id}-label-value`">{{ label }}</span>
    </label>
    <template v-if="compact">
      <slot></slot>
      <p v-if="validationError" class="mt-2 text-sm text-red-600" v-html="validationError"></p>
      <p v-if="settings.hint" class="form-field-hint mt-2 text-sm text-gray-500 dark:text-white dark:text-opacity-60" v-html="settings.hint"></p>
    </template>
    <template v-else>
      <div :class="{ 'mt-2': !!label && !withoutLabel && !hiddenLabel }">
        <slot></slot>
      </div>
      <p v-if="validationError" class="mt-2 text-sm text-red-600" v-html="validationError"></p>
      <p v-if="settings.hint" class="form-field-hint mt-2 text-sm text-gray-500 dark:text-white dark:text-opacity-60" v-html="settings.hint"></p>
    </template>
  </div>
</template>

<script setup>
import { useFieldProps, useFieldWrapper } from '@/forms/composables/fields.js';

const props = defineProps({
  ...useFieldProps(),

  errorMessage: {
    required: false,
    default: () => null,
  },

  withoutLabel: {
    required: false,
    type: Boolean,
    default: false,
  },

  hiddenLabel: {
    required: false,
    type: Boolean,
    default: false,
  },
});

const {
  columnClasses,
  validationError,
} = useFieldWrapper(props);
</script>
