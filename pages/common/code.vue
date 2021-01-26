<template>
	<base-view class="" ref="baseView" @onNetRefresh="onNetRefresh">
		<view v-show="isShowQrCode1" class="flex justify-center align-center margin-tb">
			<image :src="qrcodeBase64">
			</image>
		</view>
		
		<view class="flex flex-direction justify-between padding">
			<button v-if="isShowQrCode1" class="cu-btn bg-brown lg margin-top" @click="saveCode">保存二维码</button>
		</view>
	</base-view>
				
</template>

<script>
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import * as type from '../../common/config.js';
	export default {
		onLoad(e){
			console.log("onLoad",e.param)
			this.param = JSON.parse(e.param);
			this.makeCode();
		},
		mounted(){
			// this.makeCode();
		},
		data: function(){
			return {
				isShowQrCode1:false,
				qrcodeBase64:"",
				param:{}
			}
		},
		computed:{
			...mapState({
				pic: state => state.common.pic,
				loginInfo: state => state.user.loginInfo,
				wxUserInfo: state => state.user.wxUserInfo,
			})
		},
		methods: {
			...mapActions({
				Post:"common/"+type.PUBLIC_POST,
				Get:"common/"+type.PUBLIC_GET,
			}),
			// 生成小程序码
			async makeCode(){
				this.qrcodeBase64 = "";
				this.$refs.baseView.showLoad();
				try{
					let params = {
						api:type.QRCodeImgApply,
						param:this.param
					}
					
					const result = await this.Post(params);
					console.log("result.QRCodeImg",result)
					this.qrcodeBase64 = result.QRCodeImg.replace(/[\r\n]/g,"");
					console.log("qrcodeBase64",this.qrcodeBase64);
					
					this.isShowQrCode1 = true;
					this.$refs.baseView.hideModel();
				}catch(e){
					console.log("e",e);
					this.$refs.baseView.showToast({title:e,'icon':'none'});
				}
			},
			async saveCode(){
				try{
					this.$refs.baseView.showLoad();
					let filePath = await this.$store.dispatch("common/"+type.BASE64_2_PATH,this.qrcodeBase64.replace(/^data:image\/\w+;base64,/,""));
					await this.$store.dispatch("common/"+type.SAVE_PIC,filePath);
					 
					this.$refs.baseView.showToast({title:"保存成功",type:'success',duration:3000});
				}catch(e){
					this.$refs.baseView.showToast({title:e,'icon':'none'});
				}
			}
		}
	}
</script>

<style>
	
</style>