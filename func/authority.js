const fs = require('fs');

const checkPermission = function(file, mask) {
	return new Promise((resolve, reject) => {
		fs.stat(file, function(error, stats) {
			if (error) {
				reject(error);
			} else {
				resolve(!!(mask & parseInt((stats.mode & parseInt('777', 8)).toString(8)[0])));
			}
		});
	});
};

/**
 * 是否可以执行
 * @param {string} path 路径 - The title of the book.
 * @returns {Promise<boolean>} 结果
 */
const canExecute = path => {
	return checkPermission(path, 1);
};

/**
 * 是否支持读取
 * @param {string} path 路径
 * @returns {Promise<boolean>} 结果
 */
const canRead = path => {
	return checkPermission(path, 4);
};

/**
 * 是否支持写
 * @param {string} path 路径
 * @returns {Promise<boolean>} 结果
 */
const canWrite = path => {
	return checkPermission(path, 2);
};

module.exports = {
	canExecute,
	canRead,
	canWrite
};
