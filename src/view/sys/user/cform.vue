<template>
  <div>
    <Form ref="formRef" class="custom-form" :model="formData" :rules="rules">
      <FormItem label="帐号" prop="account">
        <Input v-model="formData.account" placeholder="帐号" :readonly="type === 'edit'" />
      </FormItem>
      <FormItem label="用户名" prop="username">
        <Input v-model="formData.username" placeholder="用户名" />
      </FormItem>
      <FormItem label="状态" prop="state">
        <Select v-model="formData.state">
          <Option v-for="s in dic.state" :key="s.code" :label="s.name" :value="s.code" />
        </Select>
      </FormItem>
      <FormItem v-if="!formData.id" label="默认密码">
        <Input v-model="formData.password" readonly />
      </FormItem>
    </Form>
  </div>
</template>
<script>
import MixinsForm from '../../_mixins/form'
import {
  addUser,
  updateUser
} from '@/api/sys'
import config from '@/config'

// 默认表单
const dftForm = {
  account: '',
  username: '',
  state: '1',
  password: config.dftPwd
}
export default {
  name: 'CForm',
  mixins: [MixinsForm],
  data () {
    return {
      dftForm,
      rules: {
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    saveForm () {
      this.checkForm(data => {
        if (this.type === 'add') {
          addUser(data).then(res => {
            if (this.resultHandle(res, true, false)) {
              this.type = 'list'
            }
          })
        } else {
          updateUser(data).then(res => {
            if (this.resultHandle(res, true, false)) {
              this.type = 'list'
            }
          })
        }
      })
    }
  }
}
</script>
