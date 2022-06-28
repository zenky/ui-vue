import { defineStore } from 'pinia';

export const useModals = defineStore({
  id: 'zenky:ui:modals',

  state: () => ({
    modals: [],
    nextZIndex: 30,
  }),

  getters: {
    visibleModals: (state) => state.modals.filter((modal) => !!modal && modal.open),

    hasVisibleModals() {
      return this.visibleModals.length > 0;
    },
  },

  actions: {
    increaseNextZIndex() {
      this.nextZIndex += 1;
    },

    decreaseNextZIndex() {
      this.nextZIndex = Math.max(30, this.nextZIndex - 1);
    },

    addModal(type, modal) {
      const id = `zenky:modal:${Math.random().toString().replace('.', '')}`;

      this.modals.push({
        id,
        type,
        modal,
        open: true,
        zIndex: this.nextZIndex,
      });

      this.increaseNextZIndex();

      return id;
    },

    closeModal(id, timeout) {
      const index = this.modals.findIndex((modal) => modal && modal.id === id);

      if (index === -1) {
        return false;
      }

      setTimeout(() => {
        this.modals[index].open = false;

        if (!this.hasVisibleModals) {
          this.modals = [];
        }
      }, timeout);

      this.decreaseNextZIndex();

      return true;
    },
  },
});
