<template>
    <div class='login'>
        <el-card class='login-card'>
            <div class="title"><img src="../../assets/img/logo_index.png" alt=""></div>
            <el-form style="margin-top:30px">
                <el-form-item>
                    <el-input placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input style="width:65%"></el-input>
                    <el-button plain style="float:right">发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {

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
