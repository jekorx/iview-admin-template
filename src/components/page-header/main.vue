<template>
  <div class="page-header">
    <div class="title">
      <CommonIcon :type="icon" />
      <span v-text="title"></span>
    </div>
    <div class="btns">
      <Button
        v-if="add !== null && type === 'list'"
        type="primary"
        icon="md-add"
        @click="add">添加</Button>
      <Button
        v-if="save !== null &&( type === 'add' || type === 'edit')"
        type="success"
        icon="md-checkmark"
        @click="save">保存</Button>
      <Button
        v-if="type !== 'list'"
        type="default"
        icon="md-arrow-back"
        @click="back">返回</Button>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import CommonIcon from '_c/common-icon'

export default {
  name: 'PageHeader',
  components: { CommonIcon },
  props: {
    value: { type: String, default: 'list' },
    add: { type: Function, default: null },
    save: { type: Function, default: null }
  },
  data () {
    return {
      type: this.value,
      title: this.$route.meta.title,
      icon: this.$route.meta.icon
    }
  },
  watch: {
    value (val) {
      this.type = val
    },
    type (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    back () {
      this.type = 'list'
    }
  }
}
</script>
