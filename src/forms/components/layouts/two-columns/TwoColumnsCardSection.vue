<template>
  <div class="lg:grid lg:grid-cols-3 lg:gap-6">
    <div class="lg:col-span-1">
      <div class="px-0">
        <h3 v-if="label"
            class="form-section-label text-lg font-medium leading-6 text-gray-900 dark:text-white dark:text-opacity-90"
            v-html="label"
        ></h3>
        <p v-if="description"
           class="form-section-description text-sm text-gray-600 dark:text-white dark:text-opacity-60"
           :class="{ 'mt-1': !!label }"
           v-html="description"
        ></p>
      </div>
    </div>
    <div class="mt-5 lg:mt-0 lg:col-span-2">
      <panel>
        <div class="grid grid-cols-1 sm:grid-cols-6 gap-6">
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
    </div>
  </div>
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
