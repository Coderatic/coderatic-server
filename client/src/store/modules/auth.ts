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
		try{
		console.log({username: userData.username, uemail: userData.email, password: userData.password});
		const response = await Api().post("register", {username: userData.username, email: userData.email, password: userData.password});
		commit('setUserData', userData.username)
		return response;
		}
		catch(err){
		return err;
		}
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