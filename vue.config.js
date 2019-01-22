module.exports = {
  publicPath: './',
  chainWebpack: config => {
  },
  configureWebpack: config => {
    config.target = 'electron-renderer'
  }
}
