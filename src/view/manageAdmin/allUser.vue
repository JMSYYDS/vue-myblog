<template>
  <div class="cartoonManage">
    <div style="text-align:left">
      <h2>全部用户</h2>
    </div>
    <el-table
      :data="test_tableData"
      stripe
      style="width: 100%"
      height="70vh"
      >
      <el-table-column
        label="用户名"
        width="180">
        <template slot-scope="scope">
          <div class="author_img">
            <img :src="'http://192.168.44.1:8000/static/headImg/'+scope.row.username+'.png'" class="head_image">
            <div style="margin-left: 10px">{{ scope.row.username }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="zaixian"
        label="是否在线"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Time"
        label="上次在线时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="registerTime"
        label="注册时间"
        >
      </el-table-column>
    </el-table>
    <div style="height:100px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          username: '为尔倾心',
          mobile: '18944155125',
          zaixian: '在线',
          registerTime: '2021-07-16',
          Time: '2023-05-01'
        },
      ],
      test_tableData: []
    }
  },
  mounted() {
    for(let i=1;i<10;i++){
      this.test_tableData.push(...this.tableData)
    }
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