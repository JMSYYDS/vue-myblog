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
                        <a :href="'#/cartoon/detail/'+id+'/'+history">
                            <el-button type="success" style="width: 200px">继续阅读</el-button>
                        </a>
                    </div>
                </div>
            </div>
            <a href="javascript:" class="resver" @click="resver">{{ sort }}</a>
            <div class="lis">
                <a
                :href="'#/cartoon/detail/'+item.idx+'/'+item.passage"
                v-for="(item,index) in passage_data"
                :key="item.id"
                @click="keep_car(index, item.passage)"
                >
                {{ item.name }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['id'],
    created() {
        
        let parms = {
            id: this.id
        }
        this.$axios.post('api/main_cartoon/', parms).then(response => {
            this.img_data = response.data.img_data
            this.p_data = response.data.p_data
            this.passage_data = response.data.passage_data
            this.$store.commit('setmanhua', response.data.passage_data)
            if(localStorage.getItem(`passage${this.id}`) == null){
                localStorage.setItem(`passage${this.id}`, response.data.passage_data[0].passage)
            }
        })
    },
    data() {
        return {
            // 历史记录
            history: localStorage.getItem(`passage${this.id}`),
            sort: '倒序',
            img_data: '',
            p_data: {},
            passage_data: []
        }
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
        keep_car(index, passage) {
            this.$store.commit('setindex', index)
            localStorage.setItem('index', index)
            localStorage.setItem(`passage${this.id}`, passage)
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
        background-color: #409EFF;
    }
</style>