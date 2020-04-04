#!/usr/bin/env node

const { saveToJson, filterInTree, readDirTree, CWD, getInput, print, chalk, log } = require('./func/index');


const { step0 } = require('./src/step0-check');
const { step1 } = require('./src/step1-import-path');
const { step2 } = require('./src/step2-tree');
const { step3 } = require('./src/step3-organize-data');
const { step4 } = require('./src/step4-compress');


log.bold(`······ 压缩工具 ······
`);

step0()
	.then(config => step1(config))
	.then(imgPath => step2(imgPath))
	.then(filteredTree => step3(filteredTree))
	.then(selectItems => step4(selectItems))
	.catch(err => {
		print.error(JSON.stringify(err));
	});
