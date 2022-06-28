<template>
  <div v-if="ready" class="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 gap-2">
    <template v-for="filter in filterComponents" :key="filter.id">
      <component :is="components[filter.filter.type]"
                 :filter="filter.filter"
                 v-model="values[filter.filter.name]"
      />
    </template>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from 'vue';

const props = defineProps({
  filters: {
    required: true,
    type: Array,
  },

  modelValue: {
    required: false,
    type: Object,
    default: () => ({}),
  },
});

const ready = ref(false);

const components = {
  search: defineAsyncComponent(() => import('./filters/SearchFilter.vue')),
  select: defineAsyncComponent(() => import('./filters/SelectFilter.vue')),
};

const emit = defineEmits(['update:modelValue']);

const values = computed({
  get: () => props.modelValue,
  set: () => emit('update:modelValue', values),
})

const filterComponents = computed(() => {
  return props.filters.filter((filter) => filter.type !== 'hidden').map((filter) => ({
    id: `datatable-filter-component-${Math.random().toString().replace('.', '')}`,
    filter,
  }));
});

ready.value = true;
</script>
