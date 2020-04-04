const { readConfig, writeConfig } = require('../init/config-proxy');
const { saveToJson, CWD, print, chalk, log, prompts, fsExists, resolvePath } = require('../func/index');

module.exports = () =>
	readConfig().then((config) => {
    let { keys = [] } = config;
    
		if (Array.isArray(keys)) {
			/* 没有key */
			if (keys.length === 0) {
				console.log(chalk.cyan(`请先在 https://tinypng.com/developers 获取压缩用的API key`));

				return prompts(
					{
						type: 'text',
						name: 'key',
						validate(input = '') {
							if (input.length === 32) {
								return true;
							} else {
								return '请输入合格的API key值';
							}
						},
						message: chalk.cyan('API key 值： '),
						hint: '获取地址: https://tinypng.com/developers',
					},
					{
						onCancel() {
							process.exit();
						},
					}
				).then(({ key }) => {
					// 合格的key值
					key && keys.push(key);
					return writeConfig({ keys });
				});
			} else {
				return config;
			}
		}
	}).catch(console.log)
