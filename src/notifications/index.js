import { defineAsyncComponent } from 'vue';
import { useNotifications } from './stores/notifications';

export const NotificationsPlugin = {
  install(app) {
    app.component('NotificationsRegion', defineAsyncComponent(() => import('./components/NotificationsRegion.vue')));
  },
};

export const useNotification = (type, title, message, duration = 3000) => {
  const { setNotification } = useNotifications();

  setNotification({
    type,
    title,
    message,
  }, duration);
};
