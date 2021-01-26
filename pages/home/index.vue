<template name="home">
	<base-view ref="baseView">
		<!-- 搜索栏 -->
		<view id="search" class="bg-red" style="position: fixed;top:0;right:0;left:0;z-index: 1025;">
			<view class="cu-bar">
				<!-- <view class="cu-avatar round" style="background-image:url(../../static/common/notice.png)"></view> -->
				<image mode="aspectFit" class="cu-avatar round" src="../../static/common/notice.png"></image>
				<view class="search-form">
					<swiper autoplay="true" interval="3000" duration="2000" circular="true" style="height: 50upx;width: 70%;">
						<swiper-item v-for="(item,index) in noticeList " :key="index" class="flex align-center">
							<text style="font-size: 48upx;color: #333;">
								{{item.content}}
							</text>
						</swiper-item>
					</swiper>
				</view>
				<view class="action">
					<text>{{currentCityName}}</text>
					<text class="cuIcon-triangledownfill"></text>
				</view>
			</view>
			
		</view>
		
		<view id="noteView" :style="{marginTop:searchHeight+'px'}">
			
			<view class="bg-white padding-sm">
				<!-- 图片轮播 -->
				<swiper class="screen-swiper round-dot" :autoplay="true" interval="5000" duration="1000" style="min-height: 300upx;">
					<swiper-item v-for="(item,index) in adInfoList" :key="index" style="border-radius: 10upx;">
						<image :src="item.imgUrl" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>
			
			<view class="cu-list grid" :class="['col-3','no-border']">
				<view class="cu-item" v-for="(item,index) in projectSortList" :key="index">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
			
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="true?'text-green cur':''" :key="index" @tap="tabSelect" :data-id="index">
					服务评价
				</view>
				<view class="cu-item" :class="false?'text-green cur':''" :key="index" @tap="tabSelect" :data-id="index">
					资讯
				</view>
			</scroll-view>
		</view>
		
		
	</base-view>
</template>

<script>
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import * as type from '../../common/config.js';
	export default {
		data() {
			return {
				// 搜索栏高度
				searchHeight:0,
				// 通知高度(轮播图片+通知+热门)
				noteViewHeight:0,
				tabCur: 0,
				
			}
		},
		computed:{
			...mapState({
				loginInfo: state => state.user.loginInfo,
				wxUserInfo: state => state.user.wxUserInfo,
				currentCityName: state => state.common.address.currentCityName,
				currentCityCode: state => state.common.address.currentCityCode,
				projectSortList:state => state.data.projectSortList,
				noticeList: state => state.data.noticeList,
				adInfoList: state => state.data.adInfoList,
			})
		},
		async mounted() {
			// this.$refs.baseView.showLoad();
			// try{
			// 	// 获取当前经纬度
			// 	let {latitude,longitude} = await this.$store.dispatch("common/"+type.getAddressCoordinate,{});
			// 	// 根据经纬度获取详细地址
			// 	await this.$store.dispatch("common/"+type.getAddress,{latitude,longitude});
			// 	this.$refs.baseView.hideModel();
			// }catch(e){
			// 	this.$refs.baseView.showToast({title:"请检查你的网络，或联系银行"});
			// }
		},
		methods:{
			...mapActions({
				Post:"common/"+type.PUBLIC_POST,
				Get:"common/"+type.PUBLIC_GET,
			}),
		},
		watch:{
			currentCityName:function(flag){
				console.log("地址发生变化了")
				//this.queryProjectList();
			}
		},
		onUnload(){
			// this.animationDataY	= {};
		},
		onReady() {
			console.log("onReady child")
			// 计算屏幕剩余高度  填补剩余高度
			let _this = this;
			let view = uni.createSelectorQuery().in(this);
			
			view.select('#search').boundingClientRect(data => {
				_this.searchHeight = data.height;
			}).exec();
			
			view.select('#noteView').boundingClientRect(data => {
				_this.noteViewHeight = data.height;
			}).exec();
			
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
