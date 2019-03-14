<template>
  <div class="login">
    <div class="login-wrap">
      <div class="login-logo">
        <img :src="require('@/assets/images/logo-min.jpg')" :alt="$config.title" />
        <p v-text="$config.name"></p>
      </div>
      <div class="login-con">
        <h3>用户登录</h3>
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </div>
    </div>
    <div class="wave" ref="waveRef"></div>
  </div>
</template>
<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import ParticleWave from 'particle-wave'

export default {
  components: {
    LoginForm
  },
  mounted () {
    const pointSize = 4
    this.$nextTick(() => {
      /* eslint-disable */
      new ParticleWave(this.$refs.waveRef, {
        uniforms: {
          size: { type: 'float', value: pointSize },
          field: { type: 'vec3', value: [ 0, 0, 0 ] },
          speed: { type: 'float', value: 7 }
        },
        onResize (w, h, dpi) {
          const position = []
          const color = []
          const width = 400 * (w / h)
          const depth = 500
          const height = 7
          const distance = 9
          for (let x = 0; x < width; x += distance) {
            for (let z = 0; z < depth; z += distance) {
              position.push(-width / 2 + x, -30, -depth / 2 + z)
              color.push(0, 1 - (x / width) * 1, 0.5 + x / width * 0.5, z / depth)
            }
          }
          this.uniforms.field = [ width, height, depth ]
          this.buffers.position = position
          this.buffers.color = color
          this.uniforms.size = (h / 400) * pointSize * dpi
        }
      })
      /* eslint-enable */
    })
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    }
  }
}
</script>
<style lang="less">
  @import './login.less';
</style>
