const url = require('url')
const axios = require('axios')
export const get = (req, res, key, tag) => {
  // url.parse 方法可以将一个 URL 路径解析为一个方便操作的对象
  // 将第二个可选参数指定为 true， 表示将结果中的 query 解析为一个对象
  var parseObj = url.parse(req.url, true)
  let cb = parseObj.query.jsonpCallback
  if (tag) {
    axios.get(key + parseObj.search, {
      headers: {
        referer: 'https://www.bilibili.com'
      }
    }).then(response => {
      res.send(`${cb}(${JSON.stringify(response.data)})`)
    })
  } else {
    axios.get(key + parseObj.search).then(response => {
      res.send(`${cb}(${JSON.stringify(response.data)})`)
    })
  }
}
