<template>
  <div v-if="navigationComponent">
    <component :is="navigationComponent"
               :prefix="`${prefix}-navigation`"
               :items="navigation.items"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  prefix: {
    required: true,
    type: String,
  },

  navigation: {
    required: false,
    type: Object,
    default: () => null,
  },
});

const navigationComponent = computed(() => {
  if (!props.navigation || !props.navigation.type) {
    return null;
  } else if (!Array.isArray(props.navigation.items) || !props.navigation.items.length) {
    return null;
  }

  switch (props.navigation.type) {
    case 'pills':
      return 'PillsNavigation';
    case 'tabs':
      return 'TabsNavigation';
  }

  return null;
});
</script>
