import { Modal } from 'iview'

/**
 * 导航标签关闭前钩子函数
 * 在路由的mate属性中beforeCloseName: 'before_close_normal'
 * 参数值则为beforeClose中方法名的字符串
 */
const beforeClose = {
  before_close_normal: (resolve) => {
    Modal.confirm({
      title: '确定要关闭这一页吗',
      onOk: () => {
        resolve(true)
      },
      onCancel: () => {
        resolve(false)
      }
    })
  }
}

export default beforeClose
