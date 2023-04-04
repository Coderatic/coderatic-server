import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Register from "../components/Register.vue";
import LoginPage from "../components/LoginPage.vue";
import HomePage from "../components/HomePage.vue";
import Competition from "../components/Competition.vue";
import ActivateAccount from "../components/ActivateAccount.vue";
import store from "../store";

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
      meta: { auth: false },
    },
    {
      path: "/competition",
      name: "Competition",
      component: Competition,
      meta: { guest: false },
    },
    {
      path: "/auth/account/activate/:token",
      name: "ActivateAccount",
      component: ActivateAccount,
      meta: { guest: true },
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.meta.guest === true) {
    if (store.getters.isAuthenticated) {
      alert("This is the path" + from.path);
      next("/");
      return;
    } else {
      next();
      return;
    }
  } else if(to.meta.guest === false) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    } else {
      next("/login");
      return;
    }
  }else if(to.meta.auth === false){
    next();
    return
  }

  next();
});

export default router;
