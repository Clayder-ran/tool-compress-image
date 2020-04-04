const { saveToJson, CWD, print, chalk, log, prompts } = require('../func/index');
const path = require('path')
const OS = require('os')


async function step1(){
  return await prompts([{
    type: 'text',
    name: 'targetPath',
    message: '要压缩图片在哪里：',
    onRender(){
      this.msg = chalk.bold.cyan('要压缩图片在哪里：') 
    }
  }]).then(({targetPath}) => {
    
    targetPath = targetPath.trim()
    // console.log('* targetPath: ', targetPath)
    
		if (/^\//g.test(targetPath)) {
      /* '绝对路径：' */
		}else if(/^~/g.test(targetPath)){
      targetPath = targetPath.replace(/~\/?/g, './')
      targetPath = path.resolve(OS.homedir(),targetPath)
      // console.log('* next targetPath', targetPath)
    } else {
			/* 相对命令执行处 */
      targetPath = path.resolve(CWD, targetPath);
    }

    // log(`查找路径: ${targetPath}`)
    return targetPath
	})
}

module.exports = {
  step1
}



