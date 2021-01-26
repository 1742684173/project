import * as type from "../../../common/config";

const mutations = {
	//设置当前地址
	[type.getAddress](state,{address_component}){
		state.address.currentProvinceName = address_component.province;
		state.address.currentCityName = address_component.city;
	},
	
	[type.setAppData](state,param){
		console.log("------param-------",param)
		
		if(!!param.tabViewHeight){
			state.app.tabViewHeight = param.tabViewHeight;
		}
		
		if(!!param.phoneHeight){
			state.app.phoneHeight = param.phoneHeight;
		}
		
		if(!!param.StatusBar){
			state.app.StatusBar = param.StatusBar;
		}
		
		if(!!param.CustomBar){
			state.app.CustomBar = param.CustomBar;
		}
	},
}

export default mutations;