import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Register from "../components/Register.vue";
import LoginPage from "../components/LoginPage.vue";

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
  ],
});

export default router;
