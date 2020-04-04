const sleep = (time = 0) => new Promise((res) => setTimeout(res, time));

const isDef = (variable) => variable !== null && variable !== undefined;
const isType = (variable, type) => Object.prototype.toString.call(variable).slice(8, -1).toLowerCase() === type;
const isBoolean = (variable) => isType(variable, 'boolean');

module.exports = {
	sleep,
  isDef,
  isBoolean
};
