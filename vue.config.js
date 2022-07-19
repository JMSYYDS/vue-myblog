const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 解决跨域问题
  devServer: {
    proxy:{
        '/api':{
            target:'http://192.168.44.1:8000/',//跨域请求的公共地址
            changeOrigin:true, //是否开启跨域，值为 true 就是开启， false 不开启
            pathRewrite:{
                '^/api':''//注册全局路径， 但是在你请求的时候前面需要加上 /api  
            }
        }
    }
},
})
