import {domain, port, SERVER_URL} from './config'
const express = require('express')
const app = express()
const router = require('./router.js')
app.use('/channel', express.static('./public/channel'))
app.use(router)
app.listen(port, domain, () => {
  console.log(SERVER_URL)
})
