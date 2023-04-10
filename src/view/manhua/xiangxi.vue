<template>
  <div>
      <el-button @click="drawer = true" type="primary" class="drawer_btn">
        章节目录
      </el-button>

      <el-drawer
        :title="'目录(共'+title.length+'章)'"
        :visible.sync="drawer"
        direction="ltr"
        size="25%"
        :before-close="handleClose">
        <div v-for="(i, index) in $store.state.manhua" :key="i.id" class="drawer_list" :title="i.name">
            <a :href="'#/cartoon/detail/'+idx+'/'+i.passage" @click="choos(i.passage, index)">{{ i.name }}</a>
        </div>
      </el-drawer>

      <div class="manhua_mess"><span style="margin-top: 30px;display:block">{{manhua_mess}}</span></div>
      <i v-if="love" class="el-icon-star-on love" @click.stop="deslove" :title="love?'取消收藏':'收藏'"></i>
      <i v-else class="el-icon-star-off love" @click="addlove" :title="love?'取消收藏':'收藏'"></i>
      
      <div class="btn">
        <el-button @click="back_car">上一章</el-button>
        <el-button @click="next_car">下一章</el-button>
      </div>
      <div class="imgs" v-for="item in img_data" :key="item.id">
          <el-image :src="item.img_address" lazy></el-image>
      </div>
      <div class="btn">
        <el-button @click="back_car">上一章</el-button>
        <el-button @click="next_car">下一章</el-button>
      </div>
  </div>
</template>

<script>
import {GetImgs, ZhanshiCartoon, AddLove, GetLove} from '@/api/manhua'
export default {
    props: ['idx', 'passage'],
    data() {
        return {
            title: [],
            img_data: [],
            manhua_mess: '',
            count: 30,
            drawer: false,
            love: false
        }
    },
    async created() {
        let getlove = await GetLove({
            username: localStorage.getItem('mobile'),
            cartoonId: this.$route.query.id,
        })
        if(getlove.state=='OK'){
            this.love = getlove.isLove
        }
        // 检查浏览历史
        if(localStorage.getItem(`passage${this.idx}`)){
            let data = {
                idx: this.idx,
                passage: localStorage.getItem(`passage${this.idx}`)
            }
            let Imgs = await GetImgs(data)
            if(Imgs.state == 'OK'){
                this.img_data = Imgs.img_data
                this.title = Imgs.title
                this.manhua_mess = Imgs.manhua_mess
            }
            // this.$axios.post('api/get_imgs/', parms).then(response => {
            //     this.img_data = response.data.img_data
            //     this.title = response.data.title
            // })
        }
        else{
            let data = {
                idx: this.idx,
                passage: this.passage
            }
            let Imgs = await GetImgs(data)
            if(Imgs.state == 'OK'){
                this.img_data = Imgs.img_data
                this.title = Imgs.title
                this.manhua_mess = Imgs.manhua_mess
            }
            // this.$axios.post('api/get_imgs/', data).then(response => {
            //     this.img_data = response.data.img_data
            //     this.title = response.data.title
            // })
        }
        
        // 防止页面刷新时丢失数据
        let now_time = (new Date(Date.now())).toLocaleString()
        let parms2 = {
            id: this.idx,
            readTime: now_time,
            username: localStorage.getItem('mobile')
        }
        let zhanshi_data = await ZhanshiCartoon(parms2)
        if(sessionStorage.getItem('temp')){
            if(zhanshi_data.state == 'OK'){
                this.$store.commit('setmanhua', zhanshi_data.passage_data.reverse())
            }
            // this.$axios.post('api/main_cartoon/', parms2).then(response => {
            //     this.$store.commit('setmanhua', response.data.passage_data.reverse())
            // })
        }
        else{
            if(zhanshi_data.state == 'OK'){
                this.$store.commit('setmanhua', zhanshi_data.passage_data)
            }
            // this.$axios.post('api/main_cartoon/', parms2).then(response => {
            //     this.$store.commit('setmanhua', response.data.passage_data)
            // })
        }
        // this.$store.commit('setmanhua', zhanshi_data.passage_data)
    },
    methods: {
        handleClose() {
            this.drawer = false
        },
        async addlove() {
            this.love = true
            await AddLove({
                username: localStorage.getItem('mobile'),
                cartoonName: this.$route.query.cartoonName,
                cartoonImg: this.$route.query.cartoonImg,
                description: this.$route.query.description,
                cartoonId: this.$route.query.id,
                isLove: this.love
            })
        },
        async deslove() {
            this.love = false
            await AddLove({
                username: localStorage.getItem('mobile'),
                cartoonName: this.$route.query.cartoonName,
                cartoonImg: this.$route.query.cartoonImg,
                description: this.$route.query.description,
                cartoonId: this.$route.query.id,
                isLove: this.love
            })
        },
        load () {
            // this.count += 2
        },
        // 上一章
        async back_car() {
            let index = this.$store.state.index
            let manhua = this.$store.state.manhua
            // 判断倒序还是正序
            if(this.$store.state.temp === false){
                if(index != manhua.length - 1){
                    let data = {
                        idx: manhua[index+1].idx,
                        passage: manhua[index+1].passage
                    }
                    let Imgs = await GetImgs(data)
                    if(Imgs.state == 'OK'){
                        this.img_data = Imgs.img_data
                        this.manhua_mess = Imgs.manhua_mess
                        this.$store.commit('setindex', index + 1)
                        localStorage.setItem('index', index + 1)
                        localStorage.setItem(`passage${this.idx}`, manhua[index+1].passage)
                        window.scrollTo(0,0);
                    }
                    // this.$axios.post('api/get_imgs/', parms).then(response => {
                    //     this.img_data = response.data.img_data
                    //     this.$store.commit('setindex', index + 1)
                    //     localStorage.setItem('index', index + 1)
                    //     localStorage.setItem(`passage${this.idx}`, manhua[index+1].passage)
                    //     window.scrollTo(0,0);
                    // })
                }
                else{
                    alert("这是第一章")
                }
            }
            else{
                if(index != 0){
                    let data = {
                        idx: manhua[index-1].idx,
                        passage: manhua[index-1].passage
                    }
                    let Imgs = await GetImgs(data)
                    if(Imgs.state == 'OK'){
                        this.img_data = Imgs.img_data
                        this.manhua_mess = Imgs.manhua_mess
                        this.$store.commit('setindex', index - 1)
                        localStorage.setItem('index', index - 1)
                        localStorage.setItem(`passage${this.idx}`, manhua[index-1].passage)
                        window.scrollTo(0,0);
                    }
                    // this.$axios.post('api/get_imgs/', parms).then(response => {
                    //     this.img_data = response.data.img_data
                    //     this.$store.commit('setindex', index - 1)
                    //     localStorage.setItem('index', index - 1)
                    //     localStorage.setItem(`passage${this.idx}`, manhua[index-1].passage)
                    //     window.scrollTo(0,0);
                    // })
                }
                else{
                    alert("这是第一章")
                }
            }
            
        },
        // 下一章
        async next_car() {
            let index = this.$store.state.index
            let manhua = this.$store.state.manhua
            // 判断倒序还是正序
            if(this.$store.state.temp === false){
                if(index != 0){
                    let data = {
                        idx: manhua[index-1].idx,
                        passage: manhua[index-1].passage
                    }
                    let Imgs = await GetImgs(data)
                    if(Imgs.state == 'OK'){
                        this.img_data = Imgs.img_data
                        this.manhua_mess = Imgs.manhua_mess
                        this.$store.commit('setindex', index - 1)
                        localStorage.setItem('index', index - 1)
                        localStorage.setItem(`passage${this.idx}`, manhua[index-1].passage)
                        window.scrollTo(0,0);
                    }
                    // this.$axios.post('api/get_imgs/', parms).then(response => {
                    //     this.img_data = response.data.img_data
                    //     this.$store.commit('setindex', index - 1)
                    //     localStorage.setItem('index', index - 1)
                    //     localStorage.setItem(`passage${this.idx}`, manhua[index-1].passage)
                    //     window.scrollTo(0,0);
                    // })
                }
                else{
                    alert("这是最后一章")
                }
            }
            else{
                if(index != manhua.length - 1){
                    let data = {
                        idx: manhua[index+1].idx,
                        passage: manhua[index+1].passage
                    }
                    let Imgs = await GetImgs(data)
                    if(Imgs.state == 'OK'){
                        this.img_data = Imgs.img_data
                        this.manhua_mess = Imgs.manhua_mess
                        this.$store.commit('setindex', index + 1)
                        localStorage.setItem('index', index + 1)
                        localStorage.setItem(`passage${this.idx}`, manhua[index+1].passage)
                        window.scrollTo(0,0);
                    }
                    // this.$axios.post('api/get_imgs/', parms).then(response => {
                    //     this.img_data = response.data.img_data
                    //     this.$store.commit('setindex', index + 1)
                    //     localStorage.setItem('index', index + 1)
                    //     localStorage.setItem(`passage${this.idx}`, manhua[index+1].passage)
                    //     window.scrollTo(0,0);
                    // })
                }
                else{
                    alert("这是最后一章")
                }
            }
        },
        async choos(passage, index) {
            let data = {
                idx: this.idx,
                passage: passage
            }
            let Imgs = await GetImgs(data)
            if(Imgs.state == 'OK'){
                this.img_data = Imgs.img_data
                this.manhua_mess = Imgs.manhua_mess
                this.$store.commit('setindex', index)
                localStorage.setItem('index', index)
                localStorage.setItem(`passage${this.idx}`, passage)
            }
            // this.$axios.post('api/get_imgs/', parms).then(response => {
            //     this.img_data = response.data.img_data
            //     this.$store.commit('setindex', index)
            //     localStorage.setItem('index', index)
            //     localStorage.setItem(`passage${this.idx}`, passage)
            // })
            this.drawer = false
        }
    },
}
</script>

<style scoped>
    .manhua_mess{
        position: fixed;
        top: 0;
        text-align: center;
        width: 100%;
        height: 90px;
        font-size: 20px;
        z-index: 999;
        color: white;
        background-color: black;
    }
    .love{
         position: fixed;
         top: 32px;
         right: 100px;
         font-size: 25px;
         z-index: 999;
         cursor: pointer;
    }
    .el-icon-star-off{
        color: white;
    }
    .el-icon-star-on{
        color: orange;
    }
    .imgs{
        margin-left: auto;
        margin-right: auto;
        width: 800px;
        color: pink;
    }
    .btn{
        margin-top: 30px;
        margin-bottom: 20px;
    }
    .drawer_list{
        margin-top: 10px;
    }
    .drawer_list a{
        display: block;
        /* margin-right: auto;
        margin-left: auto; */
        padding-top: 5px;
        height: 30px;
        text-decoration: none;
        /* color: #b0b0b0; */
        color: black;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .drawer_list a:hover{
        background-color: #9ad2c9;
        color: white;
    }
    .drawer_btn{
        position: fixed;
        left: 0px;
        top: 50%;
    }
    
</style>