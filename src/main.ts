/** @ts-ignore */
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";

const vuetify = createVuetify({
  theme: {
    defaultTheme: "dark",
  },
});

import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./plugins/router";
import { pinia } from "./plugins/pinia";

createApp(App).use(vuetify).use(router).use(pinia).mount("#app");
