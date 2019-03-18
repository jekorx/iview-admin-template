<template>
  <div>
    <!-- 页头，操作按钮 -->
    <PageHeader
      v-model="type"
      :add="mainAdd"
      :save="mainSave"></PageHeader>
    <!-- 列表页面 -->
    <CList
      v-if="type === 'list'"
      v-model="type"
      @edit="mainEdit"
      @detail="mainDetail" />
    <!-- 表单页面，添加、编辑 -->
    <CForm
      v-if="type === 'add' || type === 'edit'"
      v-model="type"
      ref="formRef"
      :data="current" />
    <!-- 详情页面 -->
    <CDetail
      v-if="type === 'detail'"
      v-model="type"
      :data="current" />
  </div>
</template>
<script>
import MixinsBase from '../../_mixins/base'
import CList from './clist'
import CForm from './cform'
import CDetail from './cdetail'

export default {
  name: 'User',
  // 基础混入
  mixins: [MixinsBase],
  // 注册组件
  components: { CList, CForm, CDetail }
}
</script>
