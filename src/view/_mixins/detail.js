import MixinsBase from './base'
/**
 * 详情混入
 */
// 是否启用，状态类型对应Tag颜色
const stateColors = {
  '0': 'error',
  '1': 'success'
}
export default {
  mixins: [MixinsBase],
  props: {
    // 修改时获取当前数据
    data: {
      type: Object,
      default: {}
    }
  },
  methods: {
    stateTag (state) {
      const stateObj = this.dic.state.find(({ code }) => (code === state))
      if (stateObj) {
        return {
          color: stateColors[stateObj.code],
          name: stateObj.name
        }
      }
      return {}
    }
  }
}
