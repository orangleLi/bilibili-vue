export const dataTrans = (timestamp, split) => {
  var time = new Date(timestamp * 1000)
  if (!split) {
    return time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日'
  } else {
    return time.getFullYear() + split + (time.getMonth() + 1) + split + time.getDate()
  }
}
export const play = (num) => {
  return num < 10000 ? num : (num / 10000).toFixed(1) + '万'
}

export const getNetworkType = () => {
  var ua = navigator.userAgent
  var networkStr = ua.match(/NetType\/\w+/) ? ua.match(/NetType\/\w+/)[0] : 'NetType/other'
  networkStr = networkStr.toLowerCase().replace('nettype/', '')
  // wifi 4g 3gnet 2g
  return networkStr
}

export const setDuration = (duration = '') => {
  let time = duration.split(':')
  let mintues = time[0]
  let second = setZero(time[1])
  second = second ? (':' + second) : ''
  if (mintues < 60) {
    return `00:${setZero(mintues)}${second}`
  } else {
    let hour = parseInt(mintues / 60)
    let min = parseInt(mintues % 60)
    return `${setZero(hour)}:${setZero(min)}${second}`
  }
}
const setZero = (num) => {
  return num < 10 ? '0' + num : num
}
