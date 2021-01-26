<!-- 
	使用方式
	<picker-time ref="picker" mode="YMDhms" :startYear="startYear" :endYear="endYear" :defaultValue="defaultValue" @confirm="confirm"/>
	<input @tap="show" placeholder="自动识别并反显"></input>
	1.点击input框调用picker-time底部弹出事件
		show() {
			this.$refs.picker.show();
		},
	mode:Y年 M月 D日 h时 m分 s秒   支持任意连续组合 例如YMD,YMDh
	startYear:设置起始年份
	endYear:设置最终年份 默认当前年份
	defaultValue:默认值 注意要与mode格式对应
	defaultValue: {
		Y: '2020',
		M: '07',
		D: '15',
		h: '16',
		m: '25',
		s: '38'
	},
	confirm:触发选择改变调用
	confirm(e) {
		var arr = e.detail.result;
		if (arr.length == 3) {
			this.bbb = arr.join('/');
		}
		if (arr.length == 6) {
			this.bbb = arr.slice(0,3).join('/') + ' ' + arr.slice(3).join(':');
		}
	},
 -->
<template>
	<view class="e-picker" :style="{'visibility':pickerVisible?'visible':'hidden'}">
		<view class="e-picker-mask" :class="{'e-picker-animation':animation}" :style="{'opacity':pickerVisible?0.6:0}" @tap="_cancel"></view>
		<view class="e-picker-container" :class="{'e-picker-container--show':pickerVisible,'e-picker-animation':animation}">
			<view class="e-picker-action">
				<view class="e-picker-action--cancel" @tap="_cancel">取消</view>
				<view class="e-picker-action--confirm" @tap="_confirm">确定</view>
			</view>
			<picker-view :style="{'height':height+'vh'}" indicator-style="height:40px" :value="value" @change="_change">
				<picker-view-column v-if="mode.includes('Y')" class="e-picker-column">
					<view class="e-picker-list-item" v-for="(item,index) in container['Y']" :key="index">
						{{item+'年'}}
					</view>
				</picker-view-column>
				<picker-view-column v-if="mode.includes('M')" class="e-picker-column">
					<view class="e-picker-list-item" v-for="(item,index) in container['M']" :key="index">
						{{item+'月'}}
					</view>
				</picker-view-column>
				<picker-view-column v-if="mode.includes('D')" class="e-picker-column">
					<view class="e-picker-list-item" v-for="(item,index) in container['D']" :key="index">
						{{item+'日'}}
					</view>
				</picker-view-column>
				<picker-view-column v-if="mode.includes('h')" class="e-picker-column">
					<view class="e-picker-list-item" v-for="(item,index) in container['h']" :key="index">
						{{item+'时'}}
					</view>
				</picker-view-column>
				<picker-view-column v-if="mode.includes('m')" class="e-picker-column">
					<view class="e-picker-list-item" v-for="(item,index) in container['m']" :key="index">
						{{item+'分'}}
					</view>
				</picker-view-column>
				<picker-view-column v-if="mode.includes('s')" class="e-picker-column">
					<view class="e-picker-list-item" v-for="(item,index) in container['s']" :key="index">
						{{item+'秒'}}
					</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
	import utils from './utils.min.js'
	export default {
		name: 'ePickerPlus',
		data() {
			return {
				pickerVisible: false,
				hasError: false,
				container: {},
				value: [],
				isConfirm: false
			}
		},
		props: {
			mode: {
				type: String,
				default: 'YMD'
			},
			height: {
				type: Number,
				default: 35
			},
			animation: {
				type: Boolean,
				default: true
			},
			startYear: {
				type: Number,
				default: 2000
			},
			endYear: {
				type: Number,
				default: () => new Date().getFullYear()
			},
			defaultValue: {
				type: [Boolean, Object],
				default: false
			},
			debug: {
				type: Boolean,
				default: false
			},
			verify: {
				type: Boolean,
				default: false
			},
			errorMsg: {
				type: String,
				default: "选择的时间超过当前时间"
			}
		},
		computed: {
			columns() {
				return this.mode.split('')
			}
		},
		created() {
			try {
				if (this.debug) utils.check(this.mode, this.defaultValue)
				this._initPicker()
			} catch (e) {
				this.hasError = true
				console.error(e)
			}
		},
		methods: {
			show() {
				if (!this.hasError) {
					if (this.isConfirm == false) this._setValue()
					this.pickerVisible = true
				}
			},
			_initPicker() {
				for (const v of this.columns) {
					this.value.push(0)
					this.container[v] = []
				}
				for (const v of this.columns) {
					if (v === 'Y') this.container[v] = utils.getColumn(this.endYear + 1, this.startYear)
					if (v === 'M') this.container[v] = utils.getColumn(13, 1)
					if (v === 'D') this._setDays()
					if (v != 'Y' && v != 'D' && v != 'M') this.container[v] = utils.getColumn(v === 'h' ? 24 : 60)
				}
			},
			_setValue() {
				let dv = this.defaultValue || utils.generateDefaultValue(this.mode)
				this.value = []
				for (const key in dv) {
					this.value.push(this.container[key].indexOf(dv[key]))
				}
			},
			_setDays() {
				const obj = this._getDefaultDays()
				this.container['D'] = utils.getDays(obj.year, obj.month);
			},
			_getDefaultDays() {
				let obj = {
					year: new Date().getFullYear() + "",
					month: new Date().getMonth() + 1 + ""
				}
				if (this._hasValue('YM')) {
					const len1 = this.container['Y'].length,
						len2 = this.container['M'].length
					obj.year = this.value[0] > len1 ? this.container['Y'][len1 - 1] : this.container['Y'][this.value[0]]
					obj.month = this.value[1] > len2 ? this.container['M'][len2 - 1] : this.container['M'][this.value[1]]
				}
				if (this._hasValue('M') && !this._hasValue('Y')) {
					const len = this.container['M'].length
					obj.month = this.value[0] > len ? this.container['M'][len - 1] : this.container['M'][this.value[0]]
				}
				return obj
			},
			_isValue(keyword) {
				return this.mode === keyword
			},
			_hasValue(keyword) {
				return this.mode.includes(keyword)
			},
			_change(e) {
				this.value = e.detail.value
				if (this._hasValue('YMD') || this._hasValue('MD')) {
					this._setDays()
				}
			},
			_confirm(e) {
				this.$emit('confirm', this._getResult(e))
				this.pickerVisible = false
				this.isConfirm = true
			},
			_cancel() {
				this.$emit('cancel')
				this.pickerVisible = false
			},
			_getResult(e) {
				const result = []
				const resultWord = []
				for (let i = 0; i < this.columns.length; i++) {
					result.push(this.container[this.columns[i]][this.value[i]] + "")
					resultWord.push(this.container[this.columns[i]][this.value[i]] + utils.getTitle(this.columns[i]))
				}
				const obj = {
					type: e.type,
					timeStamp: e.timeStamp,
					detail: {
						result,
						resultWord
					}
				}
				let str = utils.resolveResultWord(resultWord, this.mode)
				obj.detail.value = str
				if (this._hasValue('YMD')) obj.detail.timeStamp = utils.timeToTimestamp(str)
				if (this.verify && !utils.verify(str) && (this.mode === 'YMD' || this.mode === 'YMDhms' || this.mode === 'hms')) {
					obj.errorMsg = this.errorMsg
					this._setValue()
				}
				return obj
			}
		}
	}
</script>

<style scoped lang="scss">
	.e-picker {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		font-size: 30rpx;
	}

	.e-picker-container {
		position: fixed;
		bottom: 0;
		transform: translateY(100%);
		z-index: 999;
		width: 100%;
		background-color: #fff;
		visibility: hidden;

	}

	.e-picker-container--show {
		transform: translateY(0);
		visibility: visible;
	}

	.e-picker-mask {
		z-index: 998;
		width: 100%;
		height: 100%;
		background-color: rgb(0, 0, 0);
	}

	.e-picker-animation {
		transition: all 0.3s;
	}

	.e-picker-action {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		box-sizing: border-box;
		position: relative;
		font-size: 32rpx;
		border-bottom: 0.5px solid #e5e5e5
	}

	.e-picker-action--cancel {
		opacity: .7;
	}

	.e-picker-action--confirm {
		color: #007aff;
	}

	.e-picker-column {
		text-align: center;
		border: none
	}

	.e-picker-list-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
	}
</style>
