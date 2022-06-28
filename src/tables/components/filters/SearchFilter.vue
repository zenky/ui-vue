<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700 dark:text-white dark:text-opacity-80">
      {{ filter.label }}
    </label>
    <div class="mt-1">
      <input type="text"
             :id="id"
             class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:text-opacity-80"
             v-model="value"
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  filter: {
    required: true,
    type: Object,
  },

  modelValue: {
    required: false,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const id = ref(`datatable-filter-${Math.random().toString().replace('.', '')}`);

let timeoutId = null;

const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => emit('update:modelValue', val), 500);
  },
});
</script>
