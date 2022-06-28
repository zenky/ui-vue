import {
  computed, inject, ref, watch,
} from 'vue';

export const useFormLayout = () => {
  const formId = ref(inject('zenky:form:id'));
  const prefix = computed(() => (formId.value ? `${formId.value}-` : ''));

  return {
    prefix,
  };
};

export const useFormSection = (props, emit) => {
  const values = ref({});

  props.fields.forEach((field) => {
    values.value[field.name] = field.value;
  });

  emit('update', values);
  emit('initialized');

  watch(values, () => emit('update', values), { deep: true });

  return {
    values,
  };
};
