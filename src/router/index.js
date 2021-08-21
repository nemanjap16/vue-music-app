import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/index';
import Home from '../views/Home.vue';
import Manage from "../views/Manage.vue";
import PageNotFound from '../views/PageNotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/manage-music',
    // alias: '/manage',
    name: 'Manage',
    meta: {
      requiresAuth: true,
    },
    component: Manage,
    // protected route
    // beforeEnter: (to, from, next) => {
    //   console.log('Route protection');
    //   next();
    // },
  },
  {
    path: '/manage',
    redirect: { name: 'Manage' },
  },
  {
    path: '/:catchAll(.*)*',
    component: PageNotFound,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});
// Globaly protected routes
router.beforeEach((to, from, next) => {
  // console.log(to.matched);
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }
  if (store.state.userLoggedIn) {
    next();
  } else {
    next({ name: 'Home' });
  }
});

export default router;
