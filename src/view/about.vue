<template>
  <div class="about_content">
    <div class="container">
      <!-- <div class="card_container">
        <EssayIndex :essay_data="essay_data" v-for="item in 10" :key="item"></EssayIndex>
      </div> -->
      
      <router-view></router-view>
      <div class="edit_icon" @click="go_edit">
        <el-tooltip effect="dark" content="写作" placement="top">
          <img src="@/assets/edit_icon.png">
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import EssayIndex from '@/view/community/essayCard.vue'

export default {
  components: {
    EssayIndex
    },
    data() {
      return {
        
      }
    },
    methods: {
        go_edit() {
					let Router_Url = this.$router.resolve({
						path: '/edit'
					})
					window.open(Router_Url.href, '_blank')
        }
    },
    async mounted() {
      
    },
}
</script>

<style scoped>
    .about_content{
      position: absolute;
      width: 100%;
      min-height: calc(100% - 70px);
      background-color: rgb(245, 245, 245);
      /* background-image: url('../assets/loginbck.jpg'); */
      /* background-size: cover; */
    }
    .container{
      width: 1200px;
      margin: 30px auto 30px auto;
    }
    .card_container{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
		.edit_icon{
			position: fixed;
			width: 60px;
			height: 60px;
			right: 130px;
			bottom: 130px;
			cursor: pointer;
		}
		.edit_icon img{
			transform: scale(0.3);
		}
		.edit_icon img:hover{
			transform: scale(0.4);
			transition: 0.5s;
		}
</style>