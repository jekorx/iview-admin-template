<template>
  <div>
    <Form ref="conditionFormRef" :label-width="50" inline>
      <FormItem label="帐号">
        <Input v-model="condition.account" placeholder="帐号" />
      </FormItem>
      <FormItem label="用户名">
        <Input v-model="condition.username" placeholder="用户名" />
      </FormItem>
      <FormItem label="状态">
        <Select v-model="condition.state">
          <Option label="全部" :value="-1" />
          <Option v-for="s in dic.state" :key="s.code" :label="s.name" :value="s.code" />
        </Select>
      </FormItem>
      <Button type="primary" @click="getList()">搜索</Button>
      <Button type="default" @click="resetCondition">重置</Button>
    </Form>
    <Table
      border
      stripe
      width="100%"
      :height="tableHeight"
      :size="tableSize"
      :columns="columns"
      :data="tableData.list"
      :loading="loading" />
    <Page
      show-sizer
      show-total
      :total="tableData.total"
      :current="condition.pageNum"
      :page-size="condition.pageSize"
      :page-size-opts="pageSizeOpts"
      @on-change="changePage"
      @on-page-size-change="changePageSize" />
  </div>
</template>
<script>
import MixinsList from '../../_mixins/list'
import {
  getUserList,
  delUser,
  resetPwd
} from '@/api/sys'

// 默认查询条件
const dftCondition = {
  account: '',
  username: '',
  state: -1
}
export default {
  name: 'CList',
  // 列表混入
  mixins: [MixinsList],
  data () {
    return {
      dftCondition,
      // 复制默认查询条件赋给condition
      condition: Object.assign({}, dftCondition),
      // 表格列数据配置
      columns: [
        {
          title: '序号',
          align: 'center',
          width: 66,
          render: (h, params) => {
            return h('small', {}, (this.condition.pageNum - 1) * this.condition.pageSize + params.index + 1)
          }
        },
        {
          title: '账号',
          key: 'account',
          tooltip: true,
          width: 200,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'username',
          tooltip: true,
          width: 200,
          align: 'center'
        },
        {
          title: '状态',
          width: 90,
          align: 'center',
          render: (h, params) => h('span', this.dic.state.find(({ code }) => (code === params.row.state)).name)
        },
        {
          title: '创建时间',
          key: 'createTime',
          width: 200,
          align: 'center'
        },
        {
          title: '修改时间',
          key: 'updateTime',
          width: 200,
          align: 'center'
        },
        {
          title: ' '
        },
        {
          title: '操作',
          width: 210,
          align: 'center',
          fixed: 'right',
          render: (h, params) => this.$Operation(h, params, {
            edit: this.edit,
            detail: this.detail,
            del: this.del
          }, [
            h('span', {
              style: { color: '#a08418' },
              attrs: { class: 'operation' },
              on: {
                click: e => {
                  this.resetPwd(params)
                  e.stopPropagation()
                }
              }
            }, '重置密码')
          ])
        }
      ]
    }
  },
  methods: {
    // 删除
    del ({ row }) {
      this.$Modal.confirm({
        closable: true,
        width: 300,
        title: '提示',
        content: '确定删除该用户？',
        onOk: () => {
          delUser(row.id).then(res => this.resultHandle(res))
        }
      })
    },
    // 重置密码
    resetPwd ({ row }) {
      this.$Modal.confirm({
        closable: true,
        width: 300,
        title: '提示',
        content: `确定将密码重置为${this.$config.dftPwd}？`,
        onOk: () => {
          resetPwd(row.id).then(res => this.resultHandle(res, true, false))
        }
      })
    },
    // 获取列表数据
    getList (pageNum) {
      // 如果传入页码参数，则使用传入的页码
      if (pageNum) this.condition.pageNum = pageNum
      let condition = Object.assign({}, this.condition)
      // 参数优化，针对Select组件，Option为''值的不会被默认选中，则使用-1替代，查询时将-1替换为''
      if (condition.state === -1) condition.state = ''
      // 加载动画
      this.loading = true
      getUserList(condition).then(res => {
        const { data } = res
        // 结果处理，code === 1，请求成功，并且列表查询时不提示请求成功，只提示请求失败
        if (this.resultHandle(res, false, false)) {
          if ((data.list && data.list.length > 0) || data.pageNum === 1) {
            this.tableData = data
          } else {
            // 解决请求页数大于实际页数，如果大于实际页数，请求前一页
            this.getList(--this.condition.pageNum)
          }
        }
      })
    }
  }
}
</script>
