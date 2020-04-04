const sleep = (time=0) => new Promise((res) => setTimeout(res, time))

module.exports = {
  sleep
}