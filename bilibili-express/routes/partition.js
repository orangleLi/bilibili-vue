import {SERVER_URL} from '../config'
const url = require('url')
const fs = require('fs')
let partition = fs.readFileSync('./data/partition.json')
export const getPartition = (req, res) => {
  var parseObj = url.parse(req.url, true)
  let cb = parseObj.query.jsonpCallback
  res.send(`${cb}(${JSON.stringify({
    code: 0,
    data: JSON.parse(partition.toString()).partition.map(item => {
      item.icon = SERVER_URL + '/channel/' + item.icon
      return item
    }),
    msg: '操作成功'
  })})`)
}
