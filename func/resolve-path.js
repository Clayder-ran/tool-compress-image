const { CWD, homedir } = require('./my-path');
const { isBoolean } = require('./my');
const path = require('path');
const { fsExists, fsStat, fsExistsSync, fsStatSync } = require('./fs');

function mainResolve(inputPath) {
	inputPath = inputPath.trim();
	if (/^\//g.test(inputPath)) {
		/* '绝对路径：' */
	} else if (/^~/g.test(inputPath)) {
		inputPath = inputPath.replace(/~\/?/g, './');
		inputPath = path.resolve(homedir, inputPath);
	} else {
		/* 相对命令执行处 */
		inputPath = path.resolve(CWD, inputPath);
	}
	return inputPath;
}

/**
 * 根据输入内容, 解析出路径
 * @param {string} originPath 路径
 * @param {boolean} isDictionary 是否是文件夹; 若有此参数, 会继续判断文件类型;
 */
function resolvePath(originPath = '', isDictionary) {
	let inputPath = mainResolve(originPath);

	/* 判断: 是否存在 */
	return fsExists(inputPath).then((exist) => {
		if (exist) {
			/* 是否继续判断: 文件夹|文件 */
			if (isBoolean(isDictionary)) {
				return fsStat(inputPath).then((stat) => {
					if (isDictionary && stat.isDirectory()) {
						return inputPath;
					} else if (!isDictionary && stat.isFile()) {
						return inputPath;
					} else {
						return Promise.reject({ msg: `${originPath} 不是 ${isDictionary ? '文件夹' : '文件'}类型` });
					}
				});
			} else {
				return inputPath;
			}
		} else {
			return Promise.reject({ msg: `${originPath} 路径不存在` });
		}
	});

	/* 可能有 判断读写权限 */
}

resolvePath.sync = (originPath = '', isDictionary) => {
	let inputPath = mainResolve(originPath);

	try {
		const exist = fsExistsSync(inputPath);
		if (exist) {
      if(isBoolean(isDictionary)){
        const stat = fsStatSync(inputPath)
        if (isDictionary && stat.isDirectory()) {
          /* 文件夹 */
          return inputPath;
        } else if (!isDictionary && stat.isFile()) {
          /* 文件 */
          return inputPath;
        } else {
          return ''
          // throw Error({ msg: `${originPath} 不是 ${isDictionary ? '文件夹' : '文件'}类型` })
        }
      }else{
        return inputPath
      }
		} else {
      return ''
      // throw Error({ msg: `${originPath} 路径不存在` })
		}
	} catch (err) {
    return err
  }
};

module.exports = {
	resolvePath,
};
