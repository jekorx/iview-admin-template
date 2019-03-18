/**
 * iview 操作按钮render
 * h render
 * params table row_data
 * {methods} methods
 */
export default (h, params, {
  edit, detail, del
}, operations = []) => [
  edit ? h('span', {
    style: { color: '#ff9900' },
    attrs: { class: 'operation' },
    on: {
      click: e => {
        edit(params)
        e.stopPropagation()
      }
    }
  }, '编辑') : null,
  detail ? h('span', {
    style: { color: '#2d8cf0' },
    attrs: { class: 'operation' },
    on: {
      click: e => {
        detail(params)
        e.stopPropagation()
      }
    }
  }, '详情') : null,
  del ? h('span', {
    style: { color: '#ed4014' },
    attrs: { class: 'operation' },
    on: {
      click: e => {
        del(params)
        e.stopPropagation()
      }
    }
  }, '删除') : null,
  // 自定义
  ...operations
].filter(item => item)
