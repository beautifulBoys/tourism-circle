<template>
  <div class="login">
    <div class="box" :class="{move: toshow}">
      <div class="logo"></div>
      <div class="login-box">
        <el-input class="input" v-model="username" placeholder="用户名 (2 - 8 位)"></el-input>
        <el-input class="input" v-model="password" placeholder="密码 (6 - 12 位)"></el-input>

        <el-button type="primary" size="large" @click="loginEvent()"> 登　录 </el-button>
        <!-- <el-button size="large">去注册</el-button> -->
      </div>
    </div>
  </div>
</template>
<script>
  import md5 from '../lib/md5.js';
  import {login} from '../api/ajax_router.js';
  import Cookies from 'js-cookie';
  export default {
    data () {
      return {
        username: '',
        password: '',
        toshow: false
      };
    },
    created () {
      if (window.loginStatus) {
        console.log('asdfsdfsd');
        this.$router.push({path: '/newest'});
      }
    },
    mounted () {
      setTimeout(() => {
        this.toshow = true;
      });
    },
    methods: {
      async loginEvent () {
        if (this.username.length > 8 || this.username.length < 2 || this.password.length > 12 || this.password.length < 6) {
          this.$message({type: 'error', message: '用户名或密码输入不符合规则'});
          return;
        }
        let data = {username: this.username, password: md5(this.password)};
        let result = await login(data);
        if (result.code === 200) {
          Cookies.set('passport', result.data.passport, { expires: 1 });
          Cookies.set('userId', result.data.userId, { expires: 1 });
          Cookies.set('username', result.data.username, { expires: 1 });
          this.ajaxFunc.setHeader('passport', result.data.passport);
          this.ajaxFunc.setHeader('userId', result.data.userId);
          window.loginStatus = true;
          this.$notify({
            title: '登录成功',
            message: result.message,
            type: 'success'
          });
          this.$router.push({path: '/'});
        } else {
          this.password = this.username = '';
          this.$message({type: 'error', message: result.message});
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .login {
    width: 100%;
    height: 100%;
    display: flex;
    background: #333;
    justify-content: center;
    align-items: center;
    .box {
      width: 400px;
      margin-top: -150px;
      opacity: 0;
      transition: all 1s;
      &.move {
        margin-top: 0;
        opacity: 1;
      }
      // .logo {
      //   width: 100%;
      //   height: 150px;
      //   background: url(../images/logo.png) no-repeat center center;
      // }
      .login-box {
        width: 100%;
        background: #fff;
        border-radius: 20px;
        padding: 30px;
        box-sizing: border-box;
        .input {
          margin: 15px 0;
          width: 100%;
        }
      }
    }
 }
</style>
