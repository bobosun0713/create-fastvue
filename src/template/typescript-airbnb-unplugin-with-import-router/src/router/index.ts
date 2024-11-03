import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";

routes.push({
  path: "/:pathMatch(.*)*",
  redirect: "/"
});

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
