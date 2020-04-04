const { sleep, prompts, queue, Spinner, filenameTemplate } = require('../func/index');
const { readConfig } = require('../init/config-proxy');
const path = require('path');
const { Tinify } = require('./Tinify');

module.exports = async function (compressImages) {
	/* 读取配置 */
	let { outputPath = '', outputFilename = '' } = await readConfig();

	/* 改为, 同步串行方式 */
	return queue(
		compressImages.map(({ fullPath = '' }, index) => {
			return function () {
				// let dirname = path.dirname(fullPath); /* 路径 */
				let extname = path.extname(fullPath);
				let basename = path.basename(fullPath).replace(extname, ''); /* 文件名(不含格式) */
				/* 输出文件名 */
				basename = filenameTemplate(outputFilename, index, basename) + extname;

				/* 输出文件路径 */
				const outputFullname = path.resolve(outputPath, basename);
				/* 动画开始 */
				let spinner = Spinner.start(`压缩中: ${fullPath}`);
				return Tinify.fromFile(fullPath)
					.toFile(outputFullname)
					.then((res) => {
						/* 动画结束 */
            Spinner.stop(spinner, `压缩完成: ${outputFullname}`);
            
					}).then(sleep.bind(null, 100)).catch(console.log)
			};
		})
	);
}
