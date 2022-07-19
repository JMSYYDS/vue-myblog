// 当前项目的路由模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import bckimg from '@/view/bckImg'
import login from '@/view/Login'
import myself from '../view/myself.vue'
import user from '../view/user.vue'
// 社区
import about from '../view/about.vue'
import title from '../view/community/title.vue'
import content from '../view/community/content.vue'
// 漫画
import register from '../view/register.vue'
import cartoon from '../view/cartoon.vue'
import main from '../view/manhua/main.vue'
import book from '../view/manhua/zhanshi.vue'
import details from '../view/manhua/xiangxi.vue'

// VueRouter 安装为 Vue 的插件
Vue.use(VueRouter)

// 创建路由的实例对象
const router = new VueRouter({
    // 一个数组，定义hash地址与组件的对应关系
    // 路由规则
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: bckimg},
        {path: '/login', component: login},
        {path: '/person', component: myself},
        {path: '/user', component: user},
        {path: '/community', component: about, children: [
            {path: '', redirect: 'title'},
            {path: 'title', component: title},
            {path: 'content/:id', component: content, props: true}
        ]},
        {path: '/register', component: register},
        {path: '/cartoon', component: cartoon, children: [
            // 子路由
            {path: '', redirect: 'main'},
            {path: 'main', component: main},
            {path: 'book/:id', component: book, props: true},
            {path: 'detail/:idx/:passage', component: details, props: true}
        ]},
    ]
})

// 为router实例对象声明全局前置导航守卫
// 只要发生了路由的跳转，必然会触发这个回调函数
router.beforeEach((to, from, next) => {
    // to是将要访问的路由
    // from 是将要离开的路由
    // next 是一个函数，调用next() 表示放行，允许这次路由导航

    if(to.path === '/user'){
        const token = localStorage.getItem('token')
        if(token){
            next()
        }else{
            next('/login')
        }   
    }else{
        next()
    }
})

router.afterEach((to, from, next) => {
    window.scrollTo(0,0);
})

export default router
