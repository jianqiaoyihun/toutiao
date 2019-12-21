<template>
  <el-row class="layout-header" type="flex" align="middle" justify="space-between">
    <el-col :span="7" class="left">
      <i class='el-icon-s-unfold'></i>
          <span class='title'>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4" class="right">
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
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/header.jpg') // 先把地址转换成变量
    }
  },
  created () {
    // let token = window.localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile'
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    }).then(result => {
      this.userInfo = result.data
    })
  },
  methods: {
    handel (command) {
      if (command === 'git') {
        window.location.href = 'https://github.com/jianqiaoyihun/toutiao'
      } else if (command === 'quit') {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .layout-header {
      height:60px;
      .left {
          font-size: 16px;
          .title {
              margin-left:4px;
              color: #2c3e50;
              font-size:16px;
          }
      }
      .right {
          img {
              width:40px;
              height: 40px;
              border-radius: 50%;
              margin-right:5px;
          }
      }
  }
</style>
