import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const state = {
	
	// 项目分类列表
	projectSortList:[{
		cuIcon: 'clothesfill',
		color: 'blue',
		badge: 0,
		name: '自营'
	}, {
		cuIcon: 'discoverfill',
		color: 'purple',
		badge: 0,
		name: '装修'
	}, {
		cuIcon: 'questionfill',
		color: 'mauve',
		badge: 0,
		name: '化妆'
	}, {
		cuIcon: 'commandfill',
		color: 'purple',
		badge: 0,
		name: '问答'
	}, {
		cuIcon: 'brandfill',
		color: 'mauve',
		badge: 0,
		name: '帮助'
	}],
	adInfoList:[
		{imgUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big39001.jpg"},
		{imgUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big39002.jpg"},
		{imgUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big39003.jpg"},
		{imgUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big39004.jpg"},
	],
	noticeList:[
		{content:"1111111"},
		{content:"2222222"},
		{content:"3333333"},
		{content:"4444444"},
	]
}

export default {
	namespaced:true,
	state,
	getters,
	actions,
	mutations
}