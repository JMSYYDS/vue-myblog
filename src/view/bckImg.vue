<template>
  <div @mousewheel="Wheel" style="height:100%">
    <!-- <el-carousel height="1000px" direction="vertical" :autoplay="false" ref="change" indicator-position="none">
      <el-carousel-item> -->
        <div class="bck_img">
          <h1 class="come">欢迎来到漫研社</h1>
          <!-- <h1 class="come">开启旅行吧</h1> -->
          <!-- <p class="bt">这里可以看免费漫画,还可以发表文章一起讨论</p> -->
          <!-- <el-button type="success" plain round size="medium" @click="set_cartoon">开始下载！！！！</el-button> -->
          <!-- <el-button type="success" plain round size="medium" @click="login">{{ tip }}</el-button> -->
          <div style="margin-top:30px">
            <el-button type="primary" plain round style="margin:30px" @click="go_read('看漫画')">看漫画</el-button>
            <el-button type="primary" plain round style="margin:30px" @click="go_read('读文章')">读文章</el-button>
          </div>
        </div>
      <!-- </el-carousel-item>
      <el-carousel-item>
        <MySelf></MySelf>
      </el-carousel-item>
    </el-carousel> -->
    <!-- <div class="bck_img">
      <h1 class="come">欢迎来到季明深的个人主页</h1>
      <h1 class="come">开启旅行吧</h1>
      <p class="bt">这里可以看免费漫画,还可以发表文章一起讨论</p>
      <el-button type="success" plain round size="medium" @click="login">{{ tip }}</el-button>
    </div> -->
  </div>
</template>

<script>
import 'animate.css'
import MySelf from './myself.vue'
import {setCartoon} from '@/api/user'

export default {
  components: {
    MySelf
  },
  data() {
    return {
      tip: '',
      isSrcoll: false
    }
  },
  methods: {
    go_read(val) {
      if(val == '看漫画'){
        this.$router.push('/cartoon')
      }
      else if(val == '读文章'){
        this.$router.push('/community')
      }
    },
    async set_cartoon() {
      let data = await setCartoon()
      console.log("ssss",data)
    },
    login () {
      this.$router.push('/login')
    },
    Wheel(e) {
      if(!this.isSrcoll){
        if(e.wheelDeltaY<0){
          this.$refs.change.next()
          this.isSrcoll = true
          setTimeout(() => {
            this.isSrcoll = false
          }, 1000);
        }else{
          this.$refs.change.prev()
          this.isSrcoll = true
          setTimeout(() => {
            this.isSrcoll = false
          }, 1000);
        }
      }
    }
  },
  created() {
    if(localStorage.getItem('token')){
      this.tip = '切换账号'
    }
    else{
      this.tip = '立即登录'
    }
  },
}
</script>

<style>
.bck_img {
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url("../assets/aaa.png");
  background-size: cover;
}
.bck_img h1 {
  color: orange;
  padding-top: 30px;
  font-size: 50px;
}
.bck_img h1:nth-child(1) {
  padding-top: 220px;
}
.bck_img p {
  color: white;
  margin: 50px;
  font-size: 17px;
}

/* 文字动画 */
.come{
  animation: zhuye 2s;
}

@keyframes zhuye{
  from{
    transform: translateX(-100%);
  }
  to{
    transform: translateX(0px);
  }
}

.bt{
  animation: anniu 2s;
}
@keyframes anniu{
  from{
    transform: translateX(+100%);
  }
  to{
    transform: translateX(0px);
  }
}



.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>