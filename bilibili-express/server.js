import {domain, port, SERVER_URL} from './config'
const express = require('express')
const app = express()
const router = require('./router.js')
// const path = require('path')
var history = require('connect-history-api-fallback')
app.use('/channel', express.static('./public/channel'))
app.use('/bilibili', express.static('./public/bilibili'))
app.use(router)
app.use(history({
  verbose: true, // 日志选项
  index: '/bilibili'
}))
app.listen(port, domain, () => {
  console.log(SERVER_URL)
})
