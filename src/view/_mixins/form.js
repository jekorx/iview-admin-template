import { debounce } from '@/libs/util'
import MixinsBase from './base'
/**
 * 表单混入
 */
// 定义除去表格各个高度
const size = {
  headerHeight: 64,
  navHeight: 40,
  subHeaderHeight: 48
}
// 上述高度求和
const totalHeight = Object.values(size).reduce((total, item) => (total += item), 0)
export default {
  mixins: [MixinsBase],
  props: {
    // 修改时获取当前数据
    data: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      // 表单填充数据
      formData: {}
    }
  },
  mounted () {
    // 根据页面类型给formData赋值
    this.formData = this.type === 'add' ? this.dftForm : this.data
    this.$nextTick(() => {
      // 初始化监听页面尺寸变化
      this.resize()
    })
  },
  methods: {
    // 表单验证
    checkForm (callback) {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          // 删除不必要字段
          delete this.formData._index
          delete this.formData._rowKey
          delete this.formData.createTime
          delete this.formData.createUser
          delete this.formData.updateTime
          delete this.formData.updateUser
          callback && callback(this.formData)
        }
      })
    },
    // 重置窗口尺寸
    resize () {
      this.size()
      // 窗口尺寸发生变化时，通过节流函数改变store中各尺寸的大小
      window.onresize = debounce(this.size)
    },
    // 尺寸计算
    size () {
      const formEl = this.$refs.formRef && this.$refs.formRef.$el
      if (formEl) {
        // const width = document.documentElement.clientWidth || document.body.clientWidth
        const height = document.documentElement.clientHeight || document.body.clientHeight
        const formHeight = height - totalHeight - 0
        formEl.style.height = `${formHeight}px`
      }
    }
  }
}
