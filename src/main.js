// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import config from '@/config'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import PageHeader from '_c/page-header'
import Operation from '_c/operation'

Vue.use(iView)
// 自定义页面头按钮组件
Vue.component('PageHeader', PageHeader)
// 表格操作按钮
Vue.prototype.$Operation = Operation
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
