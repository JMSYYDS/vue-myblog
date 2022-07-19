<template>
    <div class="login_img">
        <div class="box_login">
            <p style="color: red;" v-show="error_tip">密码或用户名错误</p>
            <em>手机号：</em>
            <input type="text" placeholder="手机号" v-model="mobile">
            <br>
            <em>密码：</em>
            <input type="text" placeholder="密码" v-model="password">
            <br>
            <button @click="login">登录</button>
            <button @click="remove">重置</button>
            <br>
            <a href="#/register" class="resg">没有账号?前去注册</a>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            mobile: '',
            password: '',
            error_tip: false
        }
    },
    methods: {
        login() {
            let parms = {
                username: this.mobile,
                password: this.password,
            }
            this.$axios.post('api/login/', parms).then(response => {
                if(response.data.state == 'OK'){
                    localStorage.setItem('token', response.data.username)
                    this.$store.commit('setus', true)
                    this.error_tip = false
                    this.$router.push('/home')
                    this.$router.go(0)
                }
                else{
                    this.error_tip = true
                }
            }).catch(error => {
                console.log(error)
            })
        },
        remove() {
            this.mobile = ''
            this.password = ''
        }
    }
}
</script>
<style>
    .box_login input{
        height: 30px;
        width: 250px;
        margin-top: 15px;
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
        font-size: 13px;
        color: white;
    }
    .resg:hover{
        color: purple;
    }
</style>