<template>
  <FieldWrapper v-bind="$props" :error-message="errorMessage">
    <input type="tel"
           :id="id"
           class="shadow-sm block w-full sm:text-sm rounded-md dark:bg-gray-600 dark:text-white dark:text-opacity-90 dark:border-gray-500"
           :class="inputClasses"
           v-model="value"
           :disabled="settings.disabled"
           v-bind="attributes"
           @change="onChange"
    >
  </FieldWrapper>
</template>

<style lang="css">
.iti {
  width: 100%;
}
</style>

<script setup>
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/js/utils';
import 'intl-tel-input/build/css/intlTelInput.css';
import { computed, onMounted, watch } from 'vue';
import { useFieldProps, useField } from '@/forms/composables/fields.js';

const props = defineProps({
  ...useFieldProps(),
  country: {
    required: false,
    type: String,
    default: 'RU',
  },
});
const emit = defineEmits(['update:modelValue', 'countryChanged']);

const {
  attributes,
  value,
  inputClasses,
  onChange,
  errorMessage,
} = useField(props, emit, () => '');

let phoneInput = null;

watch(computed(() => props.country), (val) => {
  if (phoneInput) {
    phoneInput.setCountry(val);
  }
});

const createPhoneField = () => {
  const phoneInputEl = document.getElementById(props.id);

  if (!phoneInputEl) {
    setTimeout(() => createPhoneField(), 100);

    return;
  }

  phoneInput = intlTelInput(phoneInputEl, {
    nationalMode: false,
    initialCountry: props.country || 'RU',
    preferredCountries: ['RU'],
    autoPlaceholder: 'aggressive',
  });

  if (!props.country) {
    emit('countryChanged', 'RU');
  }

  phoneInputEl.addEventListener('countrychange', () => {
    const selectedCountry = phoneInput.getSelectedCountryData();

    if (!selectedCountry || !selectedCountry.iso2) {
      return;
    }

    emit('countryChanged', selectedCountry.iso2);
  });
};

onMounted(() => createPhoneField());
</script>
