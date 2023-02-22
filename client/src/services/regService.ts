import Api from "./Api";

export default {
  register(username: string, email: string, password: string, fname: string, lname: string) {
    console.log({username, email, password, fname, lname});
    return Api().post("register", {username, email, password, fname, lname});
  },
};
