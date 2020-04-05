const chalk = require('chalk');
const { program } = require('commander');
const package = require('../package.json');

program.addHelpCommand(false)
program.version(package.version); /* ./commander.js -V */

program.command('config').option('-k, --key <key>', 'TinyPNG压缩用的apiKey')

// program.usage(null).

// program.help((e) => {
//   console.log('* help', e)
// })
// program.outputHelp((e) => {
//   console.log('* outputHelp', e)
// })



program.parse(process.argv);


// .option('-n, --name <name>', '名称', '默认值')
// .option('-o, --out', '输出路径')
// .action((options) => {
//   console.log('* options', options)
// })

// program.on('command:*', function(operands){
//   console.log('* ', operands)
// })

// program.command('config')
// 	.alias('c')
// 	.description('配置项')
// 	.option('-k, --key <key>', 'TinyPNG压缩用的apiKey')
// 	.option('-o, --output-path <outputPath>', '存放输出图片的路径')
// 	.action(require('./config').configHandler)

module.exports = program;
