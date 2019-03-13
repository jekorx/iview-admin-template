import axios from '@/libs/api.request'
import md5 from 'js-md5'

/**
 * 登录用户相关的api接口
 */

// 用户登录
export const login = ({ userName, password }) => {
  const data = {
    account: userName,
    password: md5(password)
  }
  return axios.request({
    url: 'sign/v1/in',
    data,
    method: 'post'
  })
}
// 获取用户信息（用户信息、菜单、url前缀）
export const getUserInfo = () => {
  return axios.request({
    url: 'sign/v1/info',
    method: 'post'
  })
}
// 退出登录
export const logout = () => {
  return axios.request({
    url: 'sign/v1/out',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msgId => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msgId
    }
  })
}

export const hasRead = msgId => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msgId
    }
  })
}

export const removeReaded = msgId => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msgId
    }
  })
}

export const restoreTrash = msgId => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msgId
    }
  })
}
