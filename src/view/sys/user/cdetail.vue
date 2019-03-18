<template>
  <div class="page-detail">
    <p>
      <span>账号：</span>
      <span v-text="data.account"></span>
    </p>
    <p>
      <span>用户名：</span>
      <span v-text="data.username"></span>
    </p>
    <p>
      <span>状态：</span>
      <Tag v-text="stateTag(data.state).name" :color="stateTag(data.state).color" />
    </p>
  </div>
</template>
<script>
import MixinsDetail from '../../_mixins/detail'

export default {
  name: 'CDetail',
  mixins: [MixinsDetail]
}
</script>
