/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios'
import { resSuccess, reqSuccess, resError } from './interceptors'

// import userTree from './userTree.json'
// const baseUrl = 'http://localhost:7001'
export const baseUrl = 'http://mingzhi.zongxintang.com'

const request = axios.create({
  timeout: 1000 * 30 // 超时设置
})

// 请求拦截
request.interceptors.request.use(reqSuccess, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// 响应拦截
request.interceptors.response.use(resSuccess, resError)

export const axiosCus = {
  get: (path, data, options) => {
    return request.get(path, Object.assign({}, { params: data }, options))
  },
  post: (path, data, options) => {
    return request.post(path, data, options)
  }
}

export default {
  axios: (dataSource) => axiosCus[dataSource.method](`${baseUrl}${dataSource.url}`, dataSource.data),
  login: (data) => axiosCus.post(`${baseUrl}/api/user/login`, data),
  getHomeInfo: (data) => axiosCus.get(`${baseUrl}/api/home/getHomeInfo`, data),
  getMasterInfo: (data) => axiosCus.get(`${baseUrl}/api/home/getMasterInfo`, data),
  getMemberTree: (data) => axiosCus.get(`${baseUrl}/api/member/treeList`, data),
  getMemberList: (data) => axiosCus.get(`${baseUrl}/api/member/list`, data),
  queryMaxLevel: (data) => axiosCus.get(`${baseUrl}/api/member/getLevel`, data),
  getMemberDetail: (data) => axiosCus.get(`${baseUrl}/api/member/detail`, data),
  getMateDetail: (data) => axiosCus.get(`${baseUrl}/api/mate/detail`, data),
  // =====

  getPageDetail: (data) => axiosCus.get(`${baseUrl}/api/page/query`, data),
  getArticlesList: (data) => axiosCus.get(`${baseUrl}/api/articles/queryList`, data),
  getPhptpList: (data) => axiosCus.get(`${baseUrl}/api/resourceType/queryList?dataType=img`, data),
  getResourceType: (data) => axiosCus.get(`${baseUrl}/api/resourceType/queryList`, data),
  getVideoList: (data) => axiosCus.get(`${baseUrl}/api/articles/queryList?dataType=video`, data),
  getImgList: (data) => axiosCus.get(`${baseUrl}/api/articles/queryList`, data),
  getArticlesDetail: (data) => axiosCus.get(`${baseUrl}/api/articles/query`, data)
}
