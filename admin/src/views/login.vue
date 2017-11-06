<template>
  <div class="login">
    <div class="box" :class="{move: toshow}">
      <div class="logo"></div>
      <div class="login-box">
        <el-input class="input" v-model="username" placeholder="用户名"></el-input>
        <el-input class="input" v-model="password" placeholder="密码"></el-input>

        <el-button type="primary" size="large" @click="loginEvent()"> 登　陆 </el-button>
        <el-button size="large">去注册</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import md5 from '../lib/md5.js';
  export default {
    data () {
      return {
        username: '',
        password: '',
        toshow: false
      };
    },
    mounted () {
      setTimeout(() => {
        this.toshow = true;
      });
    },
    methods: {
      loginEvent () {
        let data = {username: this.username, password: md5(this.password)};
        this.ajax.register(data).then(res => {
          this.cookie.set('user', data);
          this.$router.push({path: '/home'});
        }).catch(err => {
          console.log(err);
        });
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
