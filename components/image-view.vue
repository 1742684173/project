<template name="image-view">
	<view>
		<view class="cu-bar">
			<view class="action">
				<text v-if="isMust" style="color:red">*</text>
				{{title}}
			</view>
			<!-- <view class="action">{{imgList.length}}/{{maxCount}}</view> -->
		</view>
		<view class="padding-lr">
			
			<view class="bg-white radio" style="position: relative;height: 300upx;">
				<view @tap="chooseImage">
					<image v-if="imgSrc != ''" mode="scaleToFill" :src="imgSrc" style="height: 300upx;width:100%">
					</image>
					<view v-if="imgSrc == ''" class="flex justify-center align-center" style="height: 300upx;width:100%">
						<view  class='cuIcon-add'></view>
					</view>
					
					<view class="cu-progress" style="position: absolute;height: 300upx;top:0;left:0;bottom:0;right:0;background-color: #00000000;">
						<view :style="[{ width:progress?progress+'%':'',backgroundColor: progress===100?'#00000000':'#80d1d1d1'}]" style="height: 300upx;">
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>
<script>
export default {
	name: "image-view",
	//属性
	props: {
		uniKey: {
			type: String,
			default:""
			//requied:false
		},
		progress: {
			type: Number,
			default:0
			//requied:false
		},
		//是否是必需输入
		isMust: {
			type: Boolean,
			default:false
			//requied:false
		},
		//标题
		title: {
			type: String,
			default:""
		}
	},
	data(){
		return{
			// imgList:[]
			imgSrc:""
		}
	},
	//组件生命周期
	created:function(e){
		
	},
	
	methods: {
		//照片选择
		chooseImage(){
			console.log(this.progress)
			if(this.progress > 0 && this.progress <100) return;
			
			let _self = this;
			uni.chooseImage({
				count:1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				//sourceType: ['album','camera'], //从相册和相机选择
				success: (res) => {
					_self.imgSrc = res.tempFilePaths[0];
					_self.$emit('chooseImage',{uniKey:_self.uniKey, imgSrc:_self.imgSrc})
				}
				
			});
		},
	}
}
</script>
<style>
</style>