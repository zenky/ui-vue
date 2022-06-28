<template>
  <div class="sm:col-span-6">
    <div class="flex items-center">
      <button type="button"
              class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              :class="buttonClasses"
              role="switch"
              :aria-checked="`${value ? 'true' : 'false'}`"
              :aria-labelledby="`${id}-label`"
              :aria-describedby="`${id}-hint`"
              @click="toggleValue"
      >
        <span aria-hidden="true"
              class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
              :class="switchClasses"
        >
          <template v-if="settings.icons">
            <span class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                  :class="{ 'opacity-0 ease-out duration-100': value, 'opacity-100 ease-in duration-200': !value }"
                  aria-hidden="true"
            >
              <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <span class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                  :class="{ 'opacity-100 ease-in duration-200': value, 'opacity-0 ease-out duration-100': !value }"
                  aria-hidden="true"
            >
              <svg class="h-3 w-3 text-primary-600" fill="currentColor" viewBox="0 0 12 12">
                <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
              </svg>
            </span>
          </template>
        </span>
      </button>
      <span class="ml-3 flex-grow flex flex-col">
        <span :id="`${id}-label`"
              class="text-sm font-medium text-gray-900 dark:text-white dark:text-opacity-90 cursor-pointer"
              @click="toggleValue"
              @keydown.space="toggleValue"
              v-html="label"
        ></span>
        <span v-if="settings.hint"
              :id="`${id}-hint`"
              class="form-field-hint text-sm text-gray-500 dark:text-gray-400"
              v-html="settings.hint"
        ></span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useFieldProps, useField } from '@/forms/composables/fields.js';

const props = defineProps(useFieldProps());
const emit = defineEmits(['update:modelValue', 'update']);
const {
  value,
} = useField(props, emit, () => false);

const buttonClasses = computed(() => ({
  'bg-primary-600': value.value === true,
  'bg-gray-200': value.value === false,
}));

const switchClasses = computed(() => ({
  'translate-x-5': value.value === true,
  'translate-x-0': value.value === false,
  relative: props.settings.icons === true,
}));

const toggleValue = () => {
  if (props.settings.disabled) {
    return;
  }

  value.value = !value.value;
};

watch(value, () => emit('update', value));
</script>
