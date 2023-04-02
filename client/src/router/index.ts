import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Register from "../components/Register.vue";
import LoginPage from "../components/LoginPage.vue";
import HomePage from "../components/HomePage.vue";
import Competition from "../components/Competition.vue";


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
      name: "Home Page",
      component: HomePage,
    },
    {
      path: "/competition",
      name: "Competition",
      component: Competition,
    },

  ],
});

export default router;
