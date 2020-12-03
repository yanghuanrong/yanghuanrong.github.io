const path = require('path')
console.log(process.env.NODE_ENV)
module.exports = {
    // 扩展 webpack 配置
    publicPath: './',
    chainWebpack: config => {
        
        config.resolve.alias
            .set('@blog', path.resolve('blog'))

        config.module.rule('md')
            .test(/\.md/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use(path.resolve('blog/config/md-loader.js'))
            .loader(path.resolve('blog/config/md-loader.js'))
    }
}