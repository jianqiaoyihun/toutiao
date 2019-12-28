<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot='title'>账户信息</template>
    </bread-crumb>
    <el-upload class='head-upload' action="" :show-file-list="false" :http-request="uploadImg">
          <img :src="formData.photo ? formData.photo : defaultImg" alt="">
      </el-upload>
    <el-form style="margin-left:100px" label-width="100px" ref="myForm" :model="formData" :rules="rules" >
         <el-form-item label="用户名" prop="name">
             <el-input style="width:30%" v-model="formData.name"></el-input>
         </el-form-item>
         <el-form-item label="简介" prop="intro">
              <el-input style="width:30%" v-model="formData.intro"></el-input>
         </el-form-item>
         <el-form-item label="邮箱" prop="email">
              <el-input style="width:30%" v-model="formData.email"></el-input>
         </el-form-item>
         <el-form-item  label="手机号" prop="mobile">
              <el-input disabled style="width:30%" v-model="formData.mobile"></el-input>
             </el-form-item>
             <el-form-item>
                 <el-button type="primary" @click="editUserInfo">保存信息</el-button>
            </el-form-item>
     </el-form>

  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      defaultImg: require('../../assets/img/head.jpeg'),
      loading: false,
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, {
          min: 1,
          max: 7,
          message: '用户名的长度限制为1到7个字符'
        }],
        email: [{ required: true, message: '邮箱不能为空' },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱格式不正确'
          }]
      } // 定义一个规则
    }
  },
  methods: {
    async getUserInfo () {
      let result = await this.$axios({
        url: '/user/profile'
      })
      this.formData = result.data
    },
    editUserInfo () {
      this.$refs.myForm.validate(async (isOK) => {
        //   调用保存方法
        if (isOK) {
          await this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          })
          //   认为保存成功
          eventBus.$emit('updateUserInfoSuccess')
          this.$message({
            type: 'success',
            message: '保存信息成功'
          })
        }
      })
    },
    async uploadImg (params) {
      this.loading = true // 打开弹层
      let data = new FormData() // 实例化对象
      data.append('photo', params.file) // 加入参数
      let result = await this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      })
      this.formData.photo = result.data.photo // 设置头像地址
      eventBus.$emit('updateUserInfoSuccess')
      this.loading = false // 关调弹层
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
  .head-upload {
     position: absolute;
     right: 300px;
     img {
         width: 200px;
         height: 200px;
         border-radius: 50%;
     }
 }
</style>
