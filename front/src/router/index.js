import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login.vue'
import AboutView from '../views/About.vue'


import NotFound from '@/NotFound.vue'
import { useAuthStore } from '@/stores/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { requiresAuth: true }

    },
    {
      path: '/:pathMatch(.*)*', // Catch-all route for 404
      name: 'NotFound',
      component: NotFound,
  },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guest: true }
    },

  ],
})
// router.beforeEach(async (to, from, next) => {
//   const isAuthenticated = !!store.state.token;
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     return next({ name: 'Login' });
//   }
//   if (to.meta.guestOnly && isAuthenticated) {
//     return next({ name: 'Dashboard' });
//   }
//   next();
// });

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.user && authStore.token) {
    try {
      await authStore.fetchUser(); // Fetch user if token exists
    } catch (error) {
      console.error('Authentication error:', error);
    }
  }

  const isAuthenticated = !!authStore.user;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login' });
  }

  if (to.meta.guest && isAuthenticated) {
    return next({ name: 'home' });
  }
  // if (!to.meta.requiresAuth && !isAuthenticated) {
  //   return next({ name: 'login' });
  // }

  next();
});
export default router
