import Api from "../../services/Api";
import { AxiosError, AxiosResponse } from "axios";
interface AuthData{
	username:string;
	email:string;
	password:string
}
const state = {
	user:"ooga"
};
const getters = {
	isAuthenticated: (state:any) => !!state.user
};
const actions = {
	async register({},authData:AuthData) {
		
		console.log({username: authData.username, email: authData.email, password: authData.password});
		await Api().post("/api/auth/pre-signup", {username: authData.username, email: authData.email, password: authData.password});
		console.log("SuccessFully Registered");

	},

	async logout({commit}:any){
		let temp = null;
		await commit('LogOut', temp)
	},
	async login({commit}:any,authData:AuthData) {
		
		console.log({username: authData.username, password: authData.password});
		const response = await Api().post("/api/auth/signin", {username: authData.username, password: authData.password});
		const userInfo = response.data.user;
		await commit('LogIn', userInfo);
		console.log("SuccessFully Logged In");

	},

};
const mutations = {
	LogIn(state:any, userInfo:object){
		state.user = userInfo;
	},
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