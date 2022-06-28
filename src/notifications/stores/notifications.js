import { defineStore } from 'pinia';

export const useNotifications = defineStore({
  id: 'zenky:ui:notifications',

  state: () => ({
    notification: null,
  }),

  getters: {
    hasNotification: (state) => state.notification !== null,
  },

  actions: {
    setNotification(notification, duration = 3000) {
      this.notification = notification;

      if (notification !== null) {
        setTimeout(() => this.notification = null, duration);
      }
    },
  },
});
