const path = require('path')
const OS = require('os')

const CWD = process.cwd()
/* 桌面的路径 */
const homedir = OS.homedir()
const desktopPath = path.resolve(homedir, './Desktop')

module.exports = {
  CWD,
  homedir,
  desktopPath
}