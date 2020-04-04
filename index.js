#!/usr/bin/env node

const { saveToJson, filterInTree, readDirTree, CWD, getInput, print, chalk, log } = require('./func/index');

/* date time name */

const step1 = require('./src/step1-api-key');
const step2 = require('./src/step2-export-path');
const step3 = require('./src/step3-import-path');
const step4 = require('./src/step4-tree');
const step5 = require('./src/step5-organize-data');
const step6 = require('./src/step6-name-pattern');
const step7 = require('./src/step7-compress');

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

process.addListener('unhandledRejection', (err) => {
	console.log('全局handler: ', err);
});
