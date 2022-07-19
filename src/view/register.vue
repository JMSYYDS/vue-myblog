<template>
  <div class="register">
    <i>用户名：</i>
    <el-input
    placeholder="用户名"
    v-model="username"
    clearable
    class="in_user"
    >
    </el-input>
    <br>
    <i>密码：</i>
    <el-input
      placeholder="密码"
      v-model="password"
      clearable
      show-password
      class="in_pas"
    >
    </el-input>
    <br>
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
    <em v-show="error_pass_tip" class="er1">两次密码不一致</em>
    <br>
    <i>请输入手机号：</i>
    <el-input
      placeholder="手机号"
      v-model="mobile"
      clearable
      class="in_pas"
      @blur="mobile_tip"
    >
    </el-input>
    <em v-show="error_mobile_tip" class="er2">请输入正确的手机号</em>
    <br>
    <el-button type="success" class="res_bt" @click="register">立即注册</el-button>
    <p v-show="tip" style="font-size: 14px;color: red;">{{ error_tip }}</p>
  </div>
</template>

<script>
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
        register () {
            if((this.username != '') && (this.pass2) && (this.mobile_tip)){
                let params = {
                    username: this.username,
                    password: this.password,
                    mobile: this.mobile
                }
                this.$axios.post('api/register/', params).then(response => {
                    if(response.data.state == 'OK'){
                        localStorage.setItem('token', response.data.username)
                        this.$store.commit('setus', true)
                        this.tip = false
                        this.$router.push('/home')
                        this.$router.go(0)
                    }
                    else{
                        this.error_tip = response.data.tip
                        this.tip = true
                    }
                })
                
                
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
    .in_user{
        margin-top: 100px;
        width: 300px;
    }
    .in_pas{
        margin-top: 30px;
        width: 300px;
    }
    .in_email{
        margin-top: 30px;
        width: 300px;
    }
    .res_bt{
        margin-top: 30px;
    }
    .er1{
        position: fixed;
        left: 970px;
        top: 340px;
        font-size: 14px;
        color: red;
    }
    .er2{
        position: fixed;
        left: 970px;
        top: 410px;
        font-size: 14px;
        color: red;
    }
</style>