const { app, BrowserWindow } = require('electron')
// 引入electron
let win

let winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:8090`
  : `file://${__dirname}/index.html`

// winURL = 'http://localhost:9080'

// 窗口配置程序运行窗口的大小
function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600
  })
  win.loadURL(winURL)
  win.webContents.openDevTools()
  win.on('close', () => {
    win = null
  })
  win.on('resize', () => {
    win.reload()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (win == null) {
    createWindow()
  }
})
