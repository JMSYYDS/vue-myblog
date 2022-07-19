<template>
<div>
    <div class="tl" v-for="item in page" :key="item.id">
        <div class="tl_in">
            <a :href="'#/community/content/'+item.id" class="title">{{ item.title }}</a>
            <span>{{ item.time }}</span>
            <p>{{ item.show_pag }}</p>
            <a :href="'#/community/content/'+item.id">
                <el-button type="primary" plain :loading="loading" @click="read" style="margin-top: 30px;">阅读更多</el-button>
            </a>
        </div>
  </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            page: [
                {
                    id: 1,
                    title: 'Python Django项目的简单创建',
                    time: '2022年6月23日',
                    show_pag: '1.首页需要在python3环境下安装Django, 命令为：pip install django 默认是安装最新版本的Django 然后就可以使用命令创建Django工程，django-admin....'
                },
                {
                    id: 2,
                    title: 'Python实现矩阵相乘和回形取数（附代码）',
                    time: '2022年6月27日',
                    show_pag: '问题描述:给定一个N阶矩阵A，输出A×A'
                }
            ]
        }
    },
    methods: {
        read() {
            this.loading = true
            // this.$router.push('/community/content')
        }
    },
    created() {
        this.$store.commit('setpage_title', this.page)
    },
}
</script>

<style scoped>
    .tl{
        min-height: 380px;
        margin: 15px;
        background-color: white;
    }
    .title{
        display: block;
        margin-top: 50px;
        margin-bottom: 20px;
        color: black;
        font-size: 30px;
        text-decoration: none;
    }
    .tl span{
        color: gray;
    }
    .tl p{
        margin: 20px;
        font-size: 17px
    }
    .tl_in{
        padding-top: 10px;
    }
</style>