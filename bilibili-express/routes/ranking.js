import {ranking, region} from '../config/url'
import {get} from './common'
const url = require('url')
const fs = require('fs')
export const getRanking = (req, res) => {
  get(req, res, ranking)
}
export const getRegion = (req, res) => {
  get(req, res, region)
}
let category = fs.readFileSync('./data/data.json')
export const getCategory = (req, res) => {
  var parseObj = url.parse(req.url, true)
  let cb = parseObj.query.jsonpCallback
  res.send(`${cb}(${JSON.stringify({
    code: 0,
    data: JSON.parse(category.toString()),
    msg: '操作成功'
  })})`)
}
