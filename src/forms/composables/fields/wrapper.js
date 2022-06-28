import { computed, inject, ref } from 'vue';
import set from 'lodash-es/set';

const useValidationError = (props) => {
  const cachedErrorMessages = ref({});
  const inputLabels = ref(inject('zenky:form:inputLabels', {}));

  const getReplacedMessage = (error) => {
    if (!Object.keys(inputLabels.value).length) {
      return error.replace(props.id, `«${props.label}»`);
    }

    const matches = [...error.matchAll(/form-input-(\S+)/g)];

    let message = error.replace(props.id, `«${props.label}»`);

    matches.forEach((match) => {
      if (typeof inputLabels.value[match[0]] !== 'undefined') {
        message = message.replace(match[0], inputLabels.value[match[0]]);
      }
    });

    return message;
  };

  const replaceFieldName = (error) => {
    if (!error) {
      return '';
    } else if (typeof cachedErrorMessages.value[error] !== 'undefined') {
      return cachedErrorMessages.value[error];
    }

    let message = getReplacedMessage(error);

    if (!message.endsWith('.')) {
      message += '.';
    }

    set(cachedErrorMessages.value, error, message);

    return message;
  };

  const validationError = computed(() => replaceFieldName(props.errorMessage));

  return {
    validationError,
  };
};

export const useFieldWrapper = (props) => {
  const columnClasses = computed(() => {
    if (!props.settings.columns || props.settings.columns === 6) {
      return ['sm:col-span-6'];
    } else if (props.settings.columns === 5) {
      return ['sm:col-span-5'];
    } else if (props.settings.columns === 4) {
      return ['sm:col-span-4'];
    } else if (props.settings.columns === 3) {
      return ['sm:col-span-3'];
    }

    return ['sm:col-span-6'];
  });

  const { validationError } = useValidationError(props);

  return {
    columnClasses,
    validationError,
  };
};
