const { prompts, chalk } = require('../func/index');
const { writeConfig, readConfig } = require('../init/config-proxy');

module.exports = async function(selectItems) {
	if (Array.isArray(selectItems) && selectItems.length === 0) {
		return Promise.reject({ msg: '未选择图片' });
	}

	/* 读取配置 */
	let { outputFilename = 'output-${name}' } = await readConfig();

	return prompts(
		{
			type: 'text',
			name: 'outputFilename',
			message: '图片名称模板：',
			initial: outputFilename,
			onRender() {
				this.msg = chalk.cyan('图片名称模板：') + chalk.gray('可使用 ${name} ${index} ${date} ${time} 作为变量') + '\n';
			},
		},
		{
			onCancel() {
				process.exit();
			},
		}
	)
		.then(({ outputFilename = '' }) => {
			/* 保存 */
			return writeConfig({ outputFilename });
		})
		.then((config) => {
			return selectItems;
		}).catch(console.log);
}


