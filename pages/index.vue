<template>
	<view>
		<home v-if="pageCur=='home'"></home>
		<message v-if="pageCur=='message'"></message>
		<mine v-if="pageCur=='mine'"></mine>
		<view id="tabView"  class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="home">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/home' + [pageCur=='home'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="pageCur=='home'?'text-green':'text-gray'">首页</view>
			</view>
			
			<view class="action" @click="NavChange" data-cur="message">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/message' + [pageCur == 'message'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="pageCur=='message'?'text-green':'text-gray'">消息</view>
			</view>
			
			<view class="action" @click="NavChange" data-cur="mine">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/mine' + [pageCur == 'mine'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="pageCur=='mine'?'text-green':'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import * as type from '../common/config.js'
	export default {
		data() {
			return {
				pageCur: 'home',
			}
		},
		onReady() {
			
		},
		methods: {
			...mapActions({
				Get:"common/"+type.PUBLIC_GET,
			}),
			NavChange: function(e) {
				this.pageCur = e.currentTarget.dataset.cur
			}
		},
		onReady() {
			// 计算屏幕剩余高度  填补剩余高度
			let _this = this;
			let view = uni.createSelectorQuery().in(this);
			
			view.select('#tabView').boundingClientRect(data => {
				console.log("type.setAppData",type.setAppData)
				_this.$store.dispatch("common/"+type.setAppData,{
					"tabViewHeight":data.height,
					phoneHeight: _this.phoneHeight,
					CustomBar: _this.CustomBar,
					StatusBar: _this.StatusBar,
				},{root:true});
			}).exec();
			
		}
	}
</script>

<style>

</style>
