<template>
  <div class="register">
    <div class="register_box">
    <div class="register_text">
        <div>用户名:</div>
        <el-input
        placeholder="用户名"
        v-model="username"
        clearable
        >
        </el-input>
    </div>
    <div class="register_text">
        <div>密码:</div>
        <el-input
        placeholder="密码"
        v-model="password"
        clearable
        show-password
        >
        </el-input>
    </div>
    <div class="register_text">
        <div>确认密码:</div>
        <el-input
        placeholder="确认密码"
        v-model="password2"
        clearable
        show-password
        @blur="pass2"
        >
        </el-input>
    </div>
    <div class="register_text">
        <div>手机号:</div>
        <el-input
        placeholder="手机号"
        v-model="mobile"
        clearable
        @blur="mobile_tip"
        >
        </el-input>
    </div>
    <!-- <div>
        <i>用户名：</i>
        <el-input
        placeholder="用户名"
        v-model="username"
        clearable
        class="in_user"
        >
        </el-input>
    </div>
    <div>
        <i>密码：</i>
        <el-input
        placeholder="密码"
        v-model="password"
        clearable
        show-password
        class="in_pas"
        >
        </el-input>
    </div>
    <div>
         <i>确认密码：</i>
        <el-input
        placeholder="确认密码"
        v-model="password2"
        clearable
        show-password
        class="in_pas"
        @blur="pass2"
        >
        </el-input>
        
    </div>
    <div>
        <i>手机号：</i>
        <el-input
        placeholder="手机号"
        v-model="mobile"
        clearable
        class="in_pas"
        @blur="mobile_tip"
        >
        </el-input>
        
    </div> -->
    <em v-show="error_pass_tip" class="er1">两次密码不一致</em>
    <em v-show="error_mobile_tip" class="er2">请输入正确的手机号</em>
    <el-button type="success" class="res_bt" @click="register">立即注册</el-button>
    <p v-show="tip" style="font-size: 14px;color: red;">{{ error_tip }}</p>
    <p class="go_login" @click="go_login">已有账号，前去登录</p>
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
                this.tip = true
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
        height: 800px;
        background-image: url('../assets/5.png');
        background-size: 100% 100%;
    }
    .res_bt{
        margin-bottom: 10px;
    }
    .er1{
        position: absolute;
        left: 950px;
        top: 370px;
        font-size: 14px;
        color: red;
    }
    .er2{
        position: absolute;
        left: 950px;
        top: 430px;
        font-size: 14px;
        color: red;
    }
    .register_box{
        padding-top: 150px;
    }
    .register_text{
        display: flex;
        justify-content: flex-start;
        margin-left: 36%;
        margin-bottom: 20px;
    }
    .register_text div:nth-child(1){
        text-align: right;
        padding-top: 10px;
        width: 100px;
    }
    .register_text div:nth-child(2){
        margin-left: 10px;
        width: 280px;
    }
    .go_login:hover{
        cursor: pointer;
        color: purple;
    }
</style>