/**
 * 作用: 
 */
<template>
		
		<view class="cu-form-group" :class="isVertical?' flex flex-direction align-start':''">
			
			<text class="title">
				<text style="color: red;">
					{{isMust?"* ":""}}
				</text>
				{{title}}
			</text>
			<slot></slot>
		</view>
	
</template>
<script>
	export default {
		props: ['isMust','title','isVertical'],
	}
</script>

<style>
</style>
