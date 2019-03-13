import axios from '@/libs/api.request'

/**
 * 获取系统通用数据的api接口
 */

// 获取字典数据
export const getDic = () => {
  return axios.request({
    url: 'common/v1/dic/all',
    method: 'get'
  })
}

// 获取省市县数据
export const getLocations = () => {
  return axios.request({
    url: 'common/v1/location/all',
    method: 'get'
  })
}

// 获取行业数据
export const getIndustries = () => {
  return axios.request({
    url: 'common/v1/industry/all',
    method: 'get'
  })
}
