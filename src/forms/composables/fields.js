export * from './fields/wrapper';
export * from './fields/field';

export const useFieldProps = () => ({
  id: {
    required: true,
    type: String,
  },

  name: {
    required: true,
    type: String,
  },

  label: {
    required: false,
    type: String,
  },

  modelValue: {
    required: true,
    default: null,
  },

  settings: {
    required: true,
    type: Object,
  },

  compact: {
    required: false,
    type: Boolean,
    default: false,
  },
});
