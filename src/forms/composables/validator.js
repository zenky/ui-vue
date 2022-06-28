import { configure, defineRule } from 'vee-validate';
import { required } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import { useNotification } from '@/notifications/index.js';

export const useValidator = () => {
  configure({
    generateMessage: localize('ru', {
      messages: {
        required: 'Поле {field} обязательно к заполнению',
      },
    }),
  });

  defineRule('required', required);
};

const getFormContainerScrollParams = (el, container, hasModal) => {
  if (!hasModal) {
    return {
      top: el.getBoundingClientRect().top,
      scrollY: window.scrollY,
    };
  }

  return {
    top: el.getBoundingClientRect(container).top,
    scrollY: container.scrollTop,
  };
};

const scrollToElement = (id, modalBodyId, offset) => {
  const el = document.getElementById(id);

  if (!el) {
    return false;
  }

  const hasModal = modalBodyId !== null;
  const container = modalBodyId ? document.getElementById(modalBodyId) : window;
  const params = getFormContainerScrollParams(el, container, hasModal);
  const top = params.top + params.scrollY + (offset || 0);

  container.scrollTo({
    top,
    behavior: 'smooth',
  });

  return true;
};

export const useValidationError = (errors, modalBodyId, offset) => {
  const firstErrorKey = Object.keys(errors)[0];

  if (!scrollToElement(firstErrorKey, modalBodyId, offset)) {
    useNotification('error', 'Ошибка', 'Произошла ошибка при отправке данных. Обновите страницу.');
  }
};

const getFieldByName = (name, fields, lookupById = false) => {
  if (name.indexOf('.') === -1) {
    return fields.find((field) => (lookupById && field.id === name) || (!lookupById && field.name === name));
  }

  const id = `form-input-${name.replaceAll('.', '-')}`;
  const input = document.getElementById(id);

  if (!input) {
    return null;
  }

  const label = document.getElementById(`${id}-label-value`);

  if (!label) {
    return {
      id,
      label: null,
    };
  }

  return {
    id,
    label: label.outerText,
  };
};

const getFieldErrorMessage = (name, message, fields, lookupById) => {
  const field = getFieldByName(name, fields, lookupById);

  if (!field) {
    return null;
  }

  return {
    field: field.id,
    message: message.toString().replaceAll(name, `«${field.label || name}»`),
  };
};

export const getErrorMessagesFromValidation = (errors, fields) => {
  const messages = {};

  Object.keys(errors).forEach((key) => {
    messages[key] = getFieldErrorMessage(key, errors[key], fields, true) || errors[key];
  });

  return messages;
};

const getFirstBackendValidationError = (error, fields) => {
  if (!error || !error.error_code || error.error_code !== 'validation') {
    useNotification('error', 'Ошибка', 'Произошла неизвестная ошибка. Обновите страницу.');

    return null;
  } else if (!error.meta || !error.meta.errors || !Object.keys(error.meta.errors).length) {
    useNotification('error', 'Ошибка', 'Произошла неизвестная ошибка. Обновите страницу.');

    return null;
  }

  const firstKey = Object.keys(error.meta.errors)[0];

  if (!Array.isArray(error.meta.errors[firstKey]) || !error.meta.errors[firstKey].length) {
    useNotification('error', 'Ошибка', 'Произошла неизвестная ошибка. Обновите страницу.');

    return null;
  }

  const field = getFieldErrorMessage(firstKey, error.meta.errors[firstKey][0], fields, false);

  if (!field) {
    useNotification('error', 'Ошибка', error.meta.errors[firstKey][0]);

    return null;
  }

  return field;
};

export const useBackedValidationError = (error, fields, setFieldError, modalBodyId, offset) => {
  if (!error || !error.error_code) {
    useNotification('error', 'Ошибка', 'Произошла неизвестная ошибка. Обновите страницу.');

    return;
  } else if (error.error_code !== 'validation') {
    useNotification('error', 'Ошибка', error.message);

    return;
  }

  const firstError = getFirstBackendValidationError(error, fields);

  if (!firstError) {
    return;
  }

  setFieldError(firstError.field, firstError.message);
  scrollToElement(firstError.field, modalBodyId, offset);
};
