const { saveToJson, filterInTree, readDirTree, CWD, getInput, print, chalk, log } = require('../func/index');

module.exports = async function(imgPath) {
	const tree = readDirTree(imgPath);
	const filteredTree = filterInTree(tree, /\.(jpg|jpeg|png)$/i);
	return filteredTree;
}

