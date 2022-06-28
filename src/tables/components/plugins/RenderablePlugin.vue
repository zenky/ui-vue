<template>
  <component v-if="ready" :key="id" :is="component" :item="item" />
</template>

<script setup>
import { onMounted, defineComponent, ref } from 'vue';
import pluralize from '@/helpers/pluralize.js';

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

const id = ref(`renderable-column-plugin-${Math.random().toString().replace('.', '')}`);
const ready = ref(false);
const component = defineComponent({
  template: `<div>${props.settings.template}</div>`,
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  methods: {
    pluralize,
  },
});

onMounted(() => {
  ready.value = true;
});
</script>
