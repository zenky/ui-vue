<template>
  <input type="hidden" v-model="value" />
</template>

<script setup>
import { useFieldProps, useField } from '@/forms/composables/fields.js';

const props = defineProps(useFieldProps());
const emit = defineEmits(['update:modelValue']);
const { value } = useField(props, emit, () => null);
</script>
