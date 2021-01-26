<template>
	<base-view class="" ref="baseView" @onNetRefresh="onNetRefresh">
		<view class="flex bg-white padding align-center">
			<view class="flex flex-treble align-center" style="height:64upx; padding:10upx;background-color: #F3F4F8; border-radius: 50upx;">
				<image
					:src="pic.Status_icon_search01"
					class="margin-lr"
					style="width: 44upx;height: 44upx"
					mode="aspectFit"></image>
				<input v-model="searchValue" placeholder="输入你想要的内容"></input>
			</view>
			
			<view class="flex justify-center align-center margin-lr" style="width: 112upx;height: 56upx;border-radius: 32upx;background-color: #f03;color: #fff;font-size: 28upx;">
				搜索
			</view>
		</view>
		
	</base-view>
				
</template>

<script>
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import * as type from '../../common/config.js';
	export default {
		data: function(){
			return {
			}
		},
		computed:{
			...mapState({
				pic: state => state.common.pic,
			})
		},
		methods: {
			onNetRefresh:function(e){
			}
			
		},
		onReady() {
			// 计算屏幕剩余高度  填补剩余高度
			let _this = this;
			uni.getSystemInfo({
				success(res) {
					_this.phoneHeight = res.windowHeight;
					console.log(res.windowHeight);
				}
			});
			
			
		}
	}
</script>

<style>
	
</style>