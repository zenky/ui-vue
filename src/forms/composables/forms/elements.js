import { computed, ref } from 'vue';

// eslint-disable-next-line arrow-body-style
const getSections = (sections) => {
  return sections.map((section) => {
    const fields = section.fields.map((field) => ({
      ...field,
      visible: true,
    }));

    return {
      ...section,
      fields,
    };
  });
};

export const useElements = (props) => {
  const formSections = ref(getSections(props.sections));
  const actionButtons = computed(() => props.form.buttons);
  const fields = computed(() => {
    const items = [];

    props.sections.forEach((section) => {
      section.fields.forEach((field) => {
        items.push({
          id: field.id,
          name: field.name,
          real_name: field.real_name || field.name,
          label: field.label,
        });
      });
    });

    return items;
  });

  const labels = computed(() => {
    const items = {};

    props.sections.forEach((section) => {
      section.fields.forEach((field) => {
        items[field.id] = `«${field.label}»`;
      });
    });

    return items;
  });

  const cancelUrl = computed(() => {
    const cancelButton = actionButtons.value.find((button) => button.type === 'cancel');

    if (cancelButton) {
      return cancelButton.url || '/';
    }

    return '/';
  });

  return {
    formSections,
    actionButtons,
    fields,
    labels,
    cancelUrl,
  };
};
