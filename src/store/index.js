// 该文件用于创建vuex中的store

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 用于响应组件中的动作
const actions = {}
// 用于操作数据
const mutations = {
    setuser(state, value){
        state.username = value
    },
    setmobile(state, value){
        state.mobile = value
    },
    setus(state, value){
        state.user = value
    },
    setmanhua(state, value){
        state.manhua = value
    },
    setindex(state, value){
        state.index = value
    },
    settemp(state, value){
        state.temp = value
        sessionStorage.setItem('temp', value)
    },
    setpage_title(state, value){
        state.page_title = value
    },
}
// 用于存储数据
const state = {
    // 当前漫画缓存数据
    manhua: [],
    // 当前漫画索引
    index: parseInt(localStorage.getItem('index')),
    // 记录倒序正序,默认倒序
    temp: false,
    username: localStorage.getItem('token'),
    user: false,
    mobile: '',
    page_title: []
}
// 用于将state中的数据进行加工
const getters = {
    
}

// 创建并导出store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})