const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 解决跨域问题
  devServer: {
    port: 8008,
    // disableHostCheck: true,
    // client: {
    //     webSocketURL: 'wss://490k23650j.zicp.fun',
    // },
    proxy:{
        '/api':{
            // wss: true,
            target:'http://192.168.44.1:8000/',//跨域请求的公共地址
            // target:'http://127.0.0.1:8008/',
            changeOrigin:true, //是否开启跨域，值为 true 就是开启， false 不开启
            pathRewrite:{
                '^/api':''//注册全局路径， 但是在你请求的时候前面需要加上 /api  
            }
        },
    },
    allowedHosts: [
        'jmsblog.nat123.net', // 允许访问的域名地址，即内网穿透的地址
        '49023y65u0.qicp.vip',
        'q8f3ro.39nat.com',
        '490k23650j.zicp.fun',
        'manyan.w1.luyouxia.net'
    ],
},
})
