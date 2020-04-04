const readline = require('readline');



function getInput(tips) {
	tips = tips || '> ';

	return new Promise(resolve => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		rl.question(tips, answer => {
			rl.close();
			resolve(answer.trim());
		});
	});
}


module.exports = {
  getInput,
};
