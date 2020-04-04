const chalk = require('chalk'); // 打印带颜色的文字
const rm = require('rimraf'); // 删除文件和文件夹
const ora = require('ora'); //  打包进度动画

let log = (...arg) => console.log(chalk.cyan(...arg))
log.bold = (...arg) => log(chalk.cyanBright.bold(...arg))

/**
 * 彩色输出
 * @param {string} info 
 */
function print(info){
  log(chalk.cyan(info))
}
print.cyan = print
print.error = (info) => {
  log(chalk.red(JSON.stringify(info)))
}



module.exports = {
  print,
  chalk,
  log
}

