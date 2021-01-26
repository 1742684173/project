/**
 * isShowSearch:是否显示搜索框
 * onSearch: function 搜索,isShowSearch为true才显示
 * searchPlaceholder 输入框提示内容，注意格式 "'提示内容'"
 
 * isEmpty:数据是否为空
 * height:总高度(px)
 * headHeight:表头高度(px)
 * refresherTriggered:是否下在刷新	
 * onRefresh:function 下拉刷新
 * 
 * loadStatus: //上拉的状态：more-loading:加载更多数据  loading:正在加载 no-more:没有更多数据了
 * onScrolltolower:function 上拉加载
 * 
 * headerSlot: 自定义头部
 * contentSlot: 自定义内容
 *
 * 例子:
 * <list-view
	:isShowSearch="true" 
	:isEmpty="list.length==0"
	:headHeight="headHeight"
	:loadStatus="loadStatus" 
	:searchPlaceholder="'请输入姓名/身份证号/手机号'"
	:refresherTriggered="refresherTriggered"
	@onSearch="onSearch"
	@onRefresh="onRefresh"
	@onScrolltolower="onScrolltolower">
	
		<template slot="headerSlot">
			......
		</template>
		
		<template slot="contentSlot">
			.....
		</template>
		
	</list-view>
 */
<template name="list-view">
	<view>
		<!-- 搜索框 -->
		<view v-if="isShowSearch" class="cu-bar search fixed bg-white" style="height: 50px;">
			<view class="flex-sub search-form round padding-lr">
				<!-- <text class="cuIcon-search"></text> -->
				<input v-model="searchValue" :adjust-position="false" type="text" :placeholder="searchPlaceholder" confirm-type="search"></input>
				<text class="cuIcon-close" @tap="clearSearchFunction"></text>
			</view>
			
			<text @tap="onSearch" class="margin-right">搜索</text>
		</view>
		
		<!-- 列表标题 不让跟着滑动 -->
		<view class="bg-white" :style="{top:isShowSearch?'50px':'0'}" style="position: fixed;width: 100%;z-index: 1025;" >
			<slot name="headerSlot"></slot>
		</view>
		
		<!-- 用来填充头部的位置 -->
		<view :style="[{'height':(isShowSearch?(50+headHeight):headHeight)+'px'}]"></view>
		
		<view v-if="isEmpty" class="flex justify-center align-center" :style="{'height':(height-headHeight-(isShowSearch?50:0))+'px'}">
			数据为空
		</view>
		
		<scroll-view
			v-if="!isEmpty"
			scroll-y="true" 
			refresher-enabled="true" 
			:style="[{'height':(height-headHeight-(isShowSearch?50:0))+'px'}]"
			:refresher-triggered="refresherTriggered"
			:refresher-threshold="100" 
			@scrolltolower="onScrolltolower"
			@refresherrefresh="onRefresh" >
			<!-- @refresherpulling="onPulling" -->
			
			<!-- 列表内容 -->
			<slot name="contentSlot"></slot>
			
			<!-- 上拉加载时界面 -->
			<view class="flex cu-item">
				<view class="flex flex-sub flex-direction">
					
					<view v-if="loadStatus=='more-loading'" class="flex justify-center margin-top-sm">
						<text style="color:#">上拉加载更多</text>
					</view>
					
					<view v-if="loadStatus=='loading'" class="cu-load loading"></view>
					
					<view v-if="loadStatus=='no-more'" class="cu-load over"></view>
				</view>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	export default{
		props:{
			// 总高度
			height:{
				type: Number,
				default:0,
			},
			//header
			headHeight:{
				type: Number,
				default:0,
				required:true
			},
			//上拉的状态：more-loading:加载更多数据  loading:正在加载 no-more:没有更多数据了
			loadStatus: {
				type: String,
				default:"",//[{{key:"name",name:"名称",}}]
			},
			//数据是否为空
			isEmpty: {
				type: Boolean,
				default:false
			},
			//是否正在刷新
			refresherTriggered: {
				type: Boolean,
				default:false
			},
			// 是否显示搜索框
			isShowSearch:{
				type:Boolean,
				default:false
			},
			//搜索框显示内容
			searchPlaceholder:{
				type:String,
				default:"搜索内容"
			}
		},
		data: function(){
			return {
				searchValue:"",
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
			}
		},
		methods: {
			//下拉触发
			// onPulling:function(){
			// 	this.refresherTriggered = true;
			// },
			//下拉刷新被触发 
			onRefresh:function(){
				// this.refresherTriggered = false;
				console.log("刷新。。。");
				this.$emit('onRefresh',{})
			},
			//上拉加载
			onScrolltolower:function() {
				console.log("加载。。。");
				this.$emit('onScrolltolower',{})
			},
			//取消搜索事件
			clearSearchFunction:function(){
				this.searchValue = "";
			},
			// 开始搜索
			onSearch:function(){
				console.log("searchValue:"+this.searchValue)
				this.$emit('onSearch',this.searchValue);
			}
		},
		computed: {
			// style() {
			// 	var StatusBar= this.StatusBar;
			// 	var CustomBar= this.CustomBar;
			// 	var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
			// 	if (this.bgImage) {
			// 		style = `${style}background-image:url(${bgImage});`;
			// 	}
				
			// 	console.log("style:"+JSON.stringify(style))
			// 	return style
			// }
		},
	}
</script>

<style>
</style>
