<template>
  <panel>
    <template v-if="label" v-slot:header>
      <span class="form-section-label" v-html="label"></span>
    </template>

    <template v-if="description" v-slot:subheader>
      <span class="form-section-description" v-html="description"></span>
    </template>

    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <template v-for="field in fields">
        <component v-if="field.visible && field.settings.hidden !== true"
                   :is="field.type"
                   :key="field.id"
                   :id="field.id"
                   :name="field.name"
                   :label="field.label"
                   :settings="field.settings"
                   v-model="values[field.name]"
        ></component>
      </template>
    </div>
  </panel>
</template>

<script setup>
import { useFormSection } from '@/forms/composables/layouts.js';

const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },

  label: {
    type: String,
    required: false,
    default: null,
  },

  description: {
    type: String,
    required: false,
    default: null,
  },

  separateCards: {
    required: false,
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update', 'initialized']);
const { values } = useFormSection(props, emit);
</script>
