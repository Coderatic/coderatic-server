import Api from "./Api";

export default {
  register(username: string, email: string, password: string) {
    console.log({username, email, password});
    return Api().post("register", {username, email, password});
  },
};
