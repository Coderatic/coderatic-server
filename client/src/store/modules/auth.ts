import Api from "../../services/Api";
import { AxiosError, AxiosResponse } from "axios";
interface AuthData {
  username: string;
  email?: string;
  password: string;
}

const state = {
  user: null,
};
const getters = {
  isAuthenticated: (state: any) => !!state.user,
};
const actions = {
  async register({}, authData: AuthData) {
    return await Api().post("/api/auth/pre-signup", {
      username: authData.username,
      email: authData.email,
      password: authData.password,
    });
  },

  async logout({ commit }: any) {
    if(state.user != null){
    let temp = null;
    await commit("LogOut", temp);
  }
  },
  async login({ commit }: any, authData: AuthData) {
    const response = await Api().post("/api/auth/signin", {
      username: authData.username,
      password: authData.password,
    });
    const userInfo = response.data.user;
    await commit("LogIn", userInfo);
    return response;
  },
};
const mutations = {
  LogIn(state: any, userInfo: object) {
    state.user = userInfo;
  },
  LogOut(state: any) {
    state.user = null;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
