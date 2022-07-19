<template>
  <div id="app" class="box" v-cloak>

    <navheader class="nav_header"></navheader>

    <!-- 展示组件的占位符 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    

  </div>
</template>

<script>
import navheader from '@/components/nav_header.vue'

export default {
  name: 'App',
  data () {
    return {
      
    }
  },
  // 注册组件
  components: {
    navheader
  },
  methods: {

  },
  created() {
    this.$store.commit('setus', false)
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
.box{
  overflow: visible;
}
.nav_header {
  position: sticky;
  top: 0px;
  z-index:3;
  }
  

</style>
