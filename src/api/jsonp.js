import originJSONP from 'jsonp'

export const options = {
  param: 'jsonpCallback',
  prefix: 'jp'
}

export default function jsonp (url, params) {
  let u = url + getParams(params)
  return new Promise((resolve, reject) => {
    originJSONP(u, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
const getParams = (params) => {
  let arr = []
  for (let item in params) {
    arr.push(`${item}=${params[item]}`)
  }
  return arr.length > 0 ? '?' + arr.join('&') : ''
}
