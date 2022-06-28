import vue from 'rollup-plugin-vue';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import alias from '@rollup/plugin-alias';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        format: 'esm',
        dir: 'dist/esm',
      },
      {
        format: 'cjs',
        dir: 'dist/cjs',
      },
    ],
    plugins: [
      alias({
        entries: [{
          find: '@',
          replacement: './src',
        }],
      }),
      vue(),
      postcss({
        extract: true,
        minimize: true,
      }),
      peerDepsExternal(),
    ],
    external: [
      'url-parse',
      'lodash-es/get',
      'lodash-es/set',
      'vee-validate',
      '@vee-validate/rules',
      '@vee-validate/i18n',
      'intl-tel-input',
      'intl-tel-input/build/js/utils',
      'intl-tel-input/build/css/intlTelInput.css',
    ],
  },
];
