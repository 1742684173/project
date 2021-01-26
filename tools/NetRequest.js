/* 浏览器调试跨域问题解决
 https://ask.dcloud.net.cn/article/35267
 
 */

import * as type from "../common/config"

const POST_METHOD = "POST"
const GET_METHOD = "GET"
const POST_HEADER = {
	"Access-Control-Allow-Headers": "content-type,x-requested-with",
	"content-type": 'application/json',
	"version": "1.0.0",
	"Accept": "application/json",
	"_locale": "zh_CN",
	"Accept-Language": "zh-CN",
	"Content-Language": "zh-CN",
	"Content-Type": "application/json;charset=UTF-8",
	// "Accept-Language": "zh-CN"   //your post header
}

const errorResult = {
	code:-1,
	message:"系统异常，请与后台管理员联系"
}

module.exports = {
	Post,
	Get,
	ImageUpLoad,
	VideoUpLoad,
}

function Post(param){
	param.method = POST_METHOD;
	return request(param)
}

function Get(param){
	return request(param)
}

function request({url,api,method,header,data,...others}){
	console.log("================接口【"+api+"】开始==============");
	
	return new Promise(async (resolve,reject)=>{
		url = url?url:type.apiServer;
		header = header?header:POST_HEADER ;
		method = method?method:GET_METHOD;
		
		console.log("接口【"+api+"】 method： "+method)
		console.log("接口【"+api+"】 url："+url)
		console.log("接口【"+api+"】入参："+JSON.stringify(data))
		
		// 进行网络数据请求
		console.log("接口请求地址: ", url + api);
		const [error, res] = await uni.request({url:url+api, method, header,data,others});
		
		if(error){
			console.log("接口【"+api+"】错误",error)
			resolve(errorResult);
		}
		
		if(res){
			let result = res.data;
			console.log("接口【"+api+"】成功返回结果：",result)
			
			resolve(result);
		}
	})
	
}


function ImageUpLoad({url, api, header, filePath,name, formData,success, fail, onProgressUpdate}) {
	if (!url) {
		// 切换服务器时使用，生产环境不能打开
		if(process.env.NODE_ENV !== "production") {
			const newUrl = wx.getStorageSync(type.serverKey);
			console.log("---------newUrl------",newUrl);
			if(!!newUrl){
				url = newUrl;
			}
		}
	}
	
	url = (url?url:type.apiServer)+api;
	console.log("url: " + url);
	header = header?header:{
		'content-type': 'multipart/form-data',
		"Accept": "application/json",
		"Accept-Language": "zh-CN",
	} ;
	
	name = name?name:'UploadFile';
	formData = formData?formData:{};
	
	const uploadTask = uni.uploadFile({
		url,
		filePath,
		name,
		header,
		formData,
		success: function(res) {
			typeof success == "function" && success(res);
		},
		fail: function(res) {
			typeof fail == "function" && fail(res)
		}
	})
	
	uploadTask.onProgressUpdate((res) => {
		if (onProgressUpdate != undefined) {
			typeof onProgressUpdate == "function" && onProgressUpdate(res)
		}
	})
}

function VideoUpLoad(tempFilePaths, dataJson, success, fail, onProgressUpdate) {
	var api = type.apiServer + 'liveCheck'
	console.log(api);
	console.log("formData = ");
	console.log(dataJson);
	var dataString = JSON.stringify(dataJson)
	const uploadTask = uni.uploadFile({
		url: api,
		filePath: tempFilePaths,
		name: 'file',
		formData: {
			data: dataString,
		},
		success: function(res) {
			console.log("res = ");
			console.log(res);
			uni.showToast({
				title: '上传成功！'
			})
			typeof success == "function" && success(res.data);
		},
		fail: function(res) {
			typeof fail == "function" && fail(res)
		}
	})
	uploadTask.onProgressUpdate((res) => {
		uni.showLoading({
			title: '上传进度' + res.progress + "%",
		});
		if (onProgressUpdate != undefined) {
			typeof onProgressUpdate == "function" && onProgressUpdate(res)
		}
	})
}
