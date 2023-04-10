<template>
<div :class="isUser?'user_title_content':'title_content'">
    <div class="container_top" @click="readContent">
        <div style="flex:1;padding:12px 0 12px 0;">
            <img src="@/assets/3.jpg" style="width:100%;height:100%">
        </div>
        <div style="flex:2;padding:12px 10px 12px 20px;">
            <p style="font-size: 25px;font-weight:700;text-align:left;margin-top:6px">{{essay.essayTitle}}</p>
            <p></p>
        </div>
    </div>
    <div class="container_center">
        <div style="flex:1;padding-top:6px;border-right: 1px solid #ccc;text-align:left;display:flex;justify-content: flex-start;">
            <img :src="'http://192.168.44.1:8000/static/headImg/'+essay.essayAuthor+'.png?tempid=' + Math.random()" style="width:35px;height:35px;border-radius: 50px;">
            <span style="padding: 6px 0 0 10px;color:gray">{{essay.essayAuthor}}</span>
        </div>
        <div style="flex:1;padding-top:15px;text-align:right;color:gray;font-size:15px">{{essay.essayTime}}</div>
    </div>
    <div class="container_bottom">
        <div style="flex:1;padding-top:14px;border-right: 1px solid #ccc;display:flex;justify-content: center;">
            <img v-if="is_support" src="@/assets/fin_support_icon.png" style="width:15px;height:15px;color:gray;">
            <img v-else src="@/assets/support_icon.png" style="width:15px;height:15px;color:gray;">
            <span style="color:gray;font-size:15px;margin-left:5px" v-if="support_count!=0">{{support_count}}</span>
        </div>
        <div style="flex:1;padding-top:14px;border-right: 1px solid #ccc;"><i class="el-icon-view"></i><span style="color:gray;font-size:15px;margin-left:5px" v-if="essay.essayClicks!=0">{{essay.essayClicks}}</span></div>
        <div style="flex:1;padding-top:14px"><i class="el-icon-chat-dot-square"></i><span style="color:gray;font-size:15px;margin-left:5px" v-if="comment_count!=0">{{comment_count}}</span></div>
    </div>
  
</div>
</template>

<script>
import {GetSupportEssay, AddReadEssay, GetEssayComment} from '@/api/community'
export default {
    props: {
        essay: Object,
        isUser: Boolean
    },
    data() {
        return {
            loading: false,
            support_count: 0,
            is_support: false,
            comment_count: 0
        }
    },
    methods: {
        async readContent() {
            await AddReadEssay({
                essayId: this.essay.essayId,
                essayClicks: this.essay.essayClicks+1
            })
            this.$router.push('/community/content/'+this.essay.essayId)
        },
    },
    async mounted() {
        let support_count = await GetSupportEssay({
            essayId: this.essay.essayId,
            supportAuthor: localStorage.getItem('token'),
        })
        if(support_count.data[0]){
            this.is_support = support_count.data[0].isSupport
        }
        this.support_count = support_count.support_count.length
        let all_comment = await GetEssayComment({
            essayId: this.essay.essayId,
        })
        this.comment_count = all_comment.data.length
    },
}
</script>

<style scoped>
.title_content{
    width: 590px;
    height: 250px;
    margin-top: 20px;
    background-color: white;
    cursor: pointer;
}
.user_title_content{
    width: 650px;
    height: 250px;
    margin-top: 20px;
    cursor: pointer;
}
.user_title_content:hover{
    box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
    transition: 0.2s;
}
.title_content:hover{
    box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
    transition: 0.2s;
}
.container_top{
    height: 150px;
    padding: 0 20px 0 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
}
.container_center{
    height: 50px;
    padding: 0 20px 0 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
}
.container_bottom{
    height: 50px;
    padding: 0 20px 0 20px;
    display: flex;
    justify-content: space-between;
}
    
</style>