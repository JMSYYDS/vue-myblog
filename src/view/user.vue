<template>
<div class="user_box" v-cloak>
  <div class="user_content">
    <div class="head_img">
      <!-- <el-col :span="12"> -->
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
          <div style="height:20px"></div>
          <el-button type="primary" @click="dialogVisible = true">修改密码</el-button>
          <div style="height:20px"></div>
          <el-button v-if="isAdmin" type="primary" @click="goAdmin">后台管理页面</el-button>
          <el-dialog
            :title="update_password_tip"
            :visible.sync="dialogVisible"
            width="20%"
            >
            <el-input v-model="input" :placeholder="input_tip"></el-input>
            <div style="height:20px"></div>
            <el-input v-if="update_password_tip=='修改密码'" v-model="input2" placeholder="确认密码"></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handle_sel">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      <!-- </el-col> -->
    </div>
    <div>
      <el-tabs type="card" style="width:830px;float:right;margin-top:3%">
        <el-tab-pane label="我的收藏">
          <div class="love" style="max-height:800px" v-if="data_love[0]">
            <!-- <el-empty description="暂无数据"></el-empty> -->
            <div class="love_item" v-for="item in data_love" :key="item.cartoonId">
              <a :href="'#/cartoon/book/'+item.cartoonId" target="_blank">
                <img :src="api + item.cartoonImg">
              </a>
              <a :href="'#/cartoon/book/'+item.cartoonId" class="cartoon_name" target="_blank">{{ item.cartoonName }}</a>
              <p class="p_text" :title="item.description">{{ item.description }}</p>
            </div>
          </div>
          <div v-else>
            <el-empty description="暂无数据"></el-empty>
          </div>
        </el-tab-pane>
        <el-tab-pane label="浏览历史">
          <div style="max-height:700px;overflow: scroll;" v-if="data_history[0]">
            <div class="history_card" v-for="item in data_history" :key="item.cartoonId">
              <div class="card_img">
                <a :href="'#/cartoon/book/'+item.cartoonId" target="_blank">
                  <img :src="api + item.cartoonImg">
                </a>
              </div>
              <div class="card_content">
                <div>
                  <a :href="'#/cartoon/book/'+item.cartoonId" target="_blank" style="text-decoration: none;color: black;">
                    <div class="content_name">{{ item.cartoonName }}</div>
                  </a>
                  <div style="margin-top:20px;text-align:left;font-size:12px;padding:2px" :title="item.description">{{ item.description }}</div>
                </div>
                <div>
                  <div style="float:left;width:300px;text-align:left;color:gray">{{item.readTime}}</div>
                  <div class="content_icon">
                    <img style="width:100%;height:100%;border-radius: 100%;" :src="imageUrl" />
                  </div>
                  <span style="float:left;margin-left:10px">{{username}}</span>
                  <div style="height:20px"></div>
                  <el-divider></el-divider>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <el-empty description="暂无数据"></el-empty>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的文章">
          <div v-if="data_essay[0]" style="max-height:800px;padding:0 10px 20px 10px">
            <div v-for="item in data_essay" :key="item.essayId" class="essay_item">
              <essay-card :essay="item" :isUser="true"></essay-card>
              <div>
                <el-button type="danger" icon="el-icon-delete" circle @click="delete_essay(item.essayId)"></el-button>
              </div>
            </div>
          </div>
          <div v-else>
            <el-empty description="暂无数据"></el-empty>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</div>
</template>

<script>
import { UploadHeadImg, GetHeadImg, UpdatePassword } from '@/api/user'
import {GetLove, GetHistory} from '@/api/manhua'
import {GetUserEssay, DeleteEssay} from '@/api/community'
import EssayCard from '@/view/community/essayCard.vue'

export default {
  components: {
    EssayCard
  },
    data() {
        return {
          imageUrl: '',
          username: '',
          tip: '更换头像',
          data_love: [],
          data_history: [],
          data_essay: [],
          dialogVisible: false,
          input: '',
          input2: '',
          update_password_tip: '验证身份',
          input_tip: '输入当前用户手机号',
          api: 'http://manyan.w1.luyouxia.net/'
        }
    },
    methods: {
      goAdmin() {
        let Router_Url = this.$router.resolve({
          path: '/manageAdmin'
        })
        window.open(Router_Url.href, '_blank')
      },
      async handle_sel() {
        if(this.update_password_tip == '验证身份'){
          if(this.input == localStorage.getItem('mobile')){
            this.input = ''
            this.update_password_tip = '修改密码'
            this.input_tip = '输入新密码'
          }else{
            this.$message.warning('手机号错误')
          }
        }else{
          if(this.input != this.input2){
            this.$message.warning('两次密码不一致')
          }else{
            await UpdatePassword({
              username: localStorage.getItem('token'),
              password: this.input
            })
            this.$message.success('修改成功')
            this.dialogVisible = false
          }
        }
      },
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
      order(a,b){
        if(a.readTime > b.readTime){
            return -1;
        }else if(a.readTime < b.readTime){
            return 1;
        }else if(a.readTime == b.readTime){
            return 0;
        }
      },
      async delete_essay(essayId) {
        this.$confirm('确定删除此文章吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res_data = await DeleteEssay({
            essayId
          })
          if(res_data.state == "OK"){
            let user_essay = await GetUserEssay({
              essayAuthor: localStorage.getItem('token')
            })
            this.data_essay = user_essay.data
            this.$message({
              type: 'success',
              message: '删除成功!',
              showClose: true
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            showClose: true
          });          
        });
      }
    },
    async mounted() {
      let data_love = await GetLove({
        username: localStorage.getItem('mobile'),
        cartoonId: 10010
      })
      this.data_love = data_love.data_love
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
      let data_history = await GetHistory({
        username: localStorage.getItem('mobile'),
      })
      this.data_history = data_history.data_history.sort(this.order)
      let user_essay = await GetUserEssay({
        essayAuthor: localStorage.getItem('token')
      })
      this.data_essay = user_essay.data
    },
    computed: {
      isAdmin() {
        if(localStorage.getItem('mobile') == '18944155125'){
          return true
        }else{
          return false
        }
      }
    }
}
</script>

<style scoped>
  .user_box{
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: url('../assets/loginbck.jpg');
    background-size: cover;
  }
  .user_content{
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
  }
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
    /* float:left; */
    /* margin-left: 15%; */
  }
  .user{
    font-size: 20px;
    margin: 5px;
  }
  .love_item{
    width: 180px;
    height: 280px;
    margin: 10px;
    /* background-color: #E4E7ED; */
  }
  .love_item:hover{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .love_item img{
    width: 180px;
    height: 220px;
  }
  .cartoon_name{
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 5px;
  }
  .cartoon_name:hover{
    color: red;
  }
  .p_text{
    font-size:12px;
    padding:2px;
    height:30px;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .love{
    max-height:500px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    overflow: scroll;
  }
  .history_card{
    margin: 10px;
    display: flex;
    justify-content: flex-start;
  }
  .history_card:hover{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .card_img{
    cursor: pointer;
  }
  .history_card img{
    width: 180px;
    height: 220px;
  }
  .card_content{
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .content_name{
    text-align:left;
    font-size:22px;
    font-weight:700;
    margin-top:10px;
    cursor: pointer;
  }
  .content_name:hover{
    color: blueviolet;
  }
  .content_icon{
    display: block;
    width: 20px;
    height: 20px;
    float: left;
    border-radius: 100%;
    background-size: 100% 100%;
    cursor: pointer;
  }
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .essay_item{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<style lang="less">
.user_content{
  .el-divider--horizontal{
    margin: 0px 0px;
    margin-top: 10px;
  }
}
</style>