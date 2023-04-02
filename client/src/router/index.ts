import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Register from "../components/Register.vue";
import LoginPage from "../components/LoginPage.vue";
import HomePage from "../components/HomePage.vue";


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/register",
      name: "Registeration Page",
      component: Register,
    },
    {
      path: "/login",
      name: "Login Page",
      component: LoginPage,
    },
    {
      path: "/",
      name: "Login Page",
      component: HomePage,
    },

  ],
});

export default router;
