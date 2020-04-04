const { writeConfig, readConfig } = require('./config-proxy')



writeConfig({name: '四叶草', keys: ['110103030170']}).then(info => {
  console.log('* 写入结果', info)
})
