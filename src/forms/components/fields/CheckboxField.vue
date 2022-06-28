<template>
  <div class="sm:col-span-6">
    <div class="relative flex items-start">
      <div class="flex" :class="labelSizeClasses">
        <input :id="id"
               :aria-describedby="`${id}-hint`"
               name="comments"
               type="checkbox"
               class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
               v-model="value"
               :disabled="settings.disabled"
               @click="$emit('click', $event)"
        >
      </div>
      <div class="ml-3" :class="labelClasses">
        <label :for="id" :id="`${id}-label`">
          <span class="font-medium text-gray-700 dark:text-white dark:text-opacity-90" :id="`${id}-label-value`">{{ label }}</span>
          <p v-if="settings.hint" :id="`${id}-hint`" class="text-gray-500 dark:text-white dark:text-opacity-60">
            {{ settings.hint }}
          </p>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useFieldProps, useField } from '@/forms/composables/fields.js';

const props = defineProps(useFieldProps());
const emit = defineEmits(['update:modelValue', 'click']);
const {
  value,
} = useField(props, emit, () => false);

const labelClasses = computed(() => {
  switch (props.settings.label_size || 'small') {
    case 'large':
      return 'text-lg';
    case 'small':
      return 'text-sm';
    default:
      return 'text-sm';
  }
});

const labelSizeClasses = computed(() => {
  switch (props.settings.label_size || 'small') {
    case 'large':
      return 'h-7 items-center';
    case 'small':
      return 'h-5 items-center';
    default:
      return 'h-5 items-center';
  }
});
</script>
