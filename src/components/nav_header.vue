<template>
  <div class="box_top">
    <div class="box_in">
      <div class="box_left">
        <a href="#/home" style="margin:0" @click="select = 0">
          <img src="../assets/logo.png" style="width: 40px; height: 40px" />
          <span class="zhuye">主页</span>
        </a>
      </div>
      <div class="box_right">
        <!-- <div :class="$route.path == '/person' ? 'select' : ''">
          <a href="#/person">个人简历</a>
        </div> -->
        <div :class="$route.path.slice(0,8) == '/cartoon' ? 'select' : ''">
          <a href="#/cartoon">看漫画</a>
        </div>
        <!-- <div :class="$route.path == '/user' ? 'select' : ''">
          <a href="#/user">个人中心</a>
        </div> -->
        <div :class="$route.path.slice(0,10) == '/community' ? 'select' : ''">
          <a href="#/community">读文章</a>
        </div>
        <!-- <div>
          <a href="#/login">切换账号</a>
        </div> -->
      </div>
      <el-dropdown class="user_show" v-if="$store.state.user">
        <div>
          <el-col :span="12">
            <div class="demo-basic--circle">
              <div class="block">
                <el-avatar :size="40" :src="imageUrl"></el-avatar>
              </div>
            </div>
          </el-col>
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item>退出登录</el-dropdown-item> -->
          <div class="menu">
            <a href="#/user">个人中心</a>
          </div>
          <div class="menu">
            <a href="#/login">切换账号</a>
          </div>
          <div class="menu">
            <a href="#/home" @click="outlogin">退出登录</a>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { LoginOut, GetHeadImg } from "@/api/user";
export default {
  data() {
    return {
      imageUrl: "",
      select: 0,
    };
  },
  methods: {
    async outlogin() {
      let data = await LoginOut();
      if (data.state == "OK") {
        localStorage.removeItem("token");
        this.$store.commit("setus", false);
        this.$router.go(0);
      }
    },
  },
  async mounted() {
    if (localStorage.getItem("token")) {
      this.$store.commit("setus", true);
      let data = await GetHeadImg({
        username: localStorage.getItem("token"),
      });
      if (data.state == "OK") {
        this.imageUrl = data.img_data;
      } else {
        console.log("hh");
        this.imageUrl =
          "https://img2.baidu.com/it/u=3035872156,255770104&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500";
      }
    } else {
      this.$store.commit("setus", false);
    }
  },
};
</script>

<style>
.box_top {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  /* background-color: white; */
  background-image: url('../assets/ccc.jpg');
  /* background-size: cover; */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.user_show {
  /* float: right; */
  cursor: pointer;
  /* left: 180px; */
}
.el-icon-arrow-down {
  position: relative;
  font-size: 20px;
  left: 10px;
  top: 10px;
}
.user_show h3 {
  font-size: 19px;
  color: purple;
}
.menu {
  margin-bottom: 25px;
  font-size: 16px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
}
.menu a {
  color: gray;
  text-decoration: none;
}
.menu a:hover {
  color: purple;
}
.box_in {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 80%;
  height: 100%;
}
.box_right {
  display: flex;
  justify-content: space-between;
  height: 100%;
	/* margin-left: 500px; */
	line-height: 70px;
}
.box_right div {
  flex: 1;
  width: 100px;
}
.select {
  border-bottom: 4px solid purple;
}
.box_right a {
  text-decoration: none;
  font-size: 20px;
  /* margin: 20px; */
  color: gray;
	line-height: 30px;
}
.box_left a {
  color: purple;
  text-decoration: none;
  font-size: 20px;
  margin: 20px;
}
.box_top a:nth-child(1) {
  align-self: flex-start;
}
.box_top a:hover {
  color: purple;
}
.zhuye {
  position: relative;
  left: 10px;
  bottom: 10px;
}
</style>