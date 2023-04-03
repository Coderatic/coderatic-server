import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Register from "../components/Register.vue";
import LoginPage from "../components/LoginPage.vue";
import HomePage from "../components/HomePage.vue";
import Competition from "../components/Competition.vue";
import ActivateAccount from "../components/ActivateAccount.vue";
import store from '../store';


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/register",
      name: "Registeration Page",
      component: Register,
      meta: { guest: true },
    },
    {
      path: "/login",
      name: "Login Page",
      component: LoginPage,
      meta: { guest: true },
    },
    {
      path: "/",
      name: "Home Page",
      component: HomePage,
    },
    {
      path: "/competition",
      name: "Competition",
      component: Competition,
    },
    {
      path: '/auth/account/activate/:token',
      name: 'ActivateAccount',
      component: ActivateAccount,
      meta: { guest: true },
    },

  ],
});
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router;
