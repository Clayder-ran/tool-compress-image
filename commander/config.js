const { writeConfig, readConfig } = require('../init/config-proxy')

 
function configHandler(option){
  console.log('* option', option)
  const {key, outputPath} = Object.assign(
			{
				key: '',
				outputPath: '',
			},
			option
    );

    key && writeConfig({keys: [key]})
    outputPath && writeConfig({outputPath})

		// console.log(chalk.cyanBright('key: ' + config.key));
		// console.log(chalk.cyanBright('inputPath: ' + config.inputPath));
}

module.exports = {
  configHandler
}
