const { readConfig, writeConfig } = require('../init/config-proxy');
const { saveToJson, CWD, print, chalk, log, prompts, fsExists, resolvePath } = require('../func/index');

module.exports = (config) => {
	let { outputPath = '' } = config;

	return prompts(
		{
			type: 'text',
			style: 'default' /* default, password, invisible, emoji */,
			name: 'outputPath',
			message: chalk.cyan('压缩后的图片存储在: '),
			initial: outputPath,
			validate(input = '') {
				return true;
			},
			instruction: '提示语',
			onRender() {
				/* this.firstRender */

				try {
					let validPath = resolvePath.sync(this.value, true);
					let check = '✔';
					if (this.firstRender || validPath.length === 0) {
						check = '?';
					}

					this.msg = chalk.cyan('压缩后的图片存储在： ') + chalk.yellow(check);
					// this.hint = chalk.cyan(check)
				} catch (err) {
					console.log('* err', err);
				}
			},
		},
		{
			onCancel() {
				process.exit();
			},
			onSubmit(originConfig, answer, answerObj) {
				return false;
			},
		}
	)
		.then(({ outputPath }) => {
			/* 判断文件夹是否存在 */
			return resolvePath(outputPath, true);

			/* 1. 解析路径 */
			/* 2. 是否是文件夹 */
			/* 3. 判断文件夹权限, 可读可写 */
		})
		.then((outputPath) => writeConfig({ outputPath })).catch(console.log)
};
