import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "@/router";

import "./assets/main.css";

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- See issue: https://github.com/vuejs/vue-eslint-parser/issues/104
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
