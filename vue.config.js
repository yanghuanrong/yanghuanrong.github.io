const path = require('path')

module.exports = {
    // 扩展 webpack 配置
    publicPath: process.env.NODE_ENV === "production" ? "/vue-running" : "/",
    chainWebpack: config => {
        config.resolve.alias
            .set('@blog', path.resolve('blog'));

        config.module.rule('md')
            .test(/\.md/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use(path.resolve('lib/index.js'))
            .loader(path.resolve('lib/index.js'))
    }
}