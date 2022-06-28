<template>
  <component :key="id" :is="settings.component" v-bind="componentProps" />
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  item: {
    required: true,
    type: Object,
  },

  settings: {
    required: true,
    type: Object,
  },
});

const id = ref(`datatable-component-plugin-${Math.random().toString().replace('.', '')}`);
const componentProps = computed(() => ({
  ...props.settings.props || {},
  item: props.item,
}));
</script>
