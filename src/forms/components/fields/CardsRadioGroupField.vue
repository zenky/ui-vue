<template>
  <FieldWrapper v-bind="$props" :error-message="errorMessage">
    <div class="grid" :class="gridClasses">
      <label v-for="(option, index) in settings.options"
             :key="`${id}-options-${index}-option`"
             class="relative bg-white dark:bg-gray-700 border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
             :class="{
               'border-transparent ring-2 ring-primary-500': option.id === value,
               'border-gray-300': option.id !== value,
             }"
      >
        <input type="radio"
               :value="option.id"
               class="sr-only"
               :aria-labelledby="`${name}-${index}-label`"
               :aria-describedby="`${option.description ? name + '-' + index + '-description' : null}`"
               v-model="value"
        >
        <div class="flex-1 flex">
          <div class="flex flex-col">
            <span :id="`${name}-${index}-label`" class="block text-sm font-medium text-gray-900 dark:text-white dark:text-opacity-90">
              {{ option.label }}
            </span>
            <span v-if="option.description"
                  :id="`${name}-${index}-description`"
                  class="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-300"
            >
              {{ option.description }}
            </span>
            <span v-if="option.subtitle"
                  :id="`${name}-${index}-subtitle`"
                  class="mt-auto text-sm font-medium text-gray-900 dark:text-white dark:text-opacity-90"
            >
              {{ option.subtitle }}
            </span>
          </div>
        </div>
        <svg class="h-5 w-5 text-primary-600"
             :class="{ 'invisible': option.id !== value }"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 20 20"
             fill="currentColor"
             aria-hidden="true"
        >
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <div class="absolute -inset-px rounded-lg border-2 pointer-events-none"
             :class="{
               'border border-primary-500': option.id === value,
               'border-2 border-transparent': option.id !== value,
             }"
             aria-hidden="true"
        ></div>
      </label>
    </div>
  </FieldWrapper>
</template>

<script setup>
import { computed } from 'vue';
import { useFieldProps, useField } from '@/forms/composables/fields.js';

const props = defineProps(useFieldProps());
const emit = defineEmits(['update:modelValue']);
const {
  value,
  errorMessage,
} = useField(props, emit, () => null);

const gridClasses = computed(() => {
  if (props.settings && props.settings.grid) {
    return props.settings.grid;
  }

  const classes = ['gap-4 grid-cols-1 lg:grid-cols-2'];

  if (props.settings.options.length > 2 && props.settings.options.length % 2 === 0) {
    classes.push('xl:grid-cols-2');
  }

  if (props.settings.options.length > 2 && props.settings.options.length % 3 === 0) {
    classes.push('xl:grid-cols-3');
  }

  return classes;
});
</script>
