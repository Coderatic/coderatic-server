import Api from "../../services/Api";
import { AxiosError, AxiosResponse } from "axios";
interface UserData{
	username:string;
	 email:string;
	  password:string
}
const state = {
	user:null
};
const getters = {
	isAuthenticated: (state:any) => !!state.user
};
const actions = {
	async register({commit}:any,userData:UserData) {
		
		console.log({username: userData.username, uemail: userData.email, password: userData.password});
		await Api().post("register", {username: userData.username, email: userData.email, password: userData.password});
		await commit('setUserData', userData.username)
		console.log("SuccessFully Registered");

	}

};
const mutations = {
	setUserdata(state:any, username:string){
		state.user = username;
	}
};
export default {
  state,
  getters,
  actions,
  mutations
};