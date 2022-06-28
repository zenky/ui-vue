import { inject, ref } from 'vue';
import { useConfirmation, useSlideOver } from '@/modals/index.js';
import { useNotification } from '@/notifications/index.js';

export const useDeletesResource = (action, emit, deleted = null, failed = null) => {
  const axios = inject('zenky:axios');
  const getFailedMessage = (error, defaulMessage) => {
    if (!error || !error.error || !error.error.message) {
      return defaulMessage;
    }

    return error.error.message
  };

  const deleteItem = () => {
    useConfirmation({
      accent: 'danger',
      title: action.settings.confirmation.title,
      message: action.settings.confirmation.message,
      buttons: {
        confirm: action.settings.buttons.confirm,
        cancel: action.settings.buttons.cancel,
      },
      confirmed: async () => {
        try {
          emit('deleting');

          await axios.delete(action.url);

          useNotification('success', action.settings.messages.success.title, action.settings.messages.success.message);

          if (typeof deleted === 'function') {
            deleted();
          }
        } catch (e) {
          useNotification(
            'error',
            action.settings.messages.failed.title,
            getFailedMessage(e.response ? e.response.data : null, action.settings.messages.failed.message)
          );

          if (typeof failed === 'function') {
            failed(e);
          }
        }
      },
    });
  };

  return {
    deleteItem,
  };
};

export const useQuickEdit = (formUrl, title, message, onSaved) => {
  const quickEditLoading = ref(false);
  const axios = inject('zenky:axios');
  const dispatch = async () => {
    quickEditLoading.value = true;

    const data = (await axios.get(formUrl)).data.data;

    quickEditLoading.value = false;

    useSlideOver({
      title,
      message,
      component: 'AbstractForm',
      props: {
        navigation: data.navigation || null,
        form: data.form.form,
        sections: data.form.sections,
        quickEdit: true,
      },
      confirmation: {
        accent: 'warning',
        title: 'Завершить редактирование',
        message: 'Вы уверены, что хотите завершить редактирование? Все несохранённые данные будут потеряны!',
        buttons: {
          confirm: 'Завершить',
          cancel: 'Не завершать',
        },
      },
      closeOnSave: true,
      saved: event => onSaved(event),
    });
  };

  return {
    quickEditLoading,
    dispatch,
  };
};
