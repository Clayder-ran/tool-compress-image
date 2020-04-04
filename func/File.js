const { fs, promisify } = require('./fs')
const path = require('path');
const { excludeNames } = require('../common/config');
const { canRead, canWrite, canExecute } = require('./authority');

const maxDeep = 20; /* 最大查询深度 */
let deep = 0; /* 查询深度 */
/**
 * 递归解析文件夹路径;
 * 结构化文件路径
 * @param {url} dirPath
 */
function readDirTree(dirPath) {
  try {
    // console.log('* dirPath', dirPath)
    /* 测试路径是否支持读写 */
    // if(dirPath === '/Users/ran/Documents/python/serVirtual/venv/include/python2.7'){
    //   let stat = fs.statSync(dirPath);
    //   console.log('* permitted', stat)
    //   console.log('* permitted', (stat.mode & parseInt('777', 8)).toString(8))
    // }
		fs.accessSync(dirPath, fs.constants.R_OK | fs.constants.W_OK);
    // console.log('* dirPath after', dirPath)

		deep++;

		if (deep < maxDeep) {
			let dirPathChild = null;
			try {
				dirPathChild = fs.readdirSync(dirPath);
			} catch (error) {
				// console.log('读取文件夹错误: ', error);
				dirPathChild = [];
			}
			// console.log('* 可以读取', dirPath, dirPathChild)

			dirPathChild = dirPathChild
				.filter(item => !excludeNames.includes(item))
				.map(item => {
					/* 路径 */
          let fullPath = path.resolve(dirPath, item);
					// console.log('* item before', fullPath)
					try {
						/* 判断: 是否文件 */
						let stat = fs.statSync(fullPath);
						const mode = (stat.mode & parseInt('777', 8)).toString(8);
						const isDirectory = stat.isDirectory();

						// console.log('* item', fullPath, isDirectory, mode)
						/* 单项结构: 路径/是否文件/名称/子 */
						/* 644: 只有拥有者有读写权限；而属组用户和其他用户只有读权限 */
						/* 755: 拥有者有读、写、执行权限；而属组用户和其他用户只有读、执行权限 */
						return {
							fullPath,
							isDirectory,
							isFile: stat.isFile(),
							key: item,
							mode,
							value: isDirectory && mode === '755' ? readDirTree(fullPath) : item
						};
					} catch (error) {
            console.log('* File.js 1', error)
            return null
          }
				});

			deep--;
			return dirPathChild;
		} else {
			deep--;
			return [];
		}
	} catch (error) {
		// console.log('* File.js 2', dirPath, error);

		// Promise.all([canRead(dirPath), canWrite(dirPath)]).then((res) => console.log(dirPath,res))

		return null;
	}
}

/**
 * 在树中过滤合格的文件
 * @param {RegExp} reg 过滤用的正则表达式
 */
function filterInTree(tree, reg) {
  /* 获取全部项目 */
  let treeArray = getTreeArray(tree)

  /* 过滤出 图片 */
	return treeArray.filter(item => reg.test(item.fullPath));
}

/**
 * 解析结构树为数组
 * @param {*} root root路径
 * @param {*} tree 结构树
 * @returns {Array<object>} 结果
 */
function getTreeArray(tree) {
	let res = [];

	Array.isArray(tree) && tree.forEach(item => {
    // console.log('* item', item.fullPath, item.isFile, item.value)
		if (item.isFile) {
			res.push(item);
		} else if(Array.isArray(item.value)) {
			res = res.concat(getTreeArray(item.value));
		}
	});

	return res;
}

module.exports = {
	readDirTree,
	filterInTree
};
