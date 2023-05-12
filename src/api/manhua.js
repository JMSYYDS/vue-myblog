import requests from './index'

// 获取所有漫画的信息
export const AllCartoon = () => {
    return requests({
        url: '/main_cartoon/',
        method: 'get'
    })
}

// 获取分类漫画信息
export const TypeCartoon = () => {
    return requests({
        url: '/get_type/',
        method: 'get'
    })
}

// 获取漫画展示的介绍信息
export const ZhanshiCartoon = (data) => {
    return requests({
        url: '/main_cartoon/',
        method: 'post',
        data
    })
}

// 获取漫画资源图片
export const GetImgs = (data) => {
    return requests({
        url: '/get_imgs/',
        method: 'post',
        data
    })
}

// 收藏漫画
export const AddLove = (data) => {
    return requests({
        url: '/love_car/',
        method: 'post',
        data
    })
}

// 获取收藏
export const GetLove = (data) => {
    return requests({
        url: '/get_love/',
        method: 'post',
        data
    })
}

// 获取浏览历史
export const GetHistory = (data) => {
    return requests({
        url: '/get_history/',
        method: 'post',
        data
    })
}

// 获取本地所有漫画信息
export const AllLocalCartoon = () => {
    return requests({
        url: '/local_get_cartoon/',
        method: 'get'
    })
}
