<template>
    <div class="login_img">
        <div class="box_login">
            <p style="color: red;" v-show="error_tip">密码或用户名错误</p>
            <div class="login_text">
                <div>手机号:</div>
                <div>
                    <input type="text" placeholder="手机号" v-model="mobile" readonly onfocus="this.removeAttribute('readonly');">
                </div>
            </div>
            <div class="login_text">
                <div>密码:</div>
                <div>
                    <input type="password" placeholder="密码" v-model="password">
                </div>
            </div>
            <button @click="login">登录</button>
            <button @click="remove">重置</button>
            <br>
            <a href="#/register" class="resg">没有账号?前去注册</a>
        </div>
    </div>
</template>
<script>
import {Login} from '@/api/user'
export default {
    data(){
        return {
            mobile: '',
            password: '',
            error_tip: false
        }
    },
    methods: {
        async login() {
            if(this.username != '' || this.password != ''){
                let data = {
                    username: this.mobile,
                    password: this.password,
                }
                let login_data = await Login(data)
                if(login_data.state == 'OK'){
                    localStorage.setItem('token', login_data.username)
                    this.$store.commit('setus', true)
                    this.error_tip = false
                    this.$router.push('/home')
                    this.$router.go(0)
                }
                else{
                    this.error_tip = true
                }
            }else{
                this.error_tip = true
            }
            
            // this.$axios.post('api/login/', parms).then(response => {
            //     if(response.data.state == 'OK'){
            //         localStorage.setItem('token', response.data.username)
            //         this.$store.commit('setus', true)
            //         this.error_tip = false
            //         this.$router.push('/home')
            //         this.$router.go(0)
            //     }
            //     else{
            //         this.error_tip = true
            //     }
            // }).catch(error => {
            //     console.log(error)
            // })
        },
        remove() {
            this.mobile = ''
            this.password = ''
        }
    },
    mounted() {
        let islogin = sessionStorage.getItem("isLogin")
        if(islogin === "false"){
            this.$message({
                showClose: true,
                message: '请先登录',
                type: 'error'
            });
        }
        sessionStorage.setItem("isLogin", true)
    },
}
</script>
<style>
    .box_login input{
        border-radius: 5px;
        height: 35px;
        width: 250px;
        margin-top: 15px;
        padding-left: 5px;
        cursor: pointer;
        outline: none;
    }
    .box_login input:focus{
        border: 2px solid rgb(212, 28, 160);
    }
    .box_login{
        margin-left: auto;
        margin-right: auto;
        padding: 200px;
    }
    .box_login button{
        margin-top: 15px;
        margin-left: 60px;
        width: 70px;
        height: 30px;
        color: purple;
        cursor: pointer;
    }
    .box_login button:hover{
        background-color: rgb(225, 63, 225);
        color: white;
    }
    .login_img {
        width: 100%;
        height: 800px;
        background-image: url('../assets/3.jpg');
        background-size: 100% 100%;
    }
    .resg{
        display: block;
        margin-top: 10px;
        margin-left: 20px;
        text-decoration: none;
        font-size: 14px;
        color: white;
    }
    .resg:hover{
        color: purple;
    }
    .login_text{
        display: flex;
        justify-content: center;
        width: 360px;
        margin-left: 390px;
    }
    .login_text div:nth-child(1){
        width: 60px;
        text-align: right;
        padding-top: 20px;
    }
    .login_text div:nth-child(2){
        width: 300px;
    }
</style>