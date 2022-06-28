import { defineAsyncComponent } from 'vue';

export const AlertsPlugin = {
  install(app) {
    app.component('Alert', defineAsyncComponent(() => import('./components/Alert.vue')));
  },
};
