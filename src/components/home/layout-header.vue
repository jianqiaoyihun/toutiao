<template>
<div>
  <el-row class="layout-header fixed" type="flex" align="middle" justify="space-between" :style="{width: collapse ? '1305px' : '1135px'}">
    <el-col :span="8" class="left">
      <i :class='{"el-icon-s-unfold":collapse, "el-icon-s-fold": !collapse}' @click="collapseOrOpen"></i>
          <span class='title'>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="16" class="right">
      <el-row type='flex' justify="end" align="middle">
        <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt="">
        <el-dropdown @command="handel">
          <span>{{ userInfo.name }}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">Git地址</el-dropdown-item>
            <el-dropdown-item command="quit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</div>

</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false,
      userInfo: {},
      defaultImg: require('../../assets/img/header.jpg') // 先把地址转换成变量
    }
  },
  created () {
    this.getUserInfo()
    eventBus.$on('updateUserInfoSuccess', () => {
      this.getUserInfo()
    })
  },
  methods: {
    handel (command) {
      if (command === 'git') {
        window.location.href = 'https://github.com/jianqiaoyihun/toutiao'
      } else if (command === 'quit') {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (command === 'info') {
        this.$router.push('/home/account')
      }
    },
    collapseOrOpen () {
      this.collapse = !this.collapse
      eventBus.$emit('collapseOrOpen', this.collapse)
    },
    getUserInfo () {
      // let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile'
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
      }).then(result => {
        this.userInfo = result.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .layout-header {
      height:60px;
      .left {
          font-size: 16px;
          padding-left: 20px;
          .title {
              margin-left:4px;
              color: #2c3e50;
              font-size:16px;
          }
          i {
            font-size: 23px
          }
      }
      .right {
        margin-right: 20px;
          img {
              width:40px;
              height: 40px;
              border-radius: 50%;
              margin-right:5px;
          }
      }
  }
  .fixed {
    position: fixed;
    // width:1135px;
    background-color: #fff;
    z-index:100;
    box-shadow: 0px 2px 2px #888888
  }
</style>
