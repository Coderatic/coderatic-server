import Api from "./Api";

export default {
  register(credentials: any) {
    console.log(credentials);
    return Api().post("register", credentials);
  },
};
