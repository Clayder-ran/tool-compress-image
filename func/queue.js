/**
 * 把 Promise 转成按数组顺序执行
 * @param {array} arr 生成Promise函数组成的数组
 */
async function queue(arr) {
  let data = []
  for (let CreatePromise of arr) {
    // promise 执行后, 返回Promise对象
    let res = await CreatePromise()
    data.push(res)
  }
  return data
}

module.exports = {
  queue
}

