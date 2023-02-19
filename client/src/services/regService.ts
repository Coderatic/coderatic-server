import Api from "./Api";

export default {
  register(credentials: { username: string; email: string; password: string }) {
    console.log(credentials);
    return Api().post("register", credentials);
  },
};
