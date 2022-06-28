import {
  inject, provide, ref, watch,
} from 'vue';
import { getUrlWithBindings } from '@/url/composables/url.js';
import { useElements } from './forms/elements';
import { useValues } from './forms/values';
import { useStates } from './forms/states';
import { useSubmission } from './forms/submission';

export const useFormEvents = () => ([
  'slide-over:confirmation',
  'slide-over:saved',
  'submit',
  'saved',
  'failed',
]);

export const useForm = (props, emit) => {
  const id = ref(`abstract-form-${Math.random().toString().replace('.', '')}`);

  provide('zenky:form:id', id);

  const {
    formSections,
    actionButtons,
    fields,
    labels,
    cancelUrl,
  } = useElements(props);

  const {
    formIsBusy,
    isRedirecting,
    wasInitialized,
    valuesWereChanged,
    isDeleting,
    sectionInitialized,
  } = useStates(props.sections.length);

  const setDeleting = (value) => {
    isDeleting.value = value;
  };

  const redirect = (data) => {
    if (!props.form.redirect_url) {
      // eslint-disable-next-line no-restricted-globals
      location.href = cancelUrl.value;

      return;
    }

    // eslint-disable-next-line no-restricted-globals
    location.href = getUrlWithBindings(props.form.redirect_url, data);
  };

  const {
    formValues,
    getFormValues,
    updateFormValues,
  } = useValues(props, fields, wasInitialized, valuesWereChanged, formSections);

  provide('zenky:form:id', props.id);
  provide('zenky:form:inputLabels', labels);

  watch(valuesWereChanged, () => {
    emit('slide-over:confirmation', !valuesWereChanged.value);
  }, { immediate: true });

  const { submit } = useSubmission(
    props,
    emit,
    inject('zenky:axios'),
    fields,
    formIsBusy,
    valuesWereChanged,
    getFormValues,
    redirect,
  );

  return {
    id,
    formIsBusy,
    formValues,
    formSections,
    actionButtons,
    isRedirecting,
    isDeleting,
    wasInitialized,
    valuesWereChanged,
    fields,
    labels,
    cancelUrl,
    redirect,
    submit,
    getFormValues,
    updateFormValues,
    setDeleting,
    sectionInitialized,
  };
};
