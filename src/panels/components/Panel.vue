<template>
  <div class="divide-y divide-gray-200 dark:divide-gray-700" :class="{ 'bg-white dark:bg-gray-800 rounded-md shadow': !transparent }">
    <div v-if="header || hasHeaderSlot || dismissable" class="px-4 py-5 sm:px-6 relative">
      <h3 v-if="header" class="text-lg font-extrabold dark:text-white dark:text-opacity-90">{{ header }}</h3>
      <template v-else-if="hasHeaderSlot">
        <h3 class="text-lg font-extrabold dark:text-white dark:text-opacity-90">
          <slot name="header"></slot>
          <span v-if="hasSubheaderSlot" class="mt-1 text-sm font-normal block text-gray-600 dark:text-white dark:text-opacity-60">
          <slot name="subheader"></slot>
        </span>
        </h3>
        <button v-if="dismissable" type="button" class="absolute top-0 right-0 p-4 group" @click="$emit('close')">
          <i class="fa-light fa-xmark text-gray-400 text-lg group-hover:text-gray-700 dark:group-hover:text-gray-200"></i>
        </button>
      </template>
    </div>

    <div class="px-4 py-5 sm:p-6 leading-6 text-sm text-gray-900 dark:text-white dark:text-opacity-90">
      <slot></slot>
    </div>

    <div v-if="hasFooterSlot" class="px-4 py-4 sm:px-6 flex gap-x-4" :class="{ 'flex-row-reverse': reversedFooter }">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue';

const props = defineProps({
  header: {
    required: false,
    type: String,
  },

  transparent: {
    required: false,
    type: Boolean,
    default: false,
  },

  dismissable: {
    required: false,
    type: Boolean,
    default: false,
  },

  reversedFooter: {
    required: false,
    type: Boolean,
    default: true,
  },
});

defineEmits(['close']);

const slots = useSlots();
const hasHeaderSlot = computed(() => !!slots.header);
const hasSubheaderSlot = computed(() => !!slots.subheader);
const hasFooterSlot = computed(() => !!slots.footer);
</script>
