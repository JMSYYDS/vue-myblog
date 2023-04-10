<template>
    <div class="box_top">
        <div class="box_in">
            <div class="manhua">
                <img :src="img_data">
                <div class="wenzi">
                    <h1>{{ p_data.title }}</h1>
                    <p>作者：{{ p_data.author }}</p>
                    <p><span>状态：{{ p_data.state }}</span><span>{{ p_data.update_time }}</span></p>
                    <p style="font-size: 14px; margin-top:15px;">{{ p_data.jianjie }}</p>
                    <div style="text-align: left;margin-top: 20px">
                        <a :href="'#/cartoon/detail/'+id+'/'+history" target="_blank">
                            <el-button type="success" style="width: 200px">继续阅读</el-button>
                        </a>
                    </div>
                </div>
            </div>
            <a href="javascript:" class="resver" @click="resver">{{ sort }}</a>
            <div class="lis">
                <a
                v-for="(item,index) in passage_data"
                :key="item.id"
                @click="keep_car(index, item.passage, item.idx)"
                target="_blank"
                >
                {{ item.name }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import {ZhanshiCartoon} from '@/api/manhua'
export default {
    props: ['id'],
    async created() {
        let now_time = (new Date(Date.now())).toLocaleString()
        let data = {
            id: this.id,
            readTime: now_time,
            username: localStorage.getItem('mobile')
        }
        let zhanshi_data = await ZhanshiCartoon(data)
        if(zhanshi_data.state == 'OK'){
            this.img_data = zhanshi_data.img_data
            this.img_data = zhanshi_data.img_data
            this.p_data = zhanshi_data.p_data
            this.passage_data = zhanshi_data.passage_data
            this.$store.commit('setmanhua', zhanshi_data.passage_data)
            if(localStorage.getItem(`passage${this.id}`) == null){
                localStorage.setItem(`passage${this.id}`, zhanshi_data.passage_data[0].passage)
            }
        }
        // this.$axios.post('api/main_cartoon/', parms).then(response => {
        //     this.img_data = response.data.img_data
        //     this.p_data = response.data.p_data
        //     this.passage_data = response.data.passage_data
        //     this.$store.commit('setmanhua', response.data.passage_data)
        //     if(localStorage.getItem(`passage${this.id}`) == null){
        //         localStorage.setItem(`passage${this.id}`, response.data.passage_data[0].passage)
        //     }
        // })
    },
    data() {
        return {
            // 历史记录
            sort: '倒序',
            img_data: '',
            p_data: {},
            passage_data: [],
            ind: 0
        }
    },
    computed: {
        history() {
            return localStorage.getItem(`passage${this.id}`)?localStorage.getItem(`passage${this.id}`):this.passage_data[this.passage_data.length-1].passage
        },
    },
    methods: {
        resver() {
            this.passage_data = this.passage_data.reverse()
            if(this.sort == '倒序'){
                this.sort = '正序'
                this.$store.commit('settemp', true)
            }
            else{
                this.sort = '倒序'
                this.$store.commit('settemp', false)
            }
            this.$store.commit('setmanhua', this.passage_data)
        },
        keep_car(index, passage, idx) {
            if(this.$store.state.temp === false) {
                this.ind = index
            }else(
                this.ind = this.passage_data.length - (index + 1)
            )
            this.$store.commit('setindex', this.ind)
            localStorage.setItem('index', this.ind)
            localStorage.setItem(`passage${this.id}`, passage)
            this.$router.push({
                path: '/cartoon/detail/'+idx+'/'+passage,
                query: {
                    id: this.id,
                    cartoonName: this.p_data.title,
                    cartoonImg: this.img_data,
                    description: this.p_data.jianjie,
                }
            })
        }
    },
}
</script>

<style scoped>
    .box_top{
        height: 400px;
        background-image: url('../../assets/9.jpg');
        /* filter: blur(10px); */
    }
    .box_in{
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        min-height: 800px;
        width: 80%;
        margin-top: 600px;
        margin-right: auto;
        margin-left: auto;
        background-color: white;
    }
    .manhua{
        position: relative;
        width: 100%;
        height: 250px;
        margin-top: 0;
        background-color: white;
    }
    .manhua img{
        position: absolute;
        left: 40px;
        top: -40px;
        width: 240px;
        height: 314px
    }
    .wenzi{
        position: absolute;
        top: 20px;
        left: 300px;
    }
    .wenzi h1{
        text-align: left;
    }
    .wenzi span{
        padding-right: 50px;
    }
    .wenzi p{
        width: 700px;
        margin-top: 10px;
        text-align: left;
        font-size: 14px;
        color: gray;
    }
    .resver{
        position: absolute;
        top:490px;
        left: 170px;
        text-decoration: none;
        color: gray;
    }
    .lis{
        margin-top: 80px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        cursor: pointer;
    }
    .lis a{
        display: block;
        padding-top: 6px;
        margin: 10px;
        width: 260px;
        height: 36px;
        text-decoration: none;
        background-color: #f6f6f6;
        color: black;
    }
    .lis a:hover{
        color: white;
        background-color: #9ad2c9;
    }
</style>