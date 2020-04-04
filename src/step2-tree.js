const { saveToJson, filterInTree, readDirTree, CWD, getInput, print, chalk, log } = require('../func/index');

async function step2(imgPath) {
	const tree = readDirTree(imgPath);
	const filteredTree = filterInTree(tree, /\.(jpg|jpeg|png)$/i);
	return filteredTree;
}

module.exports = {
	step2
};
