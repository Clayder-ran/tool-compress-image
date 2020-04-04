const { readConfig, writeConfig } = require('../init/config-proxy');
const { saveToJson, CWD, print, chalk, log, prompts, fsExists } = require('../func/index');

const step0 = () => readConfig()
	.then(config => {
		let { keys = [] } = config;
		if (Array.isArray(keys)) {
			/* 没有key */
			if (keys.length === 0) {
				console.log(chalk.yellowBright.bold(`请先在 https://tinypng.com/developers 获取压缩用的API key`));

				return prompts({
					type: 'text',
					name: 'key',
					message: chalk.yellow('API key 值'),
					hint: '获取地址: https://tinypng.com/developers'
				}).then(({ key }) => {
					// console.log('* key', key);

					keys.push(key);
					return writeConfig({ keys });
				});
			} else {
				return config;
			}
		}
	})
	.then(config => {
		let { outputPath = '' } = config;

		return prompts({
			type: 'text',
			name: 'outputPath',
			message: chalk.yellow('压缩后, 存储文件在: '),
			initial: outputPath
		}).then(({ outputPath }) => {
			// console.log('* outputPath', outputPath);

      /* 判断文件夹是否存在 */
      return fsExists(outputPath).then(exist => {
        if(!exist){
          return Promise.reject({msg: '文件夹不存在'})
        }else{
          /* 判断文件夹权限, 可读可写 */
          return writeConfig({outputPath})
        }
      })
		})
	}).catch(err => console.log(err))


module.exports = {
  step0
}