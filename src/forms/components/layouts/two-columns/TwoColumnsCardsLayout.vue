<template>
  <div class="mb-10">
    <template v-for="(section, index) in sections" :key="`${prefix}${section.id}-wrapper`">
      <div :class="{ 'mt-10 sm:mt-0': index > 0 }">
        <two-columns-card-section :key="`${prefix}${section.id}`"
                                  :label="section.label"
                                  :description="section.description"
                                  :fields="section.fields"
                                  @update="$emit('update', $event)"
                                  @initialized="$emit('initialized', $event)"
        />
      </div>

      <div v-if="index < sections.length - 1" class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200"></div>
        </div>
      </div>
    </template>

    <slot name="action-buttons"></slot>
  </div>
</template>

<script setup>
import { useFormLayout } from '@/forms/composables/layouts.js';
import TwoColumnsCardSection from './TwoColumnsCardSection.vue';

defineProps({
  sections: {
    required: true,
    type: Array,
  },

  settings: {
    required: false,
    type: Object,
  },
});

defineEmits(['update', 'initialized']);

const { prefix } = useFormLayout();
</script>
