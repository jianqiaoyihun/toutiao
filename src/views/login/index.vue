<template>
    <div class='login'>
        <el-card class='login-card'>
            <div class="title"><img src="../../assets/img/logo_index.png" alt=""></div>
            <el-form style="margin-top:30px" :model="loginForm" :rules="loginRules" ref="myForm">
                <el-form-item prop="mobile">
                    <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
                </el-form-item >
                <el-form-item prop="code">
                    <el-input style="width:65%" v-model="loginForm.code"></el-input>
                    <el-button plain style="float:right">发送验证码</el-button>
                </el-form-item>
                <el-form-item prop="check">
                    <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%" @click="submitLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: true
      },
      loginRules: {
        mobile: [{ required: true, message: '请输入您的手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }],
        code: [{ required: true, message: '请输入验证码' }, { pattern: /^\d{6}$/, message: '请输入正确的验证码' }],
        check: [{ validator: function (rule, value, callback) {
          value ? callback() : callback(new Error('您必须统一策略'))
        } }]
      }
    }
  },
  methods: {
    submitLogin () {
      this.$refs.myForm.validate((isOk) => {
        if (isOk) {
          // console.log('dengluchenggong')
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(result => {
            window.localStorage.setItem('user-token', result.data.token)
            this.$router.push('/')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .login {
        height: 100vh;
        background-image:url('../../assets/img/login_bg.jpg');
        background-size:cover;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-card {
            width: 440px;
            height: 350px;
            // padding:20px;
            .title {
                text-align: center;
                img {
                height: 40px;
            }
            }

        }
    }
</style>
