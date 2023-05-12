<template>
  <div style="height:100%">
    <el-row class="tac">
      <el-col :span="4">
        <el-menu
          default-active="3"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          >
          <el-menu-item index="1">
            <i class="el-icon-user-solid"></i>
            <span slot="title">全部用户</span>
          </el-menu-item>
          <el-menu-item index="2" disabled>
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">漫画管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-document"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
          <!-- <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item> -->
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div class="admin_content">
          <cartoonManage v-if="select_index == 3"></cartoonManage>
          <essayManage v-if="select_index == 4"></essayManage>
          <allUser v-if="select_index == 1"></allUser>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import cartoonManage from './cartoonManage.vue'
import essayManage from './essayManage.vue'
import allUser from './allUser.vue'
export default {
  components: {
    cartoonManage,
    essayManage,
    allUser
  },
  data() {
    return {
      select_index: 3
    }
  },
  methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.select_index = key
      },
    }
}
</script>

<style>
.el-menu-vertical-demo{
  height: 100vh;
}
.admin_content{
  height: 100vh;
  /* background-color: #545c64; */
}
</style>