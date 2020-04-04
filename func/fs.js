const fs = require('fs');
const { promisify } = require('util');
const fsExists = promisify(fs.exists);
const fsReadFile = promisify(fs.readFile);
const fsWriteFile = promisify(fs.writeFile);


module.exports = {
  promisify,
  fs,
  fsWriteFile,
  fsReadFile,
  fsExists,
}