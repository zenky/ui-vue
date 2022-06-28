<template>
  <div>
    <OptionalNavigation :prefix="`${id}-form-navigation`"
                        :navigation="navigation"
                        class="mb-4 sm:mb-8 -mt-2"
    />

    <component :is="layouts[form.layout]"
               :sections="formSections"
               :input-labels="labels"
               :key="id"
               :settings="form.settings"
               @update="updateFormValues"
               @initialized="sectionInitialized"
    >
      <template v-slot:action-buttons>
        <FormActionButtons :buttons="actionButtons"
                           :quickEdit="quickEdit"
                           :formIsBusy="formIsBusy || isRedirecting || isDeleting"
                           @deleting="setDeleting(true)"
                           @deleted="redirect"
                           @cancel="$emit('slide-over:close', !valuesWereChanged)"
                           @submit="submit"
        />
      </template>
    </component>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import { useFormEvents, useForm } from '../composables/forms';
import { useValidator } from '../composables/validator';
import FormActionButtons from './buttons/FormActionButtons.vue';

const props = defineProps({
  form: {
    required: true,
    type: Object,
  },

  sections: {
    required: true,
    type: Array,
  },

  quickEdit: {
    required: false,
    type: Boolean,
    default: false,
  },

  modalBodyId: {
    required: false,
    type: String,
    default: null,
  },

  navigation: {
    required: false,
    type: Object,
    default: () => null,
  },
});
const emit = defineEmits(useFormEvents());

const layouts = {
  Cards: defineAsyncComponent(() => import('./layouts/cards/CardsLayout.vue')),
  TwoColumnsCards: defineAsyncComponent(() => import('./layouts/two-columns/TwoColumnsCardsLayout.vue')),
};

useValidator();

const {
  id,
  formIsBusy,
  formSections,
  actionButtons,
  isRedirecting,
  isDeleting,
  valuesWereChanged,
  labels,
  submit,
  redirect,
  updateFormValues,
  setDeleting,
  sectionInitialized,
} = useForm(props, emit);
</script>
