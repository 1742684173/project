<template name="home">
	<base-view ref="baseView">
		
		
	</base-view>
</template>

<script>
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import * as type from '../../common/config.js';
	export default {
		data() {
			return {
				
				
			}
		},
		computed:{
			...mapState({
				loginInfo: state => state.user.loginInfo,
				wxUserInfo: state => state.user.wxUserInfo,
			})
		},
		async mounted() {
			
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
		},
		onReady() {
			
		}
	}
</script>

<style>
	
</style>
