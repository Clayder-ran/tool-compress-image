const { sleep } = require('./index');

const ora = require('ora');
const chalk = require('chalk')

// async function func(){
//   const spinner = ora({
//     interval: 120,
//     text: `${chalk.yellow('开始压缩')}`,
//     spinner: 'dots',  /* 动画模式 */
//     color: 'yellow'
//   }).start();

//   /* 动画样式 */
//   // spinner.spinner = {
//   //   frames: ['∙∙∙∙∙∙', '●∙∙∙∙∙', '∙●∙∙∙∙', '∙∙●∙∙∙', '∙∙∙●∙∙', '∙∙∙∙●∙', '∙∙∙∙∙●']
//   // }

//   // const spinner = ora('Loading unicorns').start();
//   await sleep(4000)
//   spinner.color = 'green'; /* 动画颜色 */
//   // spinner.indent = 3 /* 距行左的缩进 */
//   spinner.text = `${chalk.green('第1份文件压缩成功')}`;
//   // spinner.stop()
//   spinner.stopAndPersist()

//   // await sleep(3000)
//   // spinner.text = '第二份文件压缩成功'
//   // await sleep(2000)
//   // spinner.succeed(`${chalk.redBright('打包成功')}`).clear()
//   // // spinner.info('嘿嘿')

//   // await sleep(1000)
//   // process.exit()
// }


function start(text = '') {
	return ora({
		interval: 120,
    text: `${chalk.yellow(text)}
    `,
		spinner: 'dots', /* 动画模式 */
		color: 'yellow'
	}).start();
}

function stop(spinner, text = '') {
	spinner.text = `${chalk.green(text)}`;
	spinner.stopAndPersist();
}

module.exports = {
	Spinner: {
		start,
		stop
	}
};
