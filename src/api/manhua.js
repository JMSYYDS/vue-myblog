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
