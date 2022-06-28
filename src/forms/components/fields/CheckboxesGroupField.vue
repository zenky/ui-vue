<template>
  <FieldWrapper v-bind="$props" :error-message="errorMessage">
    <div class="flex flex-wrap gap-4">
      <div v-for="option in settings.options" :key="`${id}-option-${option.id}`">
        <CheckboxField :id="`${id}-${option.id}`"
                        :label="option.name"
                        :name="`${id}-${option.id}`"
                        :settings="{}"
                        v-model="selected[option.id]"
        />
      </div>
    </div>
  </FieldWrapper>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useFieldProps, useField } from '@/forms/composables/fields.js';
import CheckboxField from './CheckboxField.vue';

const props = defineProps(useFieldProps());
const emit = defineEmits(['update:modelValue']);
const {
  value,
  errorMessage,
} = useField(props, emit, () => []);

const selected = ref({});
const selectedValues = computed(() => Object.keys(selected.value).filter((val) => !!selected.value[val]));

props.settings.options.forEach((option) => {
  selected.value[option.id] = value.value.indexOf(option.id) > -1;
});

watch(selected, () => {
  value.value = selectedValues.value;
}, { deep: true });
</script>
