import requests from './index'

// 登录
export const Login = (data) => {
    return requests({
        url: '/login/',
        method: 'post',
        data
    })
}

// 注册
export const Register = (data) => {
    return requests({
        url: '/register/',
        method: 'post',
        data
    })
}
