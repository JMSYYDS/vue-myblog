<template>
  <div class="cartoonManage">
    <div style="text-align:left">
      <h2>全部漫画</h2>
    </div>
    <el-table
      :data="cartoonData"
      stripe
      style="width: 100%"
      height="70vh"
      >
      <el-table-column
        prop="cartoonName"
        label="漫画名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="简介"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="cartoonState"
        label="状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="cartoonTag"
        label="标签">
      </el-table-column>
      <el-table-column
        prop="cartoonAuthor"
        label="作者"
        >
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间">
      </el-table-column>
    </el-table>
    <div style="height:100px"></div>
    <el-button type="primary" @click="download_cartoon">下载/更新漫画</el-button>
  </div>
</template>

<script>
import { setCartoon } from '@/api/user'
import {AllLocalCartoon} from '@/api/manhua'
export default {
  data() {
    return {
      cartoonData: [],
    }
  },
  methods: {
    async download_cartoon() {
      let data = await setCartoon()
      console.log("开始下载",data)
    },
  },
  async mounted() {
    let manhua_data = await AllLocalCartoon()
    this.cartoonData = manhua_data.manhua_list
  },
}
</script>

<style>
.cartoonManage{
  padding: 10px 0 0 50px;
}
</style>