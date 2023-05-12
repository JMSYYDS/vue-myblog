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

// 退出登录
export const LoginOut = () => {
    return requests({
        url: '/login_out/',
        method: 'get'
    })
}

// 上传头像
export const UploadHeadImg = (data) => {
    return requests({
        url: '/upload_img/',
        method: 'post',
        data
    })
}

// 获取头像
export const GetHeadImg = (data) => {
    return requests({
        url: '/get_img/',
        method: 'post',
        data
    })
}

// 爬取漫画下载
export const setCartoon = () => {
    return requests({
        url: '/set_cartoon/',
        method: 'get',
    })
}

// 修改密码
export const UpdatePassword = (data) => {
    return requests({
        url: '/update_password/',
        method: 'post',
        data
    })
}
