import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/index.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/About.vue")
    }
  ]
});

export default router;
