import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store';
// import store from '../store';

const routes = [
  {
    path: '/todos',
    name: 'Todos',
    meta: {requiresAuth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Todos.vue')
  },
  {
    path: '/',
    name: 'Session',
    component: () => import(/* webpackChunkName: "about" */ '../views/Session.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.user) {
      next();
    } else {
      router.push({ name: "Session" });
    }
  } else {
    next()
  }
});

export default router
