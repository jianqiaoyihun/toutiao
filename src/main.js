import Vue from 'vue'
import App from './App.vue'
import './permission'
import router from './router'
import ElementUI from 'element-ui'

import Component from './components/index.js'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less' // 引入样式
import axios from './utils/request.js'

import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
