import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./store";
import Router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faCheck, faCircleXmark);

createApp(App)
  .use(store)
  .use(Router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
