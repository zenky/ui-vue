<template>
  <div class="mb-10">
    <div class="space-y-8">
      <CardSection v-for="section in sections"
                   :key="`${prefix}${section.id}`"
                   :label="section.label"
                   :description="section.description"
                   :fields="section.fields"
                   :separate-cards="usingSeparateCards"
                   @update="$emit('update', $event)"
                   @initialized="$emit('initialized', $event)"
      />
    </div>

    <slot name="action-buttons"></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useFormLayout } from '@/forms/composables/layouts.js';
import CardSection from '@/forms/components/layouts/cards/CardSection.vue';

const props = defineProps({
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
const usingSeparateCards = computed(() => props.settings && props.settings.separate_cards === true);
</script>
