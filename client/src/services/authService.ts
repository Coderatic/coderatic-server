import Api from "./Api";

export default {
  register(credentials: any) {
    return Api().post("register", credentials);
  },
};
