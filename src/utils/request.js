import axios from 'axios'
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
}, function () {

})
export default axios
