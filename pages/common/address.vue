<template>
	<base-view ref="baseView">
		<view class="flex justify-center bg-white padding">
			<scroll-view 
				:style="{height:phoneHeight+'px'}"
				:scroll-into-view="'tab_'+selectProvinceIndex" 
				scroll-y="true" 
				v-if="provinces.length>0">
				
				<view
					:id="'tab_'+index"
					:class="selectProvinceIndex===index?'text-red':''" 
					v-for="(item,index) in provinces" 
					@tap="onChangeProvince(item,index)" 
					:key="index" 
					class="padding-sm">
					{{item.Name}}
				</view>
			</scroll-view>
			
			<scroll-view 
				:style="{height:phoneHeight+'px'}"
				:scroll-into-view="'tab_'+selectCityIndex"
				scroll-y="true" 
				v-if="citys.length>0">
				<view 
					:id="'tab_'+index"
					:class="selectCityIndex===index?'text-red':''"
					v-for="(item,index) in citys" 
					@tap="onChangeCity(item)"
					:key="index" 
					class="margin">
					{{item.Name}}
				</view>
			</scroll-view>
		</view>
	</base-view>
</template>

<script>
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import * as type from '../../common/config.js';
	
	export default{
		data(){
			return{
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				phoneHeight:this.phoneHeight,
				selectProvinceIndex:0,
				selectCityIndex:-1,
				// 选择省
				selectProvincePosition:"",
				// 城市选择接口参数
				Parent:"",
				selectCityPosition:"贵阳市",
				provinces:[],
				citys:[],
			}
		},
		computed:{
			...mapState({
				currentProvince: state => state.common.currentProvince,
				currentCity: state => state.common.currentCity,
			})
		},
		mounted() {
			this.queryCityList();
		},
		methods:{
			...mapActions({
				Post:"common/"+type.PUBLIC_POST,
				Get:"common/"+type.PUBLIC_GET,
			}),
			onChangeProvince:function(item,index){
				this.selectProvinceIndex = index;
				this.Parent = item.Code;
				this.selectProvincePosition = item.Name;
				this.queryCityList();
			},
			onChangeCity:function(item){
				this.isShowPicker = false;
				this.Parent = item.Code;
				this.selectCityPosition = item.Name;
				
				// 存到vuex里面
				this.$store.dispatch("common/"+type.SET_ADDRESS,item,{root:true});
				uni.navigateBack();
			},
			// 省市区三级地区查询
			queryCityList:async function(){
				let Parent = this.Parent;
				let params = {
					api:type.MCQueryCityNameByCode,
					param:{
						Parent
					}
				}
				try{
					const result = await this.Post(params);
					if(Parent === ''){
						this.provinces = result;
					}else{
						this.citys = result;
					}
				}catch(e){
					console.log("异常",e)
					this.$refs.baseView.showToast({title:e,'icon':'none'});
				}
			}
			
		}
	}
</script>

<style>
</style>
