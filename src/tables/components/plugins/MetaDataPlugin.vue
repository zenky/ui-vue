<template>
  <div>
    <div class="text-sm font-medium text-gray-900 dark:text-white dark:text-opacity-90" v-html="item[settings.path]"></div>
    <div v-if="metaData.length > 0" class="mt-2 text-xs text-gray-500 dark:text-gray-400">
      <div v-for="metaDataItem in metaData" v-html="metaDataItem"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

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

const metaData = computed(() => props.settings.meta.map((path) => props.item[path]));
</script>
