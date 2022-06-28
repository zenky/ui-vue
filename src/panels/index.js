import { defineAsyncComponent } from 'vue';

export const PanelsPlugin = {
  install(app) {
    app.component('Panel', defineAsyncComponent(() => import('./components/Panel.vue')));
  },
};
