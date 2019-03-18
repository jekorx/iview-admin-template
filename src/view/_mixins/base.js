import { mapState } from 'vuex'
/**
 * 基本通用混入
 */
export default {
  computed: {
    ...mapState(['app']),
    // 字典
    dic () { return this.app.dic },
    // 七牛云url前缀
    urlPrefix () { return this.app.urlPrefix },
    // 省市县
    location () { return this.app.location },
    // 行业
    industry () { return this.app.industry }
  },
  props: {
    // 为页面类型增加双向数据绑定
    value: { type: String, default: 'list' }
  },
  data () {
    return {
      /**
       * type -> 页面类型，字符串类型
       * 'list' -> 列表页，default
       * 'add' -> 添加页
       * 'edit' -> 编辑页
       * 'detail' -> 详细页
       */
      type: this.value,
      // 针对列表中选中的数据
      current: {}
    }
  },
  watch: {
    // 为页面类型增加双向数据绑定，监听传入
    value (val) {
      this.type = val
    },
    // 为页面类型增加双向数据绑定，监听传出
    type (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    // 保存数据，调用表单组件中的saveForm方法
    mainSave () {
      this.$refs.formRef.saveForm()
    },
    // 添加，当前数据current置为空object
    mainAdd () {
      this.type = 'add'
    },
    // 编辑
    mainEdit (data) {
      this.current = Object.assign({}, data)
    },
    // 详情
    mainDetail (data) {
      this.current = Object.assign({}, data)
    },
    /**
     * 请求结果处理
     * @param {*} res 请求结果
     * @param {*} showSucc 请求成功（code为1时）是否显示提示，默认显示
     * @param {*} reGetList 是否重新获取列表数据，默认显示重新请求
     */
    resultHandle (res, showSucc = true, reGetList = true) {
      const { code, msg } = res
      this.loading && (this.loading = false)
      if (code === 1) {
        // 成功
        showSucc && this.$Message.success(msg)
        // 重新获取列表数据
        reGetList && this.getList()
        return true
      } else {
        // 错误
        this.$Message.error(msg)
        return false
      }
    }
  }
}
