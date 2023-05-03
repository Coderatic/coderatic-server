import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import RegisterPage from "../components/auth/RegisterPage.vue";
import LoginPage from "../components/auth/LoginPage.vue";
import HomePage from "../components/core/HomePage.vue";
import Competition from "../components/core/Competition.vue";
import ActivateAccount from "../components/auth/ActivateAccount.vue";
import store from "../store";
import ProblemPage from "../components/core/ProblemPage.vue";
import Error404 from "../components/global/Error404.vue";
import CreateComp from "../components/core/CreateComp.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/register",
      name: "Registeration Page",
      component: RegisterPage,
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
    {
      path: "/problem/:problem_id",
      name: "Problem",
      component: ProblemPage,
    },
    {
      path: "/error",
      name: "Error404",
      component: Error404,
    },

    {
      path: "/create",
      name: "CreateCompetition",
      component: CreateComp,
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
  } else if (to.meta.guest === false) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    } else {
      next("/login");
      return;
    }
  } else if (to.meta.auth === false) {
    next();
    return;
  }

  next();
});

export default router;
