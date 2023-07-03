import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./store";
import Router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import PrimeVue from "primevue/config";
import { Quasar } from "quasar";

library.add(faCheck, faCircleXmark);

const app = createApp(App);
// .use(store)
// .use(Router)
// .use(PrimeVue)
// .component("font-awesome-icon", FontAwesomeIcon)
// .mount("#app");

app.use(store);
app.use(Router);
app.use(Quasar, {});
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
