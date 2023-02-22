import Api from "./Api";

export default {
  login(username: string, password: string) {
    console.log({ username, password });
    return Api().post("auth", { username, password });
  },
};
