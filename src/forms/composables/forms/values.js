import { ref, computed } from 'vue';
import set from 'lodash-es/set';

const useVisibilityEvents = (props, formValues, formSections) => {
  const hasVisibilityEvents = computed(() => {
    if (!Array.isArray(props.form.settings.visibility_events)) {
      return false;
    }

    return props.form.settings.visibility_events.length > 0;
  });

  const visibilityCache = ref({});

  const updateVisibility = () => {
    if (!hasVisibilityEvents.value) {
      return;
    }

    props.form.settings.visibility_events.forEach((event) => {
      const visible = event.visibility.visible.indexOf(formValues.value[event.listen]) !== -1;

      if (visibilityCache.value[event.field] === visible) {
        return;
      }

      formSections.value.forEach((section) => {
        section.fields.forEach((field) => {
          if (field.name === event.field) {
            // eslint-disable-next-line no-param-reassign
            field.visible = visible;
            visibilityCache.value[event.field] = visible;
          }
        });
      });
    });
  };

  return {
    updateVisibility,
  };
};

export const useValues = (props, fields, wasInitialized, valuesWereChanged, formSections) => {
  const formValues = ref({});
  const getFormValues = () => {
    const values = ref({});

    Object.keys(formValues.value).forEach((key) => {
      const field = fields.value.find((item) => item.name === key);

      if (!field || field.real_name === key) {
        set(values.value, key, formValues.value[key]);

        return;
      }

      set(values.value, field.real_name, formValues.value[key]);
    });

    return values;
  };

  const {
    updateVisibility,
  } = useVisibilityEvents(props, formValues, formSections);

  const updateFormValues = (values) => {
    Object.keys(values.value).forEach((key) => {
      set(formValues.value, key, values.value[key]);
    });

    if (wasInitialized.value) {
      // eslint-disable-next-line no-param-reassign
      valuesWereChanged.value = true;
    }

    updateVisibility();
  };

  return {
    formValues,
    getFormValues,
    updateFormValues,
  };
};
