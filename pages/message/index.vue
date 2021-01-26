<template name="message">
	<base-view ref="baseView">
		<list-view
			:isShowSearch="true"
			:isEmpty="totalCount === 0"
			:height="phoneHeight - tabViewHeight"
			:headHeight="0"
			:loadStatus="loadStatus" 
			:refresherTriggered="refresherTriggered"
			@onRefresh="onRefresh"
			@onScrolltolower="onScrolltolower">
			
			<template slot="contentSlot">
				
				<view @tap="onItemTap()" class="cu-list menu-avatar">
					<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in 8" :key="index"
					 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
						<view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view>
						<view class="content">
							<view class="text-grey">文晓港</view>
							<view class="text-gray text-sm">
								<text class="cuIcon-infofill text-red  margin-right-xs"></text> 消息未送达</view>
						</view>
						<view class="action">
							<view class="text-grey text-xs">22:20</view>
							<view class="cu-tag round bg-grey sm">5</view>
						</view>
						<view class="move">
							<view class="bg-grey">置顶</view>
							<view class="bg-red">删除</view>
						</view>
					</view>
				</view>
			</template>
		</list-view>
		
		
	</base-view>
</template>

<script>
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import * as type from '../../common/config.js';
	export default {
		data() {
			return {
				// 搜索栏调试
				searchHeight:0,
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				
				totalPage:10,
				totalCount:10,
				currentPage:1,
				pageSize:10,
				refresherTriggered:false,
				//上拉的状态：more-loading:加载更多数据  loading:正在加载 no-more:没有更多数据了
				loadStatus:"",
			}
		},
		computed:{
			...mapState({
				loginInfo: state => state.user.loginInfo,
				wxUserInfo: state => state.user.wxUserInfo,
				currentCityName: state => state.common.address.currentCityName,
				currentCityCode: state => state.common.address.currentCityCode,
				tabViewHeight:state => state.common.app.tabViewHeight,
				phoneHeight :state => state.common.app.phoneHeight ,
			})
		},
		async mounted() {
			
		},
		methods:{
			...mapActions({
				Post:"common/"+type.PUBLIC_POST,
				Get:"common/"+type.PUBLIC_GET
			}),
			onItemTap:function(){
				console.log("111111")
				uni.navigateTo({url:"/pages/message/chat"})
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
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
			// let _this = this;
			// let view = uni.createSelectorQuery().in(this);
			
			// view.select('#search').boundingClientRect(data => {
			// 	_this.searchHeight = data.height;
			// }).exec();
			
		}
	}
</script>

<style>
	
</style>
