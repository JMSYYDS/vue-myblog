<template>
  <div>
      <div>
        <button class="title_bt" @click="titl_show">章<br>节</button>
        <p class="title_top">共{{ title.length }}章</p>
        <div class="zhangjie">
            <div v-for="(i, index) in $store.state.manhua" :key="i.id">
                <a :href="'#/cartoon/detail/'+idx+'/'+i.passage" @click="choos(i.passage, index)">{{ i.name }}</a>
            </div>
        </div>
      </div>
      
      <div class="btn">
        <el-button @click="back_car">上一章</el-button>
        <el-button @click="next_car">下一章</el-button>
      </div>
      <div class="imgs" v-for="item in img_data" :key="item.id">
          <img :src="item.img_address">
      </div>
      <div class="btn">
        <el-button @click="back_car">上一章</el-button>
        <el-button @click="next_car">下一章</el-button>
      </div>
  </div>
</template>

<script>
export default {
    props: ['idx', 'passage'],
    created() {
        // 检查浏览历史
        if(localStorage.getItem(`passage${this.idx}`)){
            let parms = {
                idx: this.idx,
                passage: localStorage.getItem(`passage${this.idx}`)
            }
            this.$axios.post('api/get_imgs/', parms).then(response => {
                this.img_data = response.data.img_data
                this.title = response.data.title
            })
        }
        else{
            let parms = {
                idx: this.idx,
                passage: this.passage
            }
            this.$axios.post('api/get_imgs/', parms).then(response => {
                this.img_data = response.data.img_data
                this.title = response.data.title
            })
        }
        
        // 防止页面刷新时丢失数据
        let parms2 = {
            id: this.idx
        }
        if(sessionStorage.getItem('temp')){
            this.$axios.post('api/main_cartoon/', parms2).then(response => {
                this.$store.commit('setmanhua', response.data.passage_data.reverse())
            })
        }
        else{
            this.$axios.post('api/main_cartoon/', parms2).then(response => {
                this.$store.commit('setmanhua', response.data.passage_data)
            })
        }
    },
    data() {
        return {
            title: [],
            img_data: [],
            count: 30
        }
    },
    methods: {
        titl_show() {
            console.log(this)
        },
        load () {
            // this.count += 2
        },
        // 上一章
        back_car() {
            let index = this.$store.state.index
            let manhua = this.$store.state.manhua
            // 判断倒序还是正序
            if(this.$store.state.temp == false){
                if(index != manhua.length - 1){
                    let parms = {
                        idx: manhua[index+1].idx,
                        passage: manhua[index+1].passage
                    }
                this.$axios.post('api/get_imgs/', parms).then(response => {
                    this.img_data = response.data.img_data
                    this.$store.commit('setindex', index + 1)
                    localStorage.setItem('index', index + 1)
                    localStorage.setItem(`passage${this.idx}`, manhua[index+1].passage)
                    window.scrollTo(0,0);
                    })
                }
                else{
                    alert("这是第一章")
                }
            }
            else{
                if(index != 0){
                    let parms = {
                        idx: manhua[index-1].idx,
                        passage: manhua[index-1].passage
                    }
                this.$axios.post('api/get_imgs/', parms).then(response => {
                    this.img_data = response.data.img_data
                    this.$store.commit('setindex', index - 1)
                    localStorage.setItem('index', index - 1)
                    localStorage.setItem(`passage${this.idx}`, manhua[index-1].passage)
                    window.scrollTo(0,0);
                    })
                }
                else{
                    alert("这是第一章")
                }
            }
            
        },
        // 下一章
        next_car() {
            let index = this.$store.state.index
            let manhua = this.$store.state.manhua
            // 判断倒序还是正序
            if(this.$store.state.temp == false){
                if(index != 0){
                    let parms = {
                        idx: manhua[index-1].idx,
                        passage: manhua[index-1].passage
                    }
                    this.$axios.post('api/get_imgs/', parms).then(response => {
                        this.img_data = response.data.img_data
                        this.$store.commit('setindex', index - 1)
                        localStorage.setItem('index', index - 1)
                        localStorage.setItem(`passage${this.idx}`, manhua[index-1].passage)
                        window.scrollTo(0,0);
                        })
                    }
                else{
                    alert("这是最后一章")
                }
            }
            else{
                if(index != manhua.length - 1){
                    let parms = {
                        idx: manhua[index+1].idx,
                        passage: manhua[index+1].passage
                    }
                this.$axios.post('api/get_imgs/', parms).then(response => {
                    this.img_data = response.data.img_data
                    this.$store.commit('setindex', index + 1)
                    localStorage.setItem('index', index + 1)
                    localStorage.setItem(`passage${this.idx}`, manhua[index+1].passage)
                    window.scrollTo(0,0);
                    })
                }
                else{
                    alert("这是最后一章")
                }
            }
        },
        choos(passage, index) {
            let parms = {
                idx: this.idx,
                passage: passage
            }
            this.$axios.post('api/get_imgs/', parms).then(response => {
                this.img_data = response.data.img_data
                this.$store.commit('setindex', index)
                localStorage.setItem('index', index)
                localStorage.setItem(`passage${this.idx}`, passage)
            })
        }
    },
}
</script>

<style scoped>
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
    /* @keyframes title_show{
        from{
            transform: translateX(0px);
        }
        to{
            transform: translateX(-250px);
        }
    } */
    .zhangjie{
        overflow-y: auto;
        position: fixed;
        left: 0;
        top: 170px;
        width: 250px;
        height: 350px;
        background-color: #303133;
        animation: title_show 1s;
    }
    .zhangjie a{
        display: block;
        margin-right: auto;
        margin-left: auto;
        height: 30px;
        background-color: #303133;
        text-decoration: none;
        color: #b0b0b0;
    }
    .zhangjie a:hover{
        background-color: #606266;
    }
    .zhangjie div{
        height: 30px;
        margin: 10px;
    }
    .title_top{
        position: fixed;
        top: 140px;
        width: 250px;
        height: 30px;
        text-align: center;
        background-color: #181819;
        color: white;
    }
    
    .zhangjie::-webkit-scrollbar {/*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 5px;
        scrollbar-arrow-color: red;
    }
    .zhangjie::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgb(0, 0, 0);
        background: rgb(247, 246, 246);
        scrollbar-arrow-color: red;
    }

    .zhangjie::-webkit-scrollbar-track { /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
        border-radius: 0;
        background: rgba(0,0,0,0);
    }
    .title_bt{
        position: fixed;
        left: 250px;
        top: 280px;
        text-align: center;
        color: white;
        width: 40px;
        height: 68px;
        background-color: #303133;
        cursor: pointer;
    }
    
</style>