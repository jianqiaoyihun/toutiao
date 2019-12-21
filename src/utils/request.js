import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// axios 请求拦截注入headers  token令牌
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})

// axios 响应拦截，过滤数据
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  console.log(error)
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '手机号或者验证码错误'
      break
    case 403:
    // 如果同样的状态码 但是不同意思 => 需要通过 请求地址来判断是哪个的响应  请求地址 + 状态码 一起来判断 怎么处理
      // resfehtoken 过期 强制跳转到登录页 resfehtoken => 是用来换取 token的
      // this.$router => 路由实例对象
      window.localStorage.removeItem('user-token')
      router.push('/login')
      break
    case 401:
      // token过期
      window.localStorage.removeItem('user-token')// 删除令牌
      router.push('/login') // 强制回登录
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ type: 'warning', message }) // 提示消息
})
export default axios
