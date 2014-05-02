/**
 * require.js config
 */

requirejs.config({
  baseUrl: 'js/modules/common',
  noGlobal: true,
  paths: {
    jquery: '../../vendor/jquery',
    text: '../../vendor/plugin/text'
  },
  shim: {}
});
