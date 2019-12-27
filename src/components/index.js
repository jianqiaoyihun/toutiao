import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadcrumb from './common/bread-crumb'
import heimaDate from './common/heima-date'
import coverImage from './publish/cover-image'
import uploadImage from './publish/upload-image'
// 所有自定义组件的插件
export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside) // 注册 左侧导航组件
    Vue.component('layout-header', layoutHeader) // 注册头部组件
    Vue.component('bread-crumb', breadcrumb)// 注册面包屑组件
    Vue.component('cover-image', coverImage)// 注册上传图片功能组件
    Vue.component('upload-image', uploadImage)
    Vue.component('heima-date', heimaDate)
  }
}
