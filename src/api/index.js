export const AxiosPlugin = {
  install(app, { axios }) {
    app.provide('zenky:axios', axios);
  },
};

export * from './composables/resources.js';
