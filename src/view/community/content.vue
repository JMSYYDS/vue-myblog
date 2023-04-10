<template>
<div class="wai">
  <div style="text-align:left;margin-bottom:20px">
    <el-link icon="el-icon-arrow-left" @click="goBack">返回</el-link>
  </div>
  <div class="detail">
    <h1>{{essay_data.essayTitle}}</h1>
    <div style="margin-bottom:80px">
      <div style="float:right;color:gray;margin:20px 20px 0 0">{{essay_data.essayTime}}</div>
    </div>
    <div v-html="essay_data.essayContent"></div>
  </div>
  <div class="content_bottom">
    <div style="flex:1;padding:15px 0 0 20px;text-align:left;display:flex;justify-content: flex-start;">
        <img :src="'http://192.168.44.1:8000/static/headImg/'+essay_data.essayAuthor+'.png?tempid=' + Math.random()" style="width:35px;height:35px;border-radius: 50px;">
        <span style="padding: 6px 0 0 10px;color:gray">{{essay_data.essayAuthor}}</span>
    </div>
    <div style="padding:25px 30px 0 0;display:flex;justify-content: flex-start;cursor: pointer;">
      <div style="display:flex;justify-content: flex-start;width:100px" @click="support_essay">
        <img v-if="is_support" src="@/assets/fin_support_icon.png" style="width:25px;height:25px;">
        <img v-else src="@/assets/support_icon.png" style="width:25px;height:25px;">
        <span v-if="support_count!=0" style="padding: 6px 0 0 10px;color:gray;font-size:15px">{{support_count}}</span>
      </div>
      <div style="display:flex;justify-content: flex-start;width:100px;cursor: pointer;" @click="drawer = true">
        <img src="@/assets/comment_icon.png" style="width:25px;height:25px;">
        <span v-if="comment_count!=0" style="padding: 6px 0 0 10px;color:gray">{{comment_count}}</span>
      </div>
    </div>
  </div>
  <el-drawer
    title="评论"
    :visible.sync="drawer"
    direction="rtl"
    size="500px"
    >
    <el-divider></el-divider>
    <Comment :essayId="id" :all_comment="all_comment" @setComment="setComment"></Comment>
  </el-drawer>
</div>
  
</template>

<script>
import {GetEssay, SupportEssay, GetSupportEssay, GetEssayComment} from '@/api/community'
import Comment from './comment.vue'

export default {
  props: ['id'],
  components: {
    Comment
  },
  data() {
    return {
      essay_data: {},
      is_support: false,
      support_count: 0,
      drawer: false,
      comment_count: 0,
      all_comment: []
    }
  },
  methods: {
    async support_essay() {
      let res_data = await SupportEssay({
        essayId: this.id,
        supportAuthor: localStorage.getItem('token'),
        isSupport: !this.is_support,
      })
      this.is_support = !this.is_support
      this.support_count = res_data.support_count.length
    },
    setComment(val) {
      this.comment_count = val
    },
    goBack() {
      this.$router.go(-1)
    },
  },
  async mounted() {
    console.log(this.id)
    let essay_data = await GetEssay({
      essayId: this.id
    })
    this.essay_data = essay_data.data[0]
    let support_data = await GetSupportEssay({
      essayId: this.id,
      supportAuthor: localStorage.getItem('token'),
    })
    if(support_data.data[0]){
      this.is_support = support_data.data[0].isSupport
    }
    this.support_count = support_data.support_count.length
    let all_comment = await GetEssayComment({
      essayId: this.id,
    })
    this.comment_count = all_comment.data.length
    this.all_comment = all_comment.data
  },
}
</script>

<style scoped>
    .wai{
      width: 850px;
      margin-left: auto;
      margin-right: auto;
      background-color: rgb(245, 245, 245);
      
    }
    .detail{
      /* margin: 15px; */
      /* width: 850px; */
      padding: 20px 30px 50px 30px;
      min-height: 300px;
      background-color: white;
      box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
    }
    .content_bottom{
      /* padding: 10px 20px 10px 20px; */
      height: 70px;
      width: 850px;
      position: fixed;
      bottom: 0;
      background-color: white;
      display: flex;
      justify-content: space-between;
    }
    .el-icon-chat-dot-square{
      cursor: pointer;
    }
</style>
<style>
  .el-drawer__header{
    margin-bottom: 0;
    text-align: left;
  }
  .el-drawer__header span{
    color: black;
  }
</style>