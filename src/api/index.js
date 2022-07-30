import axios from 'axios'

// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// requests就是axios
const requests = axios.create({
    // 配置对象
    baseURL: "/api",
    // 请求超时的时间
    timeout: 5000,
})

requests.interceptors.request.use((config) => {
    // 进度条开始动
    nprogress.start()
    // config 配置对象,对象里有一个属性很重要,header请求头
    return config
})
// 响应拦截器
requests.interceptors.response.use((res) => {
    // 这是服务器成功的回调函数
    // 进度条结束
    nprogress.done()
    return res.data
}, (error) => {
    // 服务器响应失败的回调函数
    return Promise.reject(new Error('failed'))
})
export default requests
