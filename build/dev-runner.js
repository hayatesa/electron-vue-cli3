#!/usr/bin/env node

const semver = require('semver')
const chalk = require('chalk')
const path = require('path')
const Service = require('@vue/cli-service/lib/Service')
const { spawn } = require('child_process')
const electron = require('electron')
const webpack = require('webpack')
const requiredVersion = require('@vue/cli-service/package.json').engines.node
const mainConfig = require('./webpack.main.config')

if (!semver.satisfies(process.version, requiredVersion)) {
  console.error(chalk.bgRed(' ERROR '), chalk.red(`您正在使用的Node版本 ${process.version}, 但是需要的Node版本 ${requiredVersion}，请升级您的Node版本.`))
  process.exit(1)
}

const args = {
  _: ['serve'],
  modern: false,
  report: false,
  'report-json': false,
  watch: false,
  open: false,
  copy: false,
  https: false,
  verbose: false,
  // 自定义的
  port: 8090
}

function startRenderProcess () {
  return new Promise((resolve, reject) => {
    const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())
    service.run('serve', args)
      .then(() => {
        resolve()
      })
      .catch(err => {
        console.error(err)
        process.exit(1)
      })
  })
}

let electronProcess
let manualRestart = false

function startMainProcess () {
  return new Promise((resolve, reject) => {
    // mainConfig.entry.main = [path.join(__dirname, '../main/index.dev.js')].concat(mainConfig.entry.main)

    const compiler = webpack(mainConfig)

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err)
        return
      }
      resolve()
    })
  })
}

function startElectron () {
  electronProcess = spawn(electron, ['--inspect=5858', path.join(__dirname, '../dist/electron/main.js')])

  electronProcess.stdout.on('data', data => {
    console.log(data.toString())
  })
  electronProcess.stderr.on('data', data => {
    console.error(data.toString())
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

function start () {
  Promise.all([startRenderProcess(), startMainProcess()])
    .then(() => {
      startElectron()
    })
    .catch(err => {
      console.error(err)
    })
}

start()
