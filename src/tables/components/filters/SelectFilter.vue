<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700 dark:text-white dark:text-opacity-80">
      {{ filter.label }}
    </label>
    <select :id="id"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:text-opacity-80"
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="(optionLabel, optionValue) in filter.settings.options" :value="optionValue">
        {{ optionLabel }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  filter: {
    required: true,
    type: Object,
  },

  modelValue: {
    required: false,
    default: '',
  },
});

defineEmits(['update:modelValue']);

const id = ref(`datatable-filter-${Math.random().toString().replace('.', '')}`);
</script>
