const { saveToJson, CWD, getInput, print, log, prompts, queue, Spinner } = require('../func/index');
const path = require('path');
const { Tinify } = require('./Tinify');

async function step4(compressImages) {
	/* 改为, 同步串行方式 */
	return queue(
		compressImages.map(({ fullPath = '' }) => {
			return function() {
				let dirname = path.dirname(fullPath); /* 路径 */
				let basename = path.basename(fullPath); /* 文件名 */
				basename = 'pressed-' + basename; /* 压缩后的名称 */

				/* 压缩完成的输出文件路径 */
        const outputPath = path.resolve(dirname, basename);
        
				let spinner = Spinner.start(`开始压缩: ${fullPath}`);

				return Tinify.fromFile(fullPath)
					.toFile(outputPath)
					.then(res => {
						Spinner.stop(spinner, `完成: ${outputPath}`);

						return {
							dirname,
							basename,
							outputPath
						};
					});
			};
		})
	);
}

module.exports = {
	step4
};
