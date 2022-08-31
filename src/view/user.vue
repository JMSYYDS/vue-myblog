<template>
  <div>
    <div class="head_img">
      <el-col :span="12">
        <div class="demo-basic--circle">
          <div class="block">
            <el-avatar :size="150" :src="imageUrl"></el-avatar>
          </div>
        </div>
        <div class="user">{{username}}</div>
        <div>
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload">
            <el-button type="primary">{{tip}}</el-button>
            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </div>
      </el-col>
    </div>
    <el-tabs type="card" style="width:768px;float:right;">
      <el-tab-pane label="我的收藏">
        <div style="max-height:500px">
          <el-empty description="暂无数据"></el-empty>
        </div>
      </el-tab-pane>
      <el-tab-pane label="浏览历史">
        <div style="max-height:500px">
          <el-empty description="暂无数据"></el-empty>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { UploadHeadImg, GetHeadImg } from '@/api/user'
export default {
    data() {
        return {
          imageUrl: '',
          username: '',
          tip: '更换头像'
        }
    },
    methods: {
      async uploadimg(base64_data) {
        let username = localStorage.getItem('token')
        let data = await UploadHeadImg({
          base64_data,
          username,
        })
        if(data.state == 'OK'){
          return true
        }else{
          return false
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG和PNG 格式!');
          return
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return
        }
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
          let flag = this.uploadimg(fileReader.result)
          if(flag){
            this.imageUrl = fileReader.result
            this.$router.go(0)
          }
        }
      },
    },
    async mounted() {
      this.username = localStorage.getItem('token')
      let data = await GetHeadImg({
        username: localStorage.getItem('token')
      })
      if(data.state == 'OK'){
        this.tip = '更换头像'
        this.imageUrl = data.img_data
      }else{
        this.tip = '上传头像'
        this.imageUrl = 'https://img2.baidu.com/it/u=3035872156,255770104&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500'
      }
    },
}
</script>

<style scoped>
    /* div {
        display: flex;
        justify-content: center;
    } */
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .head_img{
    margin-top: 50px;
  }
  .user{
    font-size: 20px;
    margin: 5px;
  }
</style>