const path = require('path');
const { fsExists, fsReadFile, fsWriteFile,  } = require('../func/index');
const OS = require('os')

/* 桌面的路径 */
const desktopPath = path.resolve(OS.homedir(), './Desktop')

/* 默认配置 */
const defaultConfig = {
  keys: [],
  outputPath: desktopPath
}

/* 配置json文件路径 */
const individuationPath = path.resolve(__dirname, './individuation.json')

/**
 * 读取配置
 * 没有配置文件, 自动添加上
 */
function readConfig() {
	return fsReadFile(individuationPath, { encoding: 'utf-8' }).catch(err => {
    return fsWriteFile(individuationPath, JSON.stringify(defaultConfig), {encoding: 'utf-8'})
  }).then((config='') => {
    if(typeof config === 'string' && config.length === 0){
      return defaultConfig
    }else{
      return JSON.parse(config)
    }
  })
}

/**
 * 添加/更新 配置
 * @param {object} newConfig 新增的配置
 */
function writeConfig(newConfig={}) {
  return readConfig().then((config = {}) => {

    config = {
      ...defaultConfig,
      ...config,
      ...newConfig
    }

    return fsWriteFile(individuationPath, JSON.stringify(config), {
      encoding: 'utf-8'
    }).then(readConfig)
  })
}

/**
 * 是否存在配置文件
 */
function existConfig(){
  return fsExists(individuationPath)
}

module.exports = {
  existConfig,
  readConfig,
  writeConfig,
};
