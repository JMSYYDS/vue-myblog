<template>
  <div class="comment_box">
    <div class="write_comment">
      <div style="margin-right:10px" v-cloak>
        <img :src="headimg" style="width:30px;height:30px;border-radius: 50px;">
      </div>
      <div class="textarea_box">
        <el-input
          type="textarea"
          placeholder="请输入评论内容"
          v-model="textarea"
          maxlength="500"
          show-word-limit
          rows="5"
        >
        </el-input>
        <div class="comment_bt"></div>
      </div>
    </div>
    <div style="text-align:right;margin:10px">
      <el-button type="danger" size="mini" round @click="setComment">评论</el-button>
    </div>
    <div class="all_comment">
      <div class="comment_card" v-for="item in allComment" :key="item.commentId">
        <div style="margin-right:10px">
          <img :src="'http://192.168.44.1:8000/static/headImg/'+item.commentAuthor+'.png?tempid=' + Math.random()" style="width:30px;height:30px;border-radius: 50px;">
        </div>
        <div class="comment_content">
          <span>{{item.commentAuthor}}</span>
          <span>{{item.commentTime}}</span>
          <div @click="addCommentSupport(item.commentId)" style="float:right;cursor: pointer;display:flex;justify-content: flex-start;">
            <span style="margin-top:4px" v-if="item.commentClicks!=0">{{item.commentClicks}}</span>
            <img v-if="is_mysupport(item.commentId)" src="@/assets/fin_support_icon.png" style="width:18px;height:20px;">
            <img v-else src="@/assets/support_icon.png" style="width:18px;height:20px;">
          </div>
          <div style="float:right;padding:3px 15px 0 0">
            <el-dropdown size="mini" @command="handleCommand">
              <i class="el-icon-more" style="color:gray;cursor: pointer;"></i>
              <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="jubao">举报</el-dropdown-item>
              <el-dropdown-item :command="item.commentId" v-if="item.commentAuthor==username">删除</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="textarea">{{item.commentContent}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {SetEssayComment, GetEssayComment, GetSupportComment, DeleteComment} from '@/api/community'
export default {
  props: {
    essayId: String,
    all_comment:Array
  },
  data() {
    return {
      username: '',
      textarea: '',
      allComment: [],
      mysupport: [],
      allsupport: [],
      is_show: 0,
      headimg: ''
    }
  },
  methods: {
    async setComment() {
      let now_time = (new Date(Date.now())).toLocaleString()
      let res_data = await SetEssayComment({
        essayId: this.essayId,
        commentContent: this.textarea,
        commentTime: now_time,
        commentAuthor: this.username,
        commentClicks: 0
      })
      if(res_data.state === 'OK'){
        let comment_data = await GetEssayComment({
          essayId: this.essayId,
        })
        this.allComment = comment_data.data
        this.$emit("setComment", this.allComment.length)
      }else{
        this.$message.error("评论失败")
      }
    },
    // 点赞
    async addCommentSupport(commentId) {
      if(this.allsupport.indexOf(commentId)!=-1){
        let res_data = await GetSupportComment({
          essayId: this.essayId,
          commentId,
          supportAuthor: this.username,
          flag: 3
        })
        if(res_data.state == "OK"){
          let comment_data = await GetEssayComment({
            essayId: this.essayId,
          })
          this.allComment = comment_data.data
          this.mysupport = []
          this.allsupport = []
          res_data.data.forEach(e => {
            this.allsupport.push(e.commentId)
            if(e.isSupport){
              this.mysupport.push(e.commentId)
            }
          })
        }
      }else{
        let res_data = await GetSupportComment({
          essayId: this.essayId,
          commentId,
          supportAuthor: this.username,
          flag: 1
        })
        if(res_data.state == "OK"){
          let comment_data = await GetEssayComment({
            essayId: this.essayId,
          })
          this.allComment = comment_data.data
          this.mysupport = []
          this.allsupport = []
          res_data.data.forEach(e => {
            this.allsupport.push(e.commentId)
            if(e.isSupport){
              this.mysupport.push(e.commentId)
            }
          })
        }
      }
    },
    is_mysupport(commentId) {
      if(this.mysupport.indexOf(commentId)!=-1){
        // 在里面
        return true
      }else{
        return false
      }
    },
    async handleCommand(command) {
      if(command == "jubao"){
        return
      }else{
        await DeleteComment({
          commentId: command
        })
        let comment_data = await GetEssayComment({
          essayId: this.essayId,
        })
        this.allComment = comment_data.data
        this.$emit("setComment", this.allComment.length)
      }
    }
  },
  async mounted() {
    this.username = localStorage.getItem('token')
    this.headimg = 'http://192.168.44.1:8000/static/headImg/'+this.username+'.png?tempid=' + Math.random()
    this.allComment = this.all_comment
    let res_data = await GetSupportComment({
      essayId: this.essayId,
      commentId: 1,
      supportAuthor: this.username,
      flag: 2
    })
    this.mysupport = []
    this.allsupport = []
    res_data.data.forEach(e => {
      this.allsupport.push(e.commentId)
      if(e.isSupport){
        this.mysupport.push(e.commentId)
      }
    })
  },
  computed: {
    
  }
}
</script>

<style>
  .comment_box{
    padding: 0 30px 30px 30px;
  }
  .write_comment{
    display: flex;
    justify-content: flex-start;
  }
  .textarea_box{
    width: 100%;
    position: relative;
    background: rgba(245,246,247,0.8);
    border-radius: 8px;
  }
  .all_comment{
    /* margin-top: 20px; */
  }
  .comment_card{
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
  }
  .comment_content{
    width: 100%;
    text-align: left;
  }
  .comment_content span{
    font-size: 14px;
    color: #777888;
    margin-right:10px
  }
  .textarea{
    margin-top:10px;
    font-size: 14px;
    color: #222226;
    line-height: 22px;
    word-break: break-word;
  }
</style>