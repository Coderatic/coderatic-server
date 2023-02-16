import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import AuthForm from "../components/AuthForm.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/auth",
      name: "Authorization Form",
      component: AuthForm,
    },
  ],
});

export default router;
