<template>
  <div class="flex flex-wrap gap-2">
    <badge v-for="badge in badges" :key="badge.id" accent="success">
      {{ badge.badge }}
    </badge>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import get from 'lodash-es/get'

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

const getBadge = (params) => {
  const value = get(props.item, params.path);

  if (params.enum === true) {
    return value.name;
  } else if (typeof params.map === 'object' && params.map.hasOwnProperty(value.toString())) {
    return params.map[value.toString()];
  }

  return value;
};

const badges = computed(() => {
  if (!Array.isArray(props.settings.paths) || !props.settings.paths.length) {
    return [{
      id: Math.random().toString().replace('.', ''),
      badge: getBadge(props.settings),
    }];
  }

  return props.settings.paths.map(params => ({
    id: Math.random().toString().replace('.', ''),
    badge: getBadge(params),
  }));
});
</script>
