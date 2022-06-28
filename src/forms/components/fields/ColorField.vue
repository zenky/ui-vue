<template>
  <FieldWrapper v-bind="$props" :error-message="errorMessage">
    <div class="flex rounded-md shadow-sm border dark:bg-gray-600 dark:text-white dark:text-opacity-90 dark:border-gray-500"
         :class="inputClasses"
    >
      <div class="relative flex items-stretch flex-grow focus-within:z-10">
        <input type="text"
               :id="id"
               class="block w-full sm:text-sm rounded-none rounded-l-md border-0 dark:bg-gray-600 dark:text-white dark:text-opacity-90 focus:ring-2"
               :class="inputClasses"
               :style="{ backgroundColor: value, color: iconColor }"
               :disabled="settings.disabled"
               v-model="value"
               v-bind="attributes"
               @change="onChange"
        >
      </div>
      <button class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border-0 dark:bg-gray-600 dark:text-white dark:text-opacity-90 sm:text-sm rounded-r-md focus:ring-2"
              :class="inputClasses"
              :style="{ backgroundColor: value }"
      >
        <input type="color"
               ref="picker"
               :value="value"
               class="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
               @change="handleColorPickerChangeEvent"
        >
        <svg class="w-5 h-w text-gray-400"
             :style="{ color: iconColor }"
             fill="none"
             stroke="currentColor"
             viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
        </svg>
      </button>
    </div>
  </FieldWrapper>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useFieldProps, useField } from '@/forms/composables/fields.js';
import colorsGenerator from '@/forms/composables/fields/color.js';

const props = defineProps(useFieldProps());
const emit = defineEmits(['update:modelValue']);
const {
  attributes,
  value,
  inputClasses,
  errorMessage,
  onChange,
} = useField(props, emit, () => null);

const iconColor = ref(null);

watch(value, () => {
  if (!value.value) {
    iconColor.value = '';

    return;
  }

  iconColor.value = colorsGenerator.generateTextColor(value.value);
}, { immediate: true });

const handleColorPickerChangeEvent = ($event) => {
  emit('update:modelValue', $event.target.value);
  onChange($event);
};
</script>
