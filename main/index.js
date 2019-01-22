const { app, BrowserWindow } = require('electron')

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

let mainWindow

// 窗口配置程序运行窗口的大小
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })
  mainWindow.loadURL(winURL)
  mainWindow.on('close', () => {
    mainWindow = null
  })
  mainWindow.on('resize', () => {
    mainWindow.reload()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow()
  }
})
