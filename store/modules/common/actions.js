import * as type from "../../../common/config.js";
import {Post, Get,ImageUpLoad,VideoUpLoad,} from "tools/NetRequest"
		
const actions = {
	[type.POST]({commit, state, rootState,dispatch},{api,param}){
		return new Promise(async (resolve,reject)=>{
			let {code,message,data} = await Post({api,data:param});
			if (code == type.SUCCESS) {
				reject(data);
			}else{
				resolve(message);
			}
		})
	},
	
	/**
	 * // 获取当前地址坐标
	 */ 
	[type.getAddressCoordinate]({commit, state, rootState,dispatch},{}){
		return wx.getLocation({geocode:true});
	},
	
	/**
	 * 设置app常用数据
	 */
	[type.setAppData]({commit, state, rootState,dispatch},param){
		console.log("setAppData-----param",param)
		commit(type.setAppData,param);
	},
	
	/**
	 * 根据经纬度获取详细地址
	 */ 
	[type.getAddress]({commit, state, rootState,dispatch},{latitude,longitude}){
		return new Promise(async (resolve,reject)=>{
			let api = type.getAddress;
			let url = type.qqMapServer; 
			
			let data = {
				location:latitude+","+longitude+"",
				key:type.qqMapKey
			}
			let {status,message,result} = await Get({url,api,data});
			console.log("address",result) 
			if(status === 0){
				commit(type.getAddress,result);
				resolve(result);
			}else{
				reject(message);
			}
		})
	},
	
	// /**
	//  *通过路径 保存图片
	//  * filePath
	//  */ 
	// [type.SAVE_PIC]({commit, state, rootState,dispatch},filePath){
	// 	return new Promise(async (resolve,reject)=>{
	// 		uni.saveImageToPhotosAlbum({
	// 			filePath,
	// 			success: function () {
	// 				resolve("保存成功")
	// 			},
	// 			fail(){
	// 				reject("保存失败")
	// 			}
	// 		});
	// 	})
	// },
	
	// /**
	//  * 通过url获取base64
	//  * 
	//  * url: 图片url
	//  */ 
	// [type.URL_TO_BASE64]({commit, state, rootState,dispatch},url){
	// 	return new Promise(async (resolve,reject)=>{
	// 		console.log(type.URL_TO_BASE64+"参数： ",url)
	// 		uni.request({
	// 			url,
	// 			method:'GET',
	// 			responseType: 'arraybuffer',
	// 			success: ress => {
	// 				let base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64 
	// 				base64 = 'data:image/jpeg;base64,' + base64 //不加上这串字符，在页面无法显示的哦
	// 				console.log(base64)
	// 				resolve(base64);
	// 			},
	// 			fail: error => {
	// 				console.log("url获取base64异常",error)
	// 				reject(error);
	// 			}
	// 		})
			
	// 	})
	// },
	
	// /**
	//  * base64 转图片路径
	//  * 
	//  * base64
	//  */ 
	// [type.BASE64_2_PATH]({commit, state, rootState,dispatch},base64){
	// 	console.log("base64",base64)
	// 	return new Promise(async (resolve,reject)=>{
	// 		var fileName = Date.now()+".png";
			
	// 		if(typeof wx === "object" && wx.canIUse("getFileSystemManager")){
	// 			var filePath = wx.env.USER_DATA_PATH+"/"+fileName;
	// 			console.log("filePath",filePath)
	// 			wx.getFileSystemManager().writeFile({
	// 				filePath,
	// 				data:base64,
	// 				encoding:"base64",
	// 				success(){
	// 					console.log("success")
	// 					resolve(filePath);
	// 				},
	// 				fail(error){
	// 					reject(error);
	// 				}
	// 			})
	// 		}else{
	// 			console.log("失败")
	// 			reject("保存失败");
	// 		}
	// 	})
	// },
	
	// /**
	//  * 获取小程序码图片
	//  * WexinId,
	//  * UserSeq:"",//用户号
	//  * OrderId:"",//订单号
	//  * EmployeeId:"",//雇员序号 客户经理分享必输
	//  * MerchantNo:"",//商户号 产生商户码牌时必输
	//  * ProjectId:this.ProjectNo,//项目编号 产生商户码牌时必输
	//  * logo
	//  */ 
	// [type.QRCodeImgApply]({commit, state, rootState,dispatch},data){
	// 	console.log("data",data)
	// 	return new Promise(async (resolve,reject)=>{
	// 		console.log("data",data)
	// 		let api = type.QRCodeImgApply;
	// 		// let url = "http://172.31.209.168:172/"; 
			
	// 		let result = await Post({api,data});
	// 		if(result.jsonError){
	// 			reject(result.jsonError[0]._exceptionMessage);
	// 		}else{
	// 			resolve(result);
	// 		}
	// 	})
	// },
	
	// /**
	//  * 需要登录的页面进行判断
	//  * CityCode：城市编码
	//  * ExitNext 是否存在下级
	//  */ 
	// async [type.QueryCityNameByCode]({commit, state, rootState,dispatch},{CityCode,ExitNext}){
	// 	return new Promise(async (resolve,reject)=>{
	// 		console.log("rootState",rootState.user)
	// 		let api = type.QueryCityNameByCode;
	// 		let data = {CityCode,ExitNext};
			
	// 		let result = await Post({api,data});
	// 		if(result.jsonError){
	// 			reject(result.jsonError[0]._exceptionMessage);
	// 		}else{
	// 			resolve(result);
	// 		}
	// 	})
	// },
	
	// // 扫码获取信息
	// async [type.SCAN_CODE]({commit, state},{onlyFromCamera,scanType}){
	// 	return new Promise(async (resolve,reject)=>{
	// 		try {
	// 		    let onlyFromCamera = onlyFromCamera?onlyFromCamera:false;
	// 		    // 扫码类型，参数类型是数组，二维码是'qrCode'，一维码是'barCode'，DataMatrix是‘datamatrix’，pdf417是‘pdf417’。
	// 		    let scanType = scanType?scanType:['qrCode','barCode','datamatrix','pdf417'];
	// 		    const result = await uni.scanCode({onlyFromCamera,scanType,});
	// 			console.log("扫码获取信息result:",result)
	// 			resolve(result);
	// 		} catch (e) {
	// 			console.log("扫码获取信息异常:",e)
	// 			reject("扫码获取信息失败");
	// 		}
	// 	})
	// },
	
	// 存数据
	async [type.setStorageSync]({commit, state},{key,value}){
		return new Promise(async (resolve,reject)=>{
			try {
			    await uni.setStorageSync(key,value);
				console.log("保存成功:")
				resolve("保存成功");
			} catch (e) {
				console.log("保存异常:",e)
				reject("保存失败");
			}
		})
	},
	
	// 取数据
	async [type.getStorageSync]({commit, state},key){
		return new Promise(async (resolve,reject)=>{
			try {
			    const result = await uni.getStorageSync(key);
				console.log(key+"结果",result)
				resolve(result);
			} catch (e) {
				console.log("保存异常:",e)
				reject("获取失败");
			}
		})
	},
	
	// 移除数据
	async [type.removeStorageSync]({commit, state},key){
		return new Promise(async (resolve,reject)=>{
			try {
			    await uni.removeStorageSync(key);
				resolve("移除成功");
			} catch (e) {
				console.log("保存异常:",e)
				reject("获取失败");
			}
		})
	}
	
	
}

export default actions;