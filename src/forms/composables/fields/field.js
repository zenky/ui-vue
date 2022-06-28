import { computed, reactive, ref, watch } from 'vue';
import { useField as useVeeField } from 'vee-validate';

const useInputClasses = (props) => {
  const getDefaultClasses = (hasErrors) => {
    if (hasErrors) {
      return [
        'focus:ring-red-500',
        'focus:border-red-500',
        'border-red-300',
        'text-red-900',
        'placeholder-red-300',
      ];
    }

    return [
      'focus:ring-primary-500',
      'focus:border-primary-500',
      'border-gray-300',
    ];
  };

  const getInputClasses = (hasErrors) => {
    const classes = reactive(getDefaultClasses(hasErrors));

    if (props.settings && props.settings.disabled) {
      classes.push('text-gray-400');
      classes.push('bg-gray-100');
      classes.push('cursor-not-allowed');
    }

    return classes;
  };

  return { getInputClasses };
};

const useFieldWithoutValidation = (props, emit, defaultValue) => {
  const { getInputClasses } = useInputClasses(props);
  const value = computed({
    get: () => props.modelValue === null ? defaultValue() : props.modelValue,
    set: (val) => emit('update:modelValue', val),
  });
  const errorMessage = ref('');
  const inputClasses = ref(getInputClasses(false));
  const attributes = computed(() => props.settings.attributes || {});
  const onChange = () => {};
  const validate = () => {};

  return {
    value,
    inputClasses,
    attributes,
    onChange,
    errorMessage,
    validate,
  };
};

export const useField = (props, emit, defaultValue) => {
  if (!props.settings.rules) {
    return useFieldWithoutValidation(props, emit, defaultValue);
  }

  const { getInputClasses } = useInputClasses(props);
  const {
    value,
    errorMessage,
    handleChange,
    validate,
  } = useVeeField(props.id, props.settings.rules || '', {
    initialValue: props.modelValue === null ? defaultValue() : props.modelValue,
    validateOnValueUpdate: false,
  });

  watch(computed(() => props.modelValue), (val) => {
    value.value = val;
  });

  watch(value, () => {
    emit('update:modelValue', value.value);
  });

  const inputClasses = computed(() => getInputClasses(errorMessage && errorMessage.value));
  const attributes = computed(() => props.settings.attributes || {});
  const onChange = ($event) => handleChange($event);

  return {
    value,
    inputClasses,
    attributes,
    onChange,
    errorMessage,
    validate,
  };
};
