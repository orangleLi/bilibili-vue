import axios from 'axios'
import jsonp from './jsonp.js'
const LOCAL_SERVER = 'http://192.168.5.197:3000'

const get = (url, params = {}) => {
  // url = LOCAL_SERVER + url + getParams(params)
  // return new Promise((resolve, reject) => {
  //   axios.get(url).then(res => {
  //     resolve(res)
  //   }).catch(err => {
  //     reject(err)
  //   })
  // })
  return jsonp(LOCAL_SERVER + url, params)
  // return jsonp(url, params)
}
const post = (url, data) => {
  url = LOCAL_SERVER + url
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// const getParams = (params) => {
//   let arr = []
//   for (let item in params) {
//     arr.push(`${item}=${params[item]}`)
//   }
//   return arr.length > 0 ? '?' + arr.join('&') : ''
// }
export {
  get, post, LOCAL_SERVER
}
