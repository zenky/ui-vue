<template>
  <PhoneFieldInput v-bind="$props"
                   v-model="number"
                   :country="country"
                   @countryChanged="changeCountry"
  />
</template>

<script setup>
import { computed } from 'vue';
import { useFieldProps } from '@/forms/composables/fields.js';
import PhoneFieldInput from './PhoneFieldInput.vue';

const props = defineProps(useFieldProps());
const emit = defineEmits(['update:modelValue']);

let country = null;

const number = computed({
  get: () => (props.modelValue !== null ? props.modelValue.number : ''),
  set: (val) => emit('update:modelValue', { country: country.value, number: val }),
});

country = computed({
  get: () => (props.modelValue !== null ? props.modelValue.country : 'RU'),
  set: (val) => emit('update:modelValue', { country: val, number: number.value }),
});

const changeCountry = (val) => {
  country.value = val;
};
</script>
