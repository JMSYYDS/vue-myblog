<template>
    <div class="login_img">
        <div class="box_login">
            <div style="margin-top:100%"></div>
            <p style="color: red;" v-show="error_tip">密码或手机号错误</p>
            <div class="login_text">
                <!-- <div>手机号:</div> -->
                <div>
                    <input type="text" placeholder="手机号" v-model="mobile" readonly onfocus="this.removeAttribute('readonly');">
                </div>
            </div>
            <div class="login_text">
                <!-- <div>密码:</div> -->
                <div>
                    <input type="password" placeholder="密码" v-model="password">
                </div>
            </div>
            <!-- <button @click="login" class="login_bt">登录</button> -->
            <el-button @click="login" round>登 录</el-button>
            <!-- <button @click="remove">重置</button> -->
            <div>
                <a href="#/register" class="resg">没有账号?前去注册</a>
            </div>
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
            if(this.mobile != '' || this.password != ''){
                let data = {
                    username: this.mobile,
                    password: this.password,
                }
                let login_data = await Login(data)
                if(login_data.state == 'OK'){
                    localStorage.setItem('token', login_data.username)
                    localStorage.setItem('mobile', this.mobile)
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
        /* color: white; */
        border: 1px solid white;
        border-radius: 25px;
        height: 45px;
        width: 250px;
        margin-top: 15px;
        padding-left: 10px;
        border-radius: 20px;
        box-sizing: border-box;
        cursor: pointer;
        outline: none;
        background-color: transparent;
    }
    .box_login input:focus{
        border: 1px solid rgb(148, 229, 216);
    }
    .box_login{
        width: 300px;
        margin-left: auto;
        margin-right: auto;
    }
    .box_login button{
        margin-top: 25px;
        width: 250px;
        background: linear-gradient(90deg, #85e9e2 3%, #e79bee 97%);
        box-shadow: 0px 2px 10px 0px rgba(0, 172, 153, 0.4);
        border: none;
        cursor: pointer;
    }
    .box_login span{
        color: white;
    }
    .login_img {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        height: 100%;
        position: absolute;
        background-image: url('../assets/loginbck.jpg');
        background-size: cover;
    }
    .resg{
        display: block;
        margin-top: 10px;
        text-decoration: none;
        font-size: 14px;
        color: white;
    }
    .resg:hover{
        color: black;
    }
    .login_text{
        
    }
    .login_text div{
        width: 300px;
    }
</style>