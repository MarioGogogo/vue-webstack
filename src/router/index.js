import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '@/views/index.vue';
import About from '@/views/about.vue';
import Console from '@/views/console/index.vue';
import Main from '@/views/console/main.vue';
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Index },
  { path: '/about', component: About },
  { path: '/console', component: Console },
  {
    path: '/main',
    component: Main,
    children: [
      {
        path: 'classify',
        name: 'classify',
        meta: {
          title: '分类管理',
        },
        components: {
          table: () => import(/* webpackChunkName: "classify" */ '@/views/console/classify.vue'),
        },
      },
      {
        path: 'links',
        name: 'links',
        meta: {
          title: '链接列表',
        },
        components: {
          table: () => import(/* webpackChunkName: "links" */ '@/views/console/links.vue'),
        },
      },
      {
        path: 'setting',
        name: 'setting',
        meta: {
          title: '系统管理',
        },
        components: {
          table: () => import(/* webpackChunkName: "setting" */ '@/views/console/setting.vue'),
        },
      },
      {
        path: 'logs',
        name: 'logs',
        meta: {
          title: '日志管理',
        },
        components: {
          table: () => import(/* webpackChunkName: "setting" */ '@/views/console/logs.vue'),
        },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
