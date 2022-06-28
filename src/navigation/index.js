import { defineAsyncComponent } from 'vue';

export const NavigationPlugin = {
  install(app) {
    app.component('AsideNavigation', defineAsyncComponent(() => import('./components/AsideNavigation.vue')));
    app.component('PillsNavigation', defineAsyncComponent(() => import('./components/PillsNavigation.vue')));
    app.component('TabsNavigation', defineAsyncComponent(() => import('./components/TabsNavigation.vue')));
    app.component('OptionalNavigation', defineAsyncComponent(() => import('./components/OptionalNavigation.vue')));
  },
};
