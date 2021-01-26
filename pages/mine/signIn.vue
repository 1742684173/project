<template>
	<base-view ref="baseView">

		<view class="cu-modal" :class="!wxUserInfo.nickName?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">信息提示</view>
				</view>
				<view class="padding-xl">
					需要授权用户信息
				</view>
				<view class="cu-bar bg-white justify-around">
					<button class="flex-sub bg-white" @click="onCancelAuth">取消</button>
					<view style="min-height: 100upx;min-width: 4upx;background-color: #dcdcdc;"></view>
					<button class="flex-sub bg-white" open-type="getUserInfo" @getuserinfo="getuserinfo">授权</button>
				</view>
			</view>
		</view>
		
		<view class="bg-white">
			<image class="wx-photo" :src="wxUserInfo.avatarUrl"></image>
		</view>
				
		<form @submit="faceRecognition"> 
			
			<form @submit="openGetPhoneCode">
				
				<view class="cu-form-group">
					<view class="title">手机号</view>
					<input name="PhoneNumber" placeholder="请输入手机号" :value="initData.CusPhone" maxlength="11" type="number" :disabled="initData.CusPhone"></input>
					<button  :disabled="count<MAX_COUNT" form-type="submit" class="cu-btn round text-red">
						{{count < MAX_COUNT?(count+"s"):"获取验证码"}}
					</button> 
				</view>
				
				<view class="cu-form-group">
					<view class="title">验证码</view>
					<input name="OTPCode" :value="initData.OTPCode" placeholder="请输入验证码" maxlength="6" type="number"></input>
				</view>
			</form> 
			<view class="cu-bar btn-group  margin-top-sm">
				<button form-type="submit" class="cu-btn bg-red shadow-blur round lg">登录</button>
			</view>
		</form>
	</base-view>
</template>

<script>
	import * as PatternCheck from '../../tools/PatternCheck';
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import * as type from '../../common/config.js'
	
	export default {
		components: {
		},
		computed:{
			...mapState({
				wxUserInfo: state => state.user.wxUserInfo,
				ClientInfo: state => state.user.ClientInfo,
			})
		},
		data() {
			return {
				
			}
		},
		onLoad(e) {},
		async mounted() {
			try{
				
				this.$store.commit("user/"+type.ologin,{},{root:true});
				
				// 获取微信缓存信息
				let wxUserInfo = await this.$store.dispatch("common/"+type.getStorageSync, type.wxUserInfoKey);
				console.log("1111",wxUserInfo)
				if(wxUserInfo){
					// 存入stage
					this.$store.dispatch("user/"+type.setWxInfoStage,wxUserInfo);
				}
			}catch(e){
				
			}
		},
		
		methods: {
			...mapActions({
				Post:"common/"+type.PUBLIC_POST,
				Get:"common/"+type.PUBLIC_GET,
			}),
			onCancelAuth(){
				this.$refs.baseView.showToast({title:"需要授权才能进入","icon":"none"});
			},
			//微信授权
			async getuserinfo(e){
				try{
					console.log("e.detail.errMsg",e.detail.errMsg)
					// 拒绝授权
					if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
						//用户决绝授权
						//拒绝授权后弹出一些提示
						this.$refs.baseView.showToast({title:"需要授权才能进入","icon":"none"});
						return;
					} 
					
					//获取微信用户信息
					console.log("rawData1111")
					const rawData = e.detail.userInfo;
					console.log("rawData22",rawData);
					// 存入内存
					this.$store.dispatch("common/"+type.setStorageSync,{key:type.wxUserInfoKey,value:rawData});
					// 存入stage
					this.$store.dispatch("user/"+type.setWxInfoStage,rawData);
					this.$refs.baseView.hideModel();
				}catch(e){
					console.log("异常",e);
					this.$refs.baseView.showToast({title:""+e,"icon":"none"});
				}
			},
			
			// 验证码验证
			async sendCode(res){
				
				try{
					// 显示加载框
					this.$refs.baseView.showLoad();
					
					// 微信登录获取微信code
					this.WexinId = await this.$store.dispatch("user/"+type.WE_CHAT_LOGIN,{});
					
					
					
					let params = {
						api:type.OTPLoginPre,
						param:Object.assign(this.sendCodeParams,{
							WexinId: this.WexinId,
							ClientInfo: this.ClientInfo, // 目前写死
							IdType: "01", // 目前写死"01"
						})
					}
					console.log("发送验证码的params: " + JSON.stringify(params));
					const {OTPSeq} = await this.Post(params);
					this.OTPSeq = OTPSeq;
					console.log("this.OTPSeq",this.OTPSeq);
					// 加锁
					this.lockSendCode = true;
					this.$refs.baseView.showToast({title:"验证码发送成功",type:'success',duration:3000});
					this.sendCodeCount();
				}catch(e){
					console.log("catch",e);
					this.$refs.baseView.showToast({title:e,icon:"none"})
				}
			},
			// 倒计时
			sendCodeCount(){
				let _this = this;
				_this.interval = setInterval(function(){
					_this.count --;
					// console.log("_this.count", _this.count)
					if(_this.count === 0){
						console.log(_this.count)
						_this.count = _this.MAX_COUNT;
						_this.lockSendCode = false;
						// 重置极验
						_this.captcha.toReset = true;
						clearInterval(_this.interval)
					}
				},1000)
			},
			
			// 登录
			async login(e) {
				console.log(e.detail.value)
				let {UserName,IDNo,PhoneNumber,OTPCode} = e.detail.value;
				
				if (this.initEncryptData.CusName) {
					UserName = this.initEncryptData.CusName;
				}
				if (this.initEncryptData.CusIDNo) {
					IDNo = this.initEncryptData.CusIDNo;
				}
				if (this.initEncryptData.CusPhone) {
					PhoneNumber = this.initEncryptData.CusPhone;
				}
				
				// 用户名检测
				if(PatternCheck.isEmptyStr(UserName)){
					this.$refs.baseView.showToast({title:"姓名不能为空",icon:"none"})
					return;
				}
				
				// 身份证检测
				if(!PatternCheck.isID(IDNo)){
					this.$refs.baseView.showToast({title:"身份证格式不正确",icon:"none"})
					return;
				}
				
				// 手机号检测
				if(!PatternCheck.isTel(PhoneNumber)){
					this.$refs.baseView.showToast({title:"手机号不正确",icon:"none"})
					return;
				}
				
				// 短信序列号判断
				if(PatternCheck.isEmptyStr(this.OTPSeq)){
					this.$refs.baseView.showToast({title:"请获取短信验证码",icon:"none"})
					return;
				}
				
				// 验证码检测
				if(PatternCheck.isEmptyStr(OTPCode)){
					this.$refs.baseView.showToast({title:"请输入验证码",icon:"none"})
					return;
				}
				if(PatternCheck.strLen(OTPCode) != 6){
					this.$refs.baseView.showToast({title:"请输入正确的验证码",icon:"none"})
					return;
				}
				
				// 显示加载框
				this.$refs.baseView.showLoad();
				
				try{
					// 微信登录获取微信code
					// let WexinId = await this.$store.dispatch("user/"+type.WE_CHAT_LOGIN,{});
					let params = { 
						LoginId:PhoneNumber,
						UserName,
						WexinId: this.WexinId,
						OTPCode,
					}
				
					await this.$store.dispatch("user/"+type.ologin,params);
				}catch(e){
					console.log("catch",e);
					
				}
			}
			
			
		},
		onUnload() {
			this.interval?clearInterval(this.interval):null;
		},
	}
</script>

<style>
</style>
