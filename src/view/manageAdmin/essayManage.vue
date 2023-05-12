<template>
  <div class="cartoonManage">
    <div style="text-align:left">
      <h2>全部文章</h2>
    </div>
    <el-table
      :data="essayData"
      stripe
      style="width: 100%"
      height="70vh"
      >
      <el-table-column
        prop="essayTitle"
        label="标题">
      </el-table-column>
      <el-table-column
        label="作者"
        width="180">
        <template slot-scope="scope">
          <div class="author_img">
            <img :src="'http://192.168.44.1:8000/static/headImg/'+scope.row.essayAuthor+'.png'" class="head_image">
            <div style="margin-left: 10px">{{ scope.row.essayAuthor }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="essayClicks"
        label="点击量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="essaySupport"
        label="点赞数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="essayTime"
        label="发布时间">
      </el-table-column>
    </el-table>
    <div style="height:100px"></div>
  </div>
</template>

<script>
import {GetAllEssay} from '@/api/community'
export default {
  data() {
    return {
      essayData: []
    }
  },
  async mounted() {
    let essay_data = await GetAllEssay()
    this.essayData = essay_data.data
  },
}
</script>

<style>
.cartoonManage{
  padding: 10px 0 0 50px;
}
.author_img{
  display: flex;
  justify-content: flex-start;
}
.head_image{
  width:20px;
  height:20px;
  border-radius: 50px;
}
</style>