import {hotword, search, suggest, defaultSearch} from '../config/url'
import {get} from './common'
const url = require('url')
const axios = require('axios')
export const getDefaultSearch = (req, res) => {
  var parseObj = url.parse(req.url, true)
  let cb = parseObj.query.jsonpCallback
  axios.get(defaultSearch).then(response => {
    res.send(`${cb}(${JSON.stringify(response.data)})`)
  })
}
export const getHotword = (req, res) => {
  var parseObj = url.parse(req.url, true)
  let cb = parseObj.query.jsonpCallback
  axios.get(hotword).then(response => {
    res.send(`${cb}(${JSON.stringify(response.data)})`)
  })
}

export const searchByKey = (req, res) => {
  get(req, res, search)
}

export const getSuggest = (req, res) => {
  get(req, res, suggest)
}
