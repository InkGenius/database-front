<template>
    <div class="login-wrap">
        <div class="ms-title">数据仓库与大数据平台</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      const self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          let validateUrl = window.g.SERVICE_BE_CONTEXT_PATH + '/login'
          axios.post(validateUrl, {
            data: this.ruleForm
          }).then((res) => {
            this.status = res.data
            if (this.status.data) {
              this.$cookie.set('sessionID', this.ruleForm.username)
              this.$message({
                message: '登录成功',
                type: 'success'
              })
              this.$store.commit('login')
            } else {
              this.$message.error('用户名或密码错误')
            }
          }).catch(function (error) {
            console.log(error)
            this.$message.error('登陆失败')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
    .login-wrap {
      position: absolute;
      top:16%;
      left:35%;
      width:550px;
      height:400px;
      border-radius: 5px;
      background: #324157;
    }
     .ms-title{
        text-align: center;
        padding:60px 20px 20px 20px;
        font-size:30px;
        color: #fff;
    }
    .ms-login{
        padding:40px 100px 60px 100px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
