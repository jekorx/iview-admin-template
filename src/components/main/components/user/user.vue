<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvatar"/>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <!-- <DropdownItem name="message">
          消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem> -->
        <DropdownItem name="updatePwd">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <ChangePassword v-model="changePwdModal" />
  </div>
</template>
<script>
import './user.less'
import { mapActions } from 'vuex'
import ChangePassword from '../change-password'

export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      loading: false,
      changePwdModal: false
    }
  },
  components: { ChangePassword },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    logout () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    /* message () {
      this.$router.push({
        name: 'message_page'
      })
    }, */
    handleClick (name) {
      switch (name) {
        case 'updatePwd': this.changePwdModal = true
          break
        case 'logout': this.logout()
          break
        /* case 'message': this.message()
          break */
      }
    }
  }
}
</script>
