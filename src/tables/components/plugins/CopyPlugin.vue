<template>
  <ClipboardButton :text="value" />
</template>

<script setup>
import { computed } from 'vue';
import ClipboardButton from '@/clipboard/components/ClipboardButton.vue';

const props = defineProps({
  settings: {
    required: true,
    type: Object,
  },

  item: {
    required: true,
    type: Object,
  },
});

const value = computed(() => props.item[props.settings.path]);
</script>
