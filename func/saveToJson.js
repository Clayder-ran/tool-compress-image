const fs = require('fs')
const path = require('path')

function saveToJson(data){
  console.log('* data', data)
  try {
    fs.writeFileSync(path.resolve(__dirname, '../data.json'), JSON.stringify(data))
  } catch (error) {
    console.log('* err', error)
  }
}

module.exports = {
  saveToJson,
}
