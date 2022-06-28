import { defineAsyncComponent } from 'vue';

export const DataTablePlugin = {
  install(app, options = {}) {
    app.component('DataTable', defineAsyncComponent(() => import('./components/DataTable.vue')));

    app.provide('zenky:datatable:plugins', this.getPlugins(options.plugins || {}));
    app.provide('zenky:datatable:classes', options.classes || {
      header: 'px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
      column: 'px-4 py-3 text-sm whitespace-nowrap break-word text-ellipsis overflow-hidden max-w-sm',
    });
    app.provide('zenky:datatable:icons', options.icons || {
      ordering: {
        alpha: {
          default: 'fa-arrow-down-arrow-up',
          asc: 'fa-arrow-up-a-z',
          desc: 'fa-arrow-down-z-a',
        },
        numeric: {
          default: 'fa-arrow-down-arrow-up',
          asc: 'fa-arrow-up-1-9',
          desc: 'fa-arrow-down-9-1',
        },
        default: {
          default: 'fa-sort',
          asc: 'fa-sort-up',
          desc: 'fa-sort-down',
        },
      },
    });
  },

  getPlugins(customPlugins) {
    return {
      copy: {
        column: {
          classes: 'text-left',
        },
        component: defineAsyncComponent(() => import('./components/plugins/CopyPlugin.vue')),
      },

      actions: {
        header: {
          classes: 'text-right',
        },
        column: {
          classes: 'text-right',
        },
        component: defineAsyncComponent(() => import('./components/plugins/ActionsPlugin.vue')),
      },

      renderable: {
        component: defineAsyncComponent(() => import('./components/plugins/RenderablePlugin.vue')),
      },

      meta_data: {
        component: defineAsyncComponent(() => import('./components/plugins/MetaDataPlugin.vue')),
      },

      badge: {
        component: defineAsyncComponent(() => import('./components/plugins/BadgePlugin.vue')),
      },

      component: {
        component: defineAsyncComponent(() => import('./components/plugins/ComponentPlugin.vue')),
      },

      ...customPlugins,
    };
  },
};
