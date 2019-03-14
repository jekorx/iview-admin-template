import {
  login,
  logout,
  getUserInfo,
  getMessage,
  getContentByMsgId,
  hasRead,
  removeReaded,
  restoreTrash,
  getUnreadCount
} from '@/api/user'
import { setToken, getToken, getAccess, getMenu } from '@/libs/util'

export default {
  // 如果使用命名空间，则为true，一般通用模块不使用命名空间
  namespaced: false,
  state: {
    userName: '',
    userId: '',
    avatarImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {}
  },
  mutations: {
    /* 用户信息相关 start */
    setAvatar (state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    /* end */
    /* 消息通知相关 start */
    setMessageCount (state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList (state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList (state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList (state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore (state, { msgId, content }) {
      state.messageContentStore[msgId] = content
    },
    moveMsg (state, { from, to, msgId }) {
      const index = state[from].findIndex(_ => _.msgId === msgId)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    }
    /* end */
  },
  getters: {
    /* 各种状态消息数量 */
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          if (res.code === 1) commit('setToken', res.data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          // 清空记录打开的tab页
          // localSave('tagNaveList', '')
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo().then(({ data: { userInfo, urlPrefix, menu } }) => {
            commit('setAvatar', userInfo.avatar || require('@/assets/images/logo-min.jpg'))
            commit('setUserName', userInfo.username)
            commit('setUserId', userInfo.id)
            // 允许访问的菜单
            const access = getAccess(menu)
            commit('setAccess', access)
            commit('setHasGetInfo', true)
            // url前缀
            commit('setUrlPrefix', urlPrefix, { root: true })
            // 菜单
            commit('setMenuList', getMenu(menu), { root: true })
            resolve(access)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    /* 消息通知相关 start */
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMessageCount ({ state, commit }) {
      getUnreadCount().then(res => {
        const { data } = res
        commit('setMessageCount', data)
      })
    },
    // 获取消息列表，其中包含未读、已读、回收站三个列表
    getMessageList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getMessage().then(res => {
          const { unread, readed, trash } = res.data
          commit('setMessageUnreadList', unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageReadedList', readed.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageTrashList', trash.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 根据当前点击的消息的id获取内容
    getContentByMsgId ({ state, commit }, { msgId }) {
      return new Promise((resolve, reject) => {
        let contentItem = state.messageContentStore[msgId]
        if (contentItem) {
          resolve(contentItem)
        } else {
          getContentByMsgId(msgId).then(res => {
            const content = res.data
            commit('updateMessageContentStore', { msgId, content })
            resolve(content)
          })
        }
      })
    },
    // 把一个未读消息标记为已读
    hasRead ({ state, commit }, { msgId }) {
      return new Promise((resolve, reject) => {
        hasRead(msgId).then(() => {
          commit('moveMsg', {
            from: 'messageUnreadList',
            to: 'messageReadedList',
            msgId
          })
          commit('setMessageCount', state.unreadCount - 1)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除一个已读消息到回收站
    removeReaded ({ commit }, { msgId }) {
      return new Promise((resolve, reject) => {
        removeReaded(msgId).then(() => {
          commit('moveMsg', {
            from: 'messageReadedList',
            to: 'messageTrashList',
            msgId
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 还原一个已删除消息到已读消息
    restoreTrash ({ commit }, { msgId }) {
      return new Promise((resolve, reject) => {
        restoreTrash(msgId).then(() => {
          commit('moveMsg', {
            from: 'messageTrashList',
            to: 'messageReadedList',
            msgId
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
    /* end */
  }
}
