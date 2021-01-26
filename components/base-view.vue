/**
 * 作用: 当网络断开时提示没有网络
 * 配置: 这个需要全局配置网络监听
	uni.onNetworkStatusChange(function (res) {
		uni.$emit('isConnected',res.isConnected);
	})
	
 * @onNetRefresh: function 网络重新加载刷新
 <base-view @onNetRefresh="onNetRefresh">
	 ....
 </base-view>
 */
<template>
	<view>
		<!-- 顶部弹窗组件 -->
		<top-tips ref="uTips"></top-tips>
		<!-- 无网络显示 -->
		<view v-if="!isConnected" class="margin flex flex-direction justify-center align-center">
			<!-- <image :src="pic.net_not_connect" style="width: 200upx;height: 200upx;"></image> -->
			<text class="margin-top text-black text-bold">网络未连接</text>
			<text>请检查你的网络设置后刷新</text>
			<button @tap="onNetRefresh" class="margin padding-rl cu-btn round bg-grey">
				刷新
			</button>
		</view>
		
		<!-- 有网络显示 -->
		<!-- 内容 -->
		<slot v-if="isConnected"></slot>
	
		<view class="cu-load load-modal" v-if="modelType === 'load'">
			<view class="gray-text">{{loadOption.title}}</view>
		</view>
		
		<view class="cu-modal" :class="modelType === 'alert'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{alertOption.title}}</view>
					<view class="action" @tap="hideModel" v-if="alertOption.isShowClose">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{alertOption.content}}
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green" v-for="(item,index) in alertOption.buttons" @click="onItemAlertClick(item)" :key="index"> {{item.text}}</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data: function(){
			return {
				sessionOuttime:"您长时间未使用预约开户系统，系统已自动退出，请重新登录",
				loadOption:{
					title:"正在加载中...",
				},
				alertOption:{
					title:"信息提示",
					content:"",
					isShowClose:false,
					buttons:[]
				},
				modelType:"",//load alert other
				isConnected:true,
				buttons:[],
				content:"",
			}
		},
		created:function(){
			let _this = this;
			uni.$on('isConnected',function(data){
				console.log('监听到网络变化：' + data);
				_this.isConnected = data;
			})
		},
		methods: {
			onNetRefresh:function(){
				this.$emit('onNetRefresh',{})
			},
			showToast:function(obj){
				console.log("showToast",obj);
				this.hideModel();
				if(obj.title === this.sessionOuttime){
					uni.redirectTo({
						url:"/pages/SignIn"
					});
				}else{
					let opt = Object.assign({
						duration: 3000, // 弹出框时间 默认2000
						title: '请求接口失败，请稍后重试', // 展示内容
						type: 'error', // primary success warning error info
					},obj)
					this.$refs.uTips.show(opt);
				}
			},
			showLoad:function(options){
				this.modelType = "load";
				this.loadOption = Object.assign(this.loadOption,options)
			},
			showAlert:function(options){
				this.modelType = "alert";
				this.alertOption = Object.assign(this.alertOption,options)
			},
			hideModel:function(){
				this.modelType = "";
			},
			back:function(obj){
				this.hideModel();
				uni.navigateBack(Object.assign({},obj))
			},
			onItemAlertClick:function(item){
				item.onClick();
			},
		}
	}
</script>

<style>
	
</style>
