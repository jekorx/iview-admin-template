import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled
} from '@/libs/util'
import {
  getDic,
  getLocations,
  getIndustries
} from '@/api/app'
import router from '@/router'
import config from '@/config'
const { homeName } = config

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute)
}

export default {
  // 如果使用命名空间，则为true，一般通用模块不使用命名空间
  namespaced: false,
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: {},
    urlPrefix: {},
    menuList: [],
    dic: {},
    location: [],
    industry: []
  },
  getters: {
    // 菜单列表
    menuList: (state, getters, rootState) => getMenuByRouter(state.menuList, rootState.user.access)
  },
  mutations: {
    // 面包屑
    setBreadCrumb (state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    // home路由
    setHomeRoute (state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    setMenuList (state, list) {
      state.menuList = list
    },
    // 标签导航（可关闭）
    setTagNavList (state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
      let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    // 关闭标签
    closeTag (state, route) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      closePage(state, route)
    },
    // 打开新标签
    addTag (state, { route, type = 'unshift' }) {
      let router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    /* 设置业务相关的系统通用数据 start */
    setUrlPrefix (state, urlPrefix) {
      state.urlPrefix = urlPrefix
    },
    setDic (state, dic) {
      state.dic = dic
    },
    setLocation (state, location) {
      state.location = location
    },
    setIndustry (state, industry) {
      state.industry = industry
    }
    /* end */
  },
  actions: {
    // 字典
    getDic ({ commit }) {
      getDic().then(({ data }) => {
        commit('setDic', data)
      })
    },
    // 省市县
    getLocation ({ commit }) {
      getLocations().then(({ data }) => {
        commit('setLocation', data)
      })
    },
    // 行业
    getIndustry ({ commit }) {
      getIndustries().then(({ data }) => {
        commit('setIndustry', data)
      })
    }
  }
}
