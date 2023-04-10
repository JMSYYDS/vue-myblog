<template>
  <div class="register">
		<div style="margin-top:15%"></div>
    <div class="register_box">
    <div class="register_text">
        <!-- <div>用户名:</div> -->
        <input
				type="text"
        placeholder="用户名"
        v-model="username"
        />
    </div>
    <div class="register_text">
        <!-- <div>密码:</div> -->
        <input
				type="password"
        placeholder="密码"
        v-model="password"
        />
    </div>
    <div class="register_text">
        <!-- <div>确认密码:</div> -->
        <input
				type="password"
        placeholder="确认密码"
        v-model="password2"
        @blur="pass2"
        />
    </div>
    <div class="register_text">
        <!-- <div>手机号:</div> -->
        <input
        placeholder="手机号"
        v-model="mobile"
        @blur="mobile_tip"
        />
    </div>

    
    <div>
        <el-button type="success" round class="res_bt" @click="register">立即注册</el-button>
    </div>
    <p v-show="tip" style="font-size: 14px;color: red;">{{ error_tip }}</p>
    <p class="go_login" @click="go_login">已有账号，前去登录</p>
		<em v-show="error_pass_tip" class="er1">两次密码不一致</em>
    <em v-show="error_mobile_tip" class="er2">请输入正确的手机号</em>
    </div>
  </div>
</template>

<script>
import {Register} from '@/api/user'
export default {
    data() {
        return {
            username: '',
            password: '',
            password2: '',
            mobile: '',
            error_pass_tip: false,
            error_mobile_tip: false,
            tip: false,
            error_tip: ''
        }
    },
    methods: {
        async register () {
            if((this.username != '') && (this.pass2()) && (this.mobile_tip())){
                let data = {
                    username: this.username,
                    password: this.password,
                    mobile: this.mobile
                }
                let register_data = await Register(data)
                if(register_data.state == 'OK'){
                    localStorage.setItem('token', register_data.username)
                    localStorage.setItem('mobile', this.mobile)
                    this.$store.commit('setus', true)
                    this.tip = false
                    this.$router.push('/home')
                    this.$router.go(0)
                }
                else{
                    this.error_tip = register_data.tip
                    this.tip = true
                }
                // this.$axios.post('api/register/', params).then(response => {
                //     if(response.data.state == 'OK'){
                //         localStorage.setItem('token', response.data.username)
                //         this.$store.commit('setus', true)
                //         this.tip = false
                //         this.$router.push('/home')
                //         this.$router.go(0)
                //     }
                //     else{
                //         this.error_tip = response.data.tip
                //         this.tip = true
                //     }
                // })              
            }
            else{
                this.error_tip = '请输入正确信息'
								this.$message.warning('请输入正确信息')
            }
        },
        pass2 () {
            if(this.password != this.password2){
                this.error_pass_tip = true
                if(this.password === '' && this.password2 === ''){
                    return false
                }
                return false
            }
            else{
                this.error_pass_tip = false
                return true
            }
        },
        mobile_tip () {
            if(this.mobile.length == 11){
                this.error_mobile_tip = false
                return true
            }
            else{
                this.error_mobile_tip = true
                return false
            }
        },
        go_login() {
            this.$router.push('/login')
        }
    },
}
</script>

<style scoped>
    .register{
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        height: 100%;
        position: absolute;
        background-image: url('../assets/aaa.png');
        background-size: cover;
    }
    .res_bt{
        margin-top: 15px;
        width: 250px;
        background: linear-gradient(90deg, #85e9e2 3%, #e79bee 97%);
        box-shadow: 0px 2px 10px 0px rgba(0, 172, 153, 0.4);
        border: none;
        cursor: pointer;
    }
    .er1{
        position: relative;
        left: 270px;
        top: -210px;
        font-size: 14px;
        color: red;
        display: inline-block;
    }
    .er2{
        position: relative;
        left: 270px;
        top: -155px;
        font-size: 14px;
        color: red;
        display: block;
    }
    .register_box{
        width: 380px;
        margin: auto;
    }
    .register_text{
        margin-bottom: 20px;
    }
		.register_text input{
			border: 1px solid white;
      border-radius: 25px;
			height: 45px;
			width: 250px;
			margin-top: 5px;
			padding-left: 10px;
			border-radius: 20px;
			box-sizing: border-box;
			cursor: pointer;
			outline: none;
			background-color: transparent;
		}
		.register_text input:focus{
        border: 1px solid rgb(229, 148, 211);
    }
		.go_login{
			margin-top: 15px;
			font-size: 14px;
		}
    .go_login:hover{
        cursor: pointer;
        color: white;
    }
</style>