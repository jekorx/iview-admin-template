<template>
  <Modal
    v-model="changePwdModal"
    title="修改密码"
    :loading="loading"
    width="400"
    footer-hide
    @on-ok="savePwd">
    <div>
      <Form ref="formRef" :model="form" :rules="ruleValidate" :label-width="80">
        <FormItem label="原密码" prop="password">
          <Input type="password" v-model="form.password" />
        </FormItem>
        <FormItem label="新密码" prop="newPwd">
          <Input type="password" v-model="form.newPwd" />
        </FormItem>
        <FormItem label="确认密码" prop="checkPwd">
          <Input type="password" v-model="form.checkPwd" />
        </FormItem>
      </Form>
      <div style="text-align: right">
        <Button type="primary" @click="savePwd">修改</Button>
      </div>
    </div>
  </Modal>
</template>
<script>
import { updatePwd } from '@/api/user'

export default {
  name: 'Password',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      changePwdModal: this.value,
      form: {
        password: '',
        newPwd: '',
        checkPwd: ''
      },
      ruleValidate: {
        password: [
          { required: true, message: '原密码不能为空！', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '新密码不能为空！', trigger: 'blur' },
          { type: 'string', min: 6, max: 20, message: '新密码必须6-20位！' }
        ],
        checkPwd: [
          { required: true, message: '确认密码不能为空！', trigger: 'blur' },
          { type: 'string', min: 6, max: 20, message: '确认密码必须6-20位！' },
          { validator: (rule, value, callback) => {
            if (value !== this.form.newPwd) {
              callback(new Error('新密码与确认密码不一致！'))
            } else {
              callback()
            }
          },
          trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    value (val) {
      this.changePwdModal = val
      if (!val) {
        this.$refs.formRef.resetFields()
      }
    },
    changePwdModal (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    savePwd () {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.loading = true
          updatePwd(this.form).then(({ code, msg }) => {
            if (code === 1) {
              this.$Message.success(msg)
              this.loading = false
              this.changePwdModal = false
            } else {
              this.$Message.error(msg)
            }
          })
        }
      })
    }
  }
}
</script>
