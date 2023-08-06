import api from '@/api'
import { getUrlParam } from '@/utils/Url'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const lvDataParser = async (oriData, prop) => {
  const data = {}
  for (const i in oriData) {
    const propConfig = prop[i]
    if (propConfig) {
      if (propConfig.dataSource) {
        const dataSource = propConfig.dataSource
        if (dataSource.type === 'axios') {
          data[i] = await api.axios(dataSource)
        } else {
          data[i] = ''
        }
      } else {
        data[i] = propConfig.value
      }
    }
  }
  return data
}

// const baseUrl = 'http://huanglf.zongxintang.com/upload/'
const code = getUrlParam('family') || localStorage.getItem('family')
// const baseUrl = 'http://localhost:7001/upload/'
const baseUrl = 'http://mingzhi.zongxintang.com/upload/'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const imgUrlParser = (url) => {
  if (!url) return ''
  if (url.indexOf('http') !== -1) {
    return url
  } else {
    return `${baseUrl}${url}`
  }
}
