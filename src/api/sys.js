import axios from '@/libs/api.request'

/**
 * 系统管理模块api接口
 */

export const getDic = () => {
  return axios.request({
    url: 'common/v1/dic/all',
    method: 'get'
  })
}
