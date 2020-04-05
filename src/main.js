const { saveToJson, filterInTree, readDirTree, CWD, getInput, print, chalk, log } = require('../func/index');

const step1 = require('./step1-api-key');
const step2 = require('./step2-export-path');
const step3 = require('./step3-import-path');
const step4 = require('./step4-tree');
const step5 = require('./step5-organize-data');
const step6 = require('./step6-name-pattern');
const step7 = require('./step7-compress');

if (process.argv.length <= 2) {
	log.bold(`······ 压缩图片工具 ······
`);

	step1()
		.then((config) => step2(config))
		.then((config) => step3(config))
		.then((imgPath) => step4(imgPath))
		.then((filteredTree) => step5(filteredTree))
		.then((selectItems) => step6(selectItems))
		.then((selectItems) => step7(selectItems))
		.catch((err) => {
			// print.error(err);
			typeof err === 'object' && err.msg && print.error(err.msg);
		});
}
