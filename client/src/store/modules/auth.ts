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
	async register({},userData:UserData) {
		
		console.log({username: userData.username, email: userData.email, password: userData.password});
		await Api().post("/api/pre-signup", {username: userData.username, email: userData.email, password: userData.password});
		console.log("SuccessFully Registered");

	},

	async logout({commit}:any){
		let temp = null;
		await commit('LogOut', temp)
	}

};
const mutations = {
	LogOut(state:any){
		state.user = null;
	}
};
export default {
  state,
  getters,
  actions,
  mutations
};