<template>
  <div class="about">
    <span class="back" @click="back"><i class="el-icon-arrow-left"></i>返回</span>
      <div class="left">
        <p>最近更新</p>
        <a
        v-for="item in $store.state.page_title"
        :key="item.id"
        :href="'#/community/content/'+item.id"
        >
        {{ item.title }}
        </a>
      </div>
      <div class="center">
        <router-view></router-view>
      </div>
      <div class="right">right</div>
  </div>
</template>

<script>

export default {
  components: {
    },
    methods: {
        back() {
            this.$router.go(-1)
        }
    },
}
</script>

<style scoped>
    .about {
        display: flex;
        justify-content: space-around;
        /* height: 700px; */
        background-color: #F2F6FC;
        position: relative;
    }
    .back{
        position: absolute;
        left: 20px;
        top: 10px;
        font-size: 17px;
    }
    .back:hover{
        color: purple;
        cursor: pointer;
    }
    .left {
        width: 300px;
        height: 300px;
        background-color: #FFFFFF;
        margin-top: 100px;
        margin-bottom: 50px;
        position: sticky;
        top: 100px;
    }
    .left a{
        display: block;
        width: 80%;
        margin: 15px;
        text-decoration: none;
        color: black;
    }
    .left a:hover{
        color: rgba(86, 91, 235, 0.847);
    }
    .left p{
        margin-top: 20px;
    }
    .center {
        width: 800px;
        background-color: #EBEEF5;
        margin-top: 100px;
        margin-bottom: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .right {
        width: 300px;
        height: 300px;
        background-color: #FFFFFF;
        margin-top: 100px;
        margin-bottom: 50px;
        position: sticky;
        top: 100px;
    }
</style>