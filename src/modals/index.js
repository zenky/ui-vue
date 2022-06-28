import { defineAsyncComponent } from 'vue';
import { useModals } from './stores/modals';

export const ModalsPlugin = {
  install(app) {
    app.component('ModalsController', defineAsyncComponent(() => import('./components/ModalsController.vue')));
  },
};

export const useModal = (modal) => {
  const { addModal } = useModals();

  return addModal('modal', modal);
};

export const useConfirmation = (confirmation) => {
  const { addModal } = useModals();

  return addModal('confirmation', confirmation);
};

export const useSlideOver = (slideOver) => {
  const { addModal } = useModals();

  return addModal('slideover', slideOver);
};
