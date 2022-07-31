<template>
  <div class="box_top">
      <div class="box_in">
        <div class="box_left">
            <a href="#/home">主页</a>
        </div>
        <div class="box_right">
            <a href="#/person">个人简历</a>
            <a href="#/cartoon">漫画</a>
            <a href="#/user">个人中心</a>
            <a href="#/community">社区</a>
            <a href="#/register" v-if="!$store.state.user">注册</a>
            <a href="#/login" v-if="$store.state.user">切换账号</a>
            <a href="#/login" v-else>登录</a>
        </div>
      </div>
      <el-dropdown class="user_show" v-if="$store.state.user">
        <div>
            <el-col :span="12">
            <div class="demo-basic--circle">
                <div class="block">
                    <el-avatar :size="40" :src="imageUrl"></el-avatar>
                </div>
            </div>
            </el-col>
            <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>退出登录</el-dropdown-item> -->
            <div class="aa">
                <a href="#/user">个人中心</a>
            </div>
            <div class="aa">
                <a href="javascript:">编辑信息</a>
            </div>
            <div class="aa">
                <a href="#/home" @click="outlogin">退出登录</a>
            </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>

<script>
import {LoginOut, GetHeadImg} from '@/api/user'
export default {
    data() {
        return {
            imageUrl: ''
        }
    },
    methods: {
        async outlogin () {
            let data = await LoginOut()
            if(data.state == 'OK'){
                localStorage.removeItem('token')
                this.$store.commit('setus', false)
                this.$router.go(0)
            }
        },
    },
    async mounted() {
        if(localStorage.getItem('token')){
            this.$store.commit('setus', true)
            let data = await GetHeadImg({
                username: localStorage.getItem('token')
            })
            if(data.state == 'OK'){
                this.imageUrl = data.img_data
            }else{
                console.log("hh")
                this.imageUrl = 'https://img2.baidu.com/it/u=3035872156,255770104&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500'
            }
        }
        else{
            this.$store.commit('setus', false)
        }
    }
}
</script>

<style>
    .box_top {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 90px;
        background-color: white;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .user_show{
        float: right;
        cursor: pointer;
        left: 180px;
    }
    .el-icon-arrow-down{
        position: relative;
        font-size: 20px;
        left: 10px;
        top: 10px;
    }
    .user_show h3 {
        font-size: 19px;
        color: purple;
    }
    .aa{
        margin-bottom: 10px;
        font-size: 16px;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 10px;
    }
    .aa a{
        color: gray;
        text-decoration: none;
    }
    .aa a:hover{
        color: purple;
    }
    .box_in {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        width: 940px;
        height: 90px;
    }
    .box_right a {
        text-decoration: none;
        font-size: 20px;
        margin: 20px;
        color: gray;
    }
    .box_left a {
        color: purple;
        text-decoration: none;
        font-size: 20px;
        margin: 20px;
    }
    .box_top a:nth-child(1){
        align-self: flex-start;
    }
    .box_top a:hover{
        color: purple;
    }
</style>