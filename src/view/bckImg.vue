<template>
  <div @mousewheel="Wheel">
    <el-carousel height="87.5vh" direction="vertical" :autoplay="false" ref="change" indicator-position="none">
      <el-carousel-item>
        <div class="bck_img">
          <h1 class="come">欢迎来到季明深的个人主页</h1>
          <h1 class="come">开启旅行吧</h1>
          <p class="bt">这里可以看免费漫画,还可以发表文章一起讨论</p>
          <el-button type="success" plain round size="medium" @click="login">{{ tip }}</el-button>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <MySelf></MySelf>
      </el-carousel-item>
    </el-carousel>
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
  height: 800px;
  background-image: url("../assets/2.jpg");
  background-size: 100% 100%;
}
.bck_img h1 {
  color: orange;
  padding-top: 30px;
  font-size: 50px;
}
.bck_img h1:nth-child(1) {
  padding-top: 120px;
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