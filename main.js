import Vue from 'vue'
import App from './App'

import home from './pages/home/index.vue'
Vue.component('home',home)

import mine from './pages/mine/index.vue'
Vue.component('mine',mine)

import message from './pages/message/index.vue'
Vue.component('message',message)

import baseView from './components/base-view.vue'
Vue.component('base-view',baseView)

import listView from './components/list-view.vue'
Vue.component('list-view',listView)

import inputView from './components/input-view.vue'
Vue.component('input-view',inputView)

// 引入时间选择器组件
import pickerTime from './components/pickerTime/picker-time.vue'
Vue.component('picker-time',pickerTime)

// 引入顶部弹窗组件
import topTips from './components/top-tips.vue'
Vue.component('top-tips',topTips)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



