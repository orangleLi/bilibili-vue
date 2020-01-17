import {banner} from '../config/url'
const url = require('url')

const axios = require('axios')
export const getBanner = (req, res) => {
  var parseObj = url.parse(req.url, true)
  let cb = parseObj.query.jsonpCallback
  axios.get(banner).then(response => {
    res.send(`${cb}(${JSON.stringify(response.data)})`)
  })
}
