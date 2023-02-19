import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Register from "../components/Register.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/register",
      name: "Registeration Page",
      component: Register,
    },
  ],
});

export default router;
