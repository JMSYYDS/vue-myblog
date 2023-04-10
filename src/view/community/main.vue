<template>
<div>
  <div style="text-align:left;display:flex;justify-content: flex-start;align-items: center">
    <div :class="flag==1?'hover_essay':'essay'" @click="getAll">全部</div>
    <div :class="flag==2?'hover_essay':'essay'" @click="flag = 2">前端知识</div>
    <div :class="flag==3?'hover_essay':'essay'" @click="flag = 3">设计技巧</div>
    <div :class="flag==4?'hover_essay':'essay'" @click="flag = 4">漫画讨论</div>
    <div style="float:right">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="search_data"
        @keyup.enter.native="search"
        >
      </el-input>
    </div>
  </div>
  <div class="card_container">
    <EssayIndex  v-for="item in essay_data" :key="item.essayId" :essay="item"></EssayIndex>
  </div>
</div>
</template>

<script>
import {GetAllEssay} from '@/api/community'
import EssayIndex from '@/view/community/essayCard.vue'

export default {
  components: {
    EssayIndex
    },
  data() {
    return {
      essay_data: [],
      all_essay_data: [],
      flag: 1,
      search_data: ''
    }
  },
  methods: {
    search(){
      if(this.search_data!=''){
        this.flag = 0
        this.essay_data = []
        for(let i=0;i<this.all_essay_data.length;i++){
          if(this.all_essay_data[i].essayTitle.indexOf(this.search_data) != -1){
            this.essay_data.push(this.all_essay_data[i])
          }
        }
      }
    },
    getAll() {
      this.flag = 1
      this.essay_data = this.all_essay_data
    }
  },
  async mounted() {
    let essay_data = await GetAllEssay()
    this.essay_data = essay_data.data
    this.all_essay_data = essay_data.data
  },
}
</script>

<style>
.hover_essay{
  width: 85px;
  height: 30px;
  color: white;
  padding-top: 6px;
  margin-right: 20px;
  text-align: center;
  border-radius: 25px;
  font-size: 15px;
  cursor: pointer;
  background-color: rgb(228, 112, 112);
}
.essay{
  width: 85px;
  height: 30px;
  color: black;
  padding-top: 6px;
  margin-right: 20px;
  text-align: center;
  border-radius: 25px;
  font-size: 15px;
  cursor: pointer;
}
.card_container{
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>