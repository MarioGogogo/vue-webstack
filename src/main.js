import Vue from 'vue';
import App from './App.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router';
Vue.use(ElementUI);
import '@/assets/iconfont/iconfont.css';
import './assets/css/fonts/linecons/css/linecons.css';
import './assets/css/fonts/fontawesome/css/font-awesome.min.css';
import './assets/css/bootstrap.css';
import './assets/css/xenon-core.css';
import './assets/css/xenon-components.css';
import './assets/css/xenon-skins.css';
import './assets/css/nav.css';
import 'echarts';
import ECharts from 'vue-echarts';
Vue.component('VChart', ECharts);
import JsonViewer from 'vue-json-viewer';
Vue.use(JsonViewer);
Vue.config.productionTip = false;
import store from './store';
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
