import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import * as config from "../../../common/config.js";

const state = {
	app:{
		phoneHeight:0,// phoneHeight高度
		tabViewHeight:0,// tab高度
		CustomBar:0,// CustomBar高度
		StatusBar:0,// StatusBar高度
	},
	address:{
		currentCityName:"贵阳市",
		currentCityCode:"",
	}
	
}

export default {
	namespaced:true,
	state,
	getters,
	actions,
	mutations
}