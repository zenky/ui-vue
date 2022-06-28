<template>
  <div class="rounded-md p-4 shadow-sm" :class="backgroundClasses">
    <div class="flex items-center">
      <div v-if="icon === true" class="flex-shrink-0 self-start">
        <svg v-if="accent === 'warning'" class="h-5 w-5" :class="iconClasses" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <svg v-else-if="accent === 'error'" class="h-5 w-5" :class="iconClasses" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        <svg v-else-if="accent === 'success'" class="h-5 w-5" :class="iconClasses" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path v-if="icon === true" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          <path v-else-if="icon === 'info'" fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
        <svg v-else-if="accent === 'info'" class="h-5 w-5" :class="iconClasses" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
      </div>
      <div v-else-if="usingCustomIcon" class="flex-shrink-0 self-start">
        <i :class="iconClasses"></i>
      </div>
      <div :class="{ 'ml-3': !!icon }">
        <h3 v-if="header" class="text-sm font-medium mb-2" :class="headerClasses">
          {{ header }}
        </h3>
        <div class="text-sm" :class="bodyClasses">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  accent: {
    required: true,
    type: String,
  },

  header: {
    required: false,
    type: String,
    default: '',
  },

  icon: {
    required: false,
    type: [Boolean, String],
    default: true,
  },

  condensed: {
    required: false,
    type: Boolean,
    default: false,
  },
});

const backgroundClasses = computed(() => {
  switch (props.accent) {
    case 'warning':
      return 'bg-yellow-50 dark:bg-yellow-800'
    case 'error':
      return 'bg-red-50 dark:bg-red-800'
    case 'success':
      return 'bg-primary-50 dark:bg-primary-800'
    case 'info':
      return 'bg-blue-50 dark:bg-blue-800'
  }
});

const usingCustomIcon = computed(() => typeof props.icon === 'string' && !!props.icon);

const iconClasses = computed(() => {
  const classes = [];

  if (usingCustomIcon.value) {
    classes.push(props.icon);
    classes.push(`text-lg`);
  }

  switch (props.accent) {
    case 'warning':
      classes.push('text-yellow-400');
      break
    case 'error':
      classes.push('text-red-400');
      break
    case 'success':
      classes.push('text-primary-400');
      break
    case 'info':
      classes.push('text-blue-400');
      break
  }

  return classes;
});

const headerClasses = computed(() => {
  switch (props.accent) {
    case 'warning':
      return 'text-yellow-800 dark:text-yellow-50';
    case 'error':
      return 'text-red-800 dark:text-red-50';
    case 'success':
      return 'text-primary-800 dark:text-primary-50';
    case 'info':
      return 'text-blue-800 dark:text-blue-50';
  }
});

const bodyClasses = computed(() => {
  const classes = [props.condensed ? 'leading-tight' : 'leading-relaxed'];

  switch (props.accent) {
    case 'warning':
      classes.push('text-yellow-700 dark:text-yellow-100');
      break
    case 'error':
      classes.push('text-red-700 dark:text-red-100');
      break
    case 'success':
      classes.push('text-primary-700 dark:text-primary-100');
      break
    case 'info':
      classes.push('text-blue-700 dark:text-blue-100');
      break
  }

  return classes;
});
</script>
