<template>
<div style="background-color: rgb(245, 245, 245)">
	<div class="edit_menu">
			<div style="margin:13px 0 0 50px;" @click="goback">
				<el-link icon="el-icon-arrow-left">返回</el-link>
			</div>
			<div style="margin:5px 50px 0 0" @click="success">
				<el-button type="primary">发布</el-button>
			</div>
	</div>
	<div style="border-top: 1px solid #ccc;" class="edit_content">
		<Toolbar
				style="border-bottom: 1px solid #ccc;position: fixed;z-index: 99;"
				:editor="editor"
				:defaultConfig="toolbarConfig"
				:mode="mode"
		/>
		<div class="content">
			<div class="title_container">
				<input v-model="title" placeholder="请输入标题">
			</div>
			<Editor
					style="min-height: 1300px"
					v-model="html"
					:defaultConfig="editorConfig"
					:mode="mode"
					@onCreated="onCreated"
			/>
		</div>
	</div>
</div>
</template>

<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {SetEssay} from '@/api/community'

export default Vue.extend({
    components: { Editor, Toolbar },
    data() {
        return {
            editor: null,
            html: '',
            toolbarConfig: {
							excludeKeys: ["uploadVideo", "insertVideo"] // 数组里是不需要的菜单属性
						},
            editorConfig: {
							placeholder: '正文...',
							scroll:false,
							MENU_CONF: {
								uploadImage: {
									server: 'api/upload_text_img/',
								},
								uploadVideo: {
									server: 'api/upload_text_video/',
								}
							}
						},
            mode: 'default', // or 'simple'
						title: ''
        }
    },
    methods: {
        onCreated(editor) {
          this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
					// console.log(this.editor.getConfig())
        },
        async success() {
					if(this.title == ''){
						this.$message.warning("请输入标题")
						return
					}
					if(this.editor.getText() == ''){
						this.$message.warning("请输入正文内容")
						return
					}
					let now_time = (new Date(Date.now())).toLocaleString()
					const html = this.editor.getHtml()
					console.log(html)
					let data_res = await SetEssay({
						essayAuthor: localStorage.getItem('token'),
						essayTitle: this.title,
						essayContent: html,
						essayTime: now_time
					})
					if(data_res.state === 'OK'){
						this.$router.push('/community')
					}
        },
				goback() {
					this.$router.push('/community')
				}
    },
    mounted() {
        // 模拟 ajax 请求，异步渲染编辑器
        setTimeout(() => {
            
        }, 1500)
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
})
</script>
<style scoped>
    .edit_content{
        width: 75%;
        margin: auto;
        padding-top: 50px;
				padding-bottom: 100px;
    }
		.edit_menu{
			width: 100%;
			height: 50px;
			background-color: white;
			position: fixed;
			z-index: 99;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #ccc;
		}
    .content{
        width: 850px;
        margin: 80px auto 0 auto;
        padding: 20px 50px 50px 50px;
        border: 1px solid #e8e8e8;
        box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
        background-color: white;
    }
		.title_container{
			padding: 20px 0;
    	border-bottom: 1px solid #e8e8e8;
		}
		.title_container input{
			font-size: 30px;
			border: 0;
			outline: none;
			width: 100%;
			line-height: 1;
		}
</style>
<style src="@wangeditor/editor/dist/css/style.css">
    
</style>