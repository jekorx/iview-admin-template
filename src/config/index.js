export default {
  /**
  * @description 配置App名称
  */
  name: 'iView-admin',
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'iView-admin',
  /**
   * @description 默认密码123456
   */
  dftPwd: '123456',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: '/nuojinadm/',
    pro: '/njadmapi/'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    /* 'plugin-name': {
      'option': 'option'
    } */
  }
}
