import { useForm } from 'vee-validate';
import { useNotification } from '@/notifications/index.js';
import { useValidationError, useBackedValidationError, getErrorMessagesFromValidation } from '../validator';

export const useSubmission = (props, emit, axios, formFields, formIsBusy, valuesWereChanged, getFormValues, redirect) => {
  const getMessage = (type, defaultMessage) => {
    if (!props.form.messages) {
      return defaultMessage;
    } else if (!props.form.messages[type]) {
      return defaultMessage;
    }

    return props.form.messages[type];
  };

  const { validate, setFieldError } = useForm();

  const submit = async () => {
    if (formIsBusy.value) {
      return;
    }

    const formValues = getFormValues();
    const validationResult = await validate();

    if (!validationResult.valid) {
      useValidationError(
        validationResult.errors,
        props.quickEdit && props.modalBodyId ? props.modalBodyId : null,
        props.form.settings.offset || null,
      );

      emit('failed', {
        errors: getErrorMessagesFromValidation(validationResult.errors, formFields.value),
        values: formValues,
      });

      return;
    } else if (!props.form.url) {
      emit('submit', formValues);

      return;
    }

    // eslint-disable-next-line no-param-reassign
    formIsBusy.value = true;

    try {
      const method = props.form.method.toString().toLowerCase();
      const { data } = (await axios[method](
        props.form.url,
        formValues.value,
        props.form.headers || {},
      ));

      useNotification('succes', getMessage('success', 'Данные были успешно сохранены!'));

      // eslint-disable-next-line no-param-reassign
      formIsBusy.value = false;
      // eslint-disable-next-line no-param-reassign
      valuesWereChanged.value = false;

      emit('saved', data);

      if (props.quickEdit) {
        emit('slide-over:saved', data);
      } else if (props.form.redirect_url) {
        redirect(data);
      }
    } catch (e) {
      // eslint-disable-next-line no-param-reassign
      formIsBusy.value = false;
      useBackedValidationError(
        e.response && e.response.data ? e.response.data.error : null,
        formFields.value,
        setFieldError,
        props.quickEdit && props.modalBodyId ? props.modalBodyId : null,
        props.form.settings.offset || null,
      );
    }
  };

  return {
    submit,
  };
};
