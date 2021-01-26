import * as type from "../../../common/config.js";

import {Post, Get,ImageUpLoad,VideoUpLoad,} from "tools/NetRequest"
	
const actions = {
	
	// 设置微信信息
	[type.setWxInfoStage]({commit,state},data){
		console.log("设置微信信息",data)
		commit(type.setWxInfoStage,data)
	},
	
	// 授权微信信息
	[type.authWx]({commit,state},{}){
		return wx.getUserInfo();
	},
	
	// 微信登录
	[type.WE_CHAT_LOGIN]({commit, state},{}){
		return new Promise(async (resolve,reject)=>{
			wx.login({
				provider:"weicin",
				scopes:"auth_base",
				success:res => {
					console.log("success",res)
					resolve(res.code);
				},
				fail:error => {
					console.log("fail",error)
					reject(result.errMsg);
				}
			});
		})
	},
	
	//登录
	async [type.signIn]({commit, state,dispatch},data){
		return new Promise(async (resolve,reject)=>{
			let api = type.signIn;
			const res = await Post({api,data});
			
			// if (res.jsonError && res.jsonError.length > 0) {
			// 	reject(res.jsonError[0]._exceptionMessage);
			// }else{
			// 	commit(api,res);
			// 	resolve(res);
			// }
		})
	},
	
	//退出登录
	async [type.logout]({commit, state,dispatch},{}){
		let api = type.logout;
		commit(api,{});
	},
	
}

export default actions;