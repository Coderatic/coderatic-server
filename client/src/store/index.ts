import { createStore } from "vuex";
import { createApp } from "vue";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";

// Create store
const store = createStore({
  modules: {
    auth,
  },
  plugins: [createPersistedState()],
});
export default store;
