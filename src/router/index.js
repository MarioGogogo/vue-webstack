import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '@/views/index.vue';
import About from '@/views/about.vue';
import Console from '@/views/console/index.vue';
import Main from '@/views/console/main.vue';
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  { path: '/', component: Index },
  { path: '/about', component: About },
  { path: '/console', component: Console },

  {
    path: '/main',
    component: Main,
    redirect: '/main/console',
    children: [
      {
        path: 'console',
        name: 'console',
        meta: {
          title: '控制台',
        },
        components: {
          table: () => import(/* webpackChunkName: "classify" */ '@/views/console/console.vue'),
        },
      },
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
        path: 'login-logs',
        name: 'loginLogs',
        meta: {
          title: '登录日志',
        },
        components: {
          table: () => import(/* webpackChunkName: "setting" */ '@/views/logs/login-logs.vue'),
        },
      },
      {
        path: 'error-logs',
        name: 'logs',
        meta: {
          title: '错误日志',
        },
        components: {
          table: () => import(/* webpackChunkName: "setting" */ '@/views/console/logs.vue'),
        },
      },
      {
        path: 'performance-logs',
        name: 'logs',
        meta: {
          title: '性能日志',
        },
        components: {
          table: () => import(/* webpackChunkName: "setting" */ '@/views/console/logs.vue'),
        },
      },
      {
        path: 'action-logs',
        name: 'logs',
        meta: {
          title: '操作日志',
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
