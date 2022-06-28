import { ref } from 'vue';
import { useModals } from '../stores/modals';

const callModalCallback = (modal, method, args = []) => {
  if (method && typeof modal[method] === 'function') {
    modal[method].call(null, args);
  }
};

export const useBasicModal = (id, modal) => {
  const { closeModal } = useModals();
  const active = ref(false);

  return {
    active,
    close: () => {
      callModalCallback(modal, 'closed');
      active.value = false;
      closeModal(id, 310);
    },
  };
};

export const useConfirmationModal = (id, modal) => {
  const { closeModal } = useModals();
  const active = ref(false);

  const close = (method) => {
    callModalCallback(modal, method);
    active.value = false;
    closeModal(id, 310);
  };

  return {
    active,
    confirm: () => close('confirmed'),
    cancel: () => close('cancelled'),
  };
};

export const useSlideOverModal = (id, modal) => {
  const { addModal, closeModal } = useModals();
  const active = ref(false);
  const shouldForceClose = ref(false);
  const setForceClose = (value) => {
    shouldForceClose.value = value;
  };
  const close = () => {
    active.value = false;
    closeModal(id, 710);
  };

  return {
    active,
    setForceClose,
    saved: ($event) => {
      callModalCallback(modal, 'saved', [$event]);

      if (modal.closeOnSave) {
        close();
      }
    },

    close: (force) => {
      if (force || shouldForceClose.value) {
        close();
      }

      addModal('confirmation', {
        ...modal.confirmation,
        confirmed: () => close(),
      });
    },
  };
};
