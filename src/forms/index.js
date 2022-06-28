import { defineAsyncComponent } from 'vue';

export * from './composables/fields.js';

const getCustomFields = (options) => {
  if (!options || !options.fields || typeof options.fields !== 'object') {
    return {};
  } else if (!Object.keys(options.fields).length) {
    return {};
  }

  return options.fields;
};

export const FormsPlugin = {
  install(app, options = {}) {
    const components = {
      ButtonsRadioGroupField: defineAsyncComponent(() => import('./components/fields/ButtonsRadioGroupField.vue')),
      CardsRadioGroupField: defineAsyncComponent(() => import('./components/fields/CardsRadioGroupField.vue')),
      RadioGroupField: defineAsyncComponent(() => import('./components/fields/RadioGroupField.vue')),
      CheckboxesGroupField: defineAsyncComponent(() => import('./components/fields/CheckboxesGroupField.vue')),
      CheckboxField: defineAsyncComponent(() => import('./components/fields/CheckboxField.vue')),
      ColorField: defineAsyncComponent(() => import('./components/fields/ColorField.vue')),
      ColorsListField: defineAsyncComponent(() => import('./components/fields/ColorsListField.vue')),
      FieldWrapper: defineAsyncComponent(() => import('./components/fields/FieldWrapper.vue')),
      HiddenField: defineAsyncComponent(() => import('./components/fields/HiddenField.vue')),
      PhoneField: defineAsyncComponent(() => import('./components/fields/PhoneField.vue')),
      SelectField: defineAsyncComponent(() => import('./components/fields/SelectField.vue')),
      TextareaField: defineAsyncComponent(() => import('./components/fields/TextareaField.vue')),
      TextField: defineAsyncComponent(() => import('./components/fields/TextField.vue')),
      ToggleField: defineAsyncComponent(() => import('./components/fields/ToggleField.vue')),
      ...getCustomFields(options),
      AbstractForm: defineAsyncComponent(() => import('./components/AbstractForm.vue')),
    };

    Object.keys(components).forEach((name) => {
      app.component(name, components[name]);
    });
  },
};
