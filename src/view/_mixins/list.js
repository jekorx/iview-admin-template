import { debounce } from '@/libs/util'
import MixinsBase from './base'
/**
 * 列表页面混入
 */
// 定义除去表格各个高度
const size = {
  headerHeight: 64,
  navHeight: 40,
  subHeaderHeight: 48,
  paddingTop: 16,
  paddingBottom: 16,
  pageHeight: 45
}
// 上述高度求和
const totalHeight = Object.values(size).reduce((total, item) => (total += item), 0)
export default {
  mixins: [MixinsBase],
  data () {
    return {
      // 查询条件
      condition: {
        pageNum: 1,
        pageSize: 10
      },
      // 每页条数选项
      pageSizeOpts: [10, 20, 50],
      // 加载中标记
      loading: false,
      // 表格数据，字段中list表示结果列表，其他为分页信息
      tableData: {},
      // 表格尺寸，large、small、default
      tableSize: 'small',
      // 表格尺寸宽度，默认100%
      tableWidth: '100%',
      // 表格尺寸宽度，默认100%
      tableHeight: '100%'
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 初始化监听页面尺寸变化
      this.resize()
      // 初始化获取列表数据
      this.getList()
    })
  },
  methods: {
    // 编辑，将数据传给父级组件
    edit ({ row }) {
      this.type = 'edit'
      this.$emit('edit', row)
    },
    // 详情，将数据传给父级组件
    detail ({ row }) {
      this.type = 'detail'
      this.$emit('detail', row)
    },
    // 重置窗口尺寸
    resize () {
      this.size()
      // 窗口尺寸发生变化时，通过节流函数改变store中各尺寸的大小
      window.onresize = debounce(this.size)
    },
    // 尺寸计算
    size () {
      // const width = document.documentElement.clientWidth || document.body.clientWidth
      const height = document.documentElement.clientHeight || document.body.clientHeight
      const conditionHeight = this.$refs.conditionFormRef && this.$refs.conditionFormRef.$el.clientHeight
      const tableHeight = height - totalHeight - (conditionHeight || 0)
      this.tableHeight = tableHeight
    },
    // 页码切换
    changePage (pageNum) { this.getList(pageNum) },
    // 每页条数切换
    changePageSize (pageSize) {
      this.condition.pageSize = pageSize
      this.getList()
    },
    // 重置表单
    resetCondition () {
      Object.assign(this.condition, this.dftCondition)
      this.getList(1)
    }
  }
}
