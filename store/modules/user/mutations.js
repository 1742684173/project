import * as type from "../../../common/config.js";

const mutations = {
	//设置微信用户信息
	[type.setWxInfoStage](state,result){
		console.log("设置微信信息",result)
		state.wxUserInfo = result;
	},
	
	//登录成功后设置用户信息
	[type.ologin](state,result){
		state.loginInfo = result;
		state.isBankInsideManager = result.EmployeeType==='1';
		state.isOneManager = result.EmployeeType==='2';
		state.isTwoManager = result.EmployeeType==='3';
	},
	
	//退出登录
	[type.logout](state,result){
		state.loginInfo = {};
	},
	
	//登录成功后设置用户信息
	[type.GET_WE_CHAT_LOGIN_INFO](state,result){
		state.wxUserInfo = result;
	},
}

export default mutations;