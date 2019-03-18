import axios from '@/libs/api.request'

/**
 * 系统管理模块api接口
 */
/* 用户管理 start */
// 获取用户列表
export const getUserList = params => {
  return axios.request({
    url: `sys/v1/user/${params.pageSize}/${params.pageNum}`,
    params,
    method: 'get'
  })
}
// 删除用户
export const delUser = id => {
  return axios.request({
    url: `sys/v1/user/${id}`,
    method: 'delete'
  })
}
// 添加用户
export const addUser = data => {
  return axios.request({
    url: 'sys/v1/user',
    data,
    method: 'post'
  })
}
// 修改用户
export const updateUser = data => {
  return axios.request({
    url: 'sys/v1/user',
    data,
    method: 'put'
  })
}
// 重置密码
export const resetPwd = id => {
  return axios.request({
    url: `sys/v1/user/password/${id}`,
    method: 'put'
  })
}
/* 用户管理 end */
