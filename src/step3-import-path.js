const { saveToJson, CWD, print, chalk, log, prompts, resolvePath, desktopPath } = require('../func/index');
const path = require('path');
const OS = require('os');

module.exports = async function () {
	return await prompts(
		{
			type: 'text',
			name: 'targetPath',
			initial: desktopPath,
      message: '要压缩图片在哪里：',
      validate(input =''){
        return true
      },
			onRender() {
				try {
					let validPath = resolvePath.sync(this.value, true);
					let check = '✔';
					if (this.firstRender || validPath.length === 0) {
						check = '?';
					}

					this.msg = chalk.cyan('要压缩图片在哪里： ') + chalk.yellow(check);
				} catch (err) {
					console.log('* err', err);
				}
			},
		},
		{
			onCancel() {
				process.exit();
			},
		}
	).then(({ targetPath }) => {
		/* 解析输入内容为绝对路径 */
		return resolvePath(targetPath, true);
	}).catch(console.log)
}

