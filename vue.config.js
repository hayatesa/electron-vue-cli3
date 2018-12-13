module.exports = {
  baseUrl: './',
  chainWebpack: config => {
  },
  configureWebpack: config => {
    config.target = 'electron-renderer'
  }
}
