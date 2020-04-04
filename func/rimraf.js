const rimraf = require('rimraf');

const rimrafPro = path =>
	new Promise((res, rej) => {
		rimraf(path, function(err) {
			if (err) {
				rej(err);
			} else {
				res();
			}
		});
	});

module.exports = {
	rimraf,
	rimrafPro
};
