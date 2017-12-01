<template>
  <div class="login">
    <div class="main">
      <div class="box">
        <div class="icon">旅</div>
        <div class="cell"><input class="input" type="text" v-model="username" placeholder="用户名"/></div>
        <div class="cell"><input class="input" type="password" v-model="password" placeholder="密码"/></div>
        <div class="tip">{{tip}}</div>
        <div class="cell"><button :class="{active: buttonStatus}" @click="loginThisPageEvent()">芝麻开门</button></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('login');
  export default {
    data () {
      return {
        username: '',
        password: '',
        buttonStatus: false
      };
    },
    computed: {
      ...mapState({
        tip: state => state.tip
      }),
      ...mapGetters([])
    },

    watch: {
      username (n) {
        this.submitStatusFunc();
        this.usernameChange(n);
      },
      password (n) {
        this.submitStatusFunc();
        this.passwordChange(n);
      }
    },
    methods: {
      ...mapMutations(['usernameChange', 'passwordChange']),
      ...mapActions(['loginEvent']),
      submitStatusFunc () {
        if (this.username.length >= 2 && this.username.length <= 8 && this.password.length >= 6 && this.password.length <= 12) this.buttonStatus = true;
        else this.buttonStatus = false;
      },
      loginThisPageEvent () {
        let me = this;
        if (!this.buttonStatus) return;
        console.log(this.username, this.password);
        this.loginEvent({
          success (text, result) {
            me.$router.push({path: '/dynamic'});
            me.ajaxFunc.setHeader('passport', result.data.passport);
            me.ajaxFunc.setHeader('userId', result.data.userId);
            localStorage.setItem('user', JSON.stringify(result.data));
            me.$vux.toast.show({
             text,
             width: '15em',
             type: 'text',
             time: 3000,
             position: 'middle'
           });
          },
          error (text) {
            me.$vux.toast.show({
             text,
             width: '15em',
             type: 'warn',
             time: 3000,
             position: 'middle'
           });
          }
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
    justify-content: center;
    align-items: center;
    background: #20A0FF;
    .main {
      width: 90%;
      padding: 40px 0 0 0;
      .box {
        width: 100%;
        background: #fff;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 5px;
        .icon {
          width: 80px;
          height: 80px;
          background: #20A0FF;
          border: 3px solid #fff;
          margin: -55px auto 0 auto;
          border-radius: 100%;
          line-height: 80px;
          text-align: center;
          font-size: 40px;
          color: #fff;
        }
        .tip {
          line-height: 16px;
          height: 16px;
          color: red;
          font-size: 13px;
          padding: 0 20px;
        }
        .cell {
          width: 100%;
          margin: 15px 0;
          .input {
            width: 80%;
            margin: 0 auto;
            line-height: 30px;
            padding: 3px 15px;
            border: none;
            border-bottom: 1px solid #ddd;
            outline: none;
            display: block;
            font-size: 16px;
            &:focus {
              border-bottom: 1px solid #20A0FF;
              color: #20A0FF;
            }
          }
          button {
            width: 50%;
            line-height: 40px;
            margin: 20px auto 0 auto;
            outline: none;
            border: none;
            font-size: 16px;
            color: #fff;
            display: block;
            border-radius: 5px;
            background: #ccc;
            &.active {
              background: #20A0FF;
              &:active {
                background: #1083d9;
              }
            }
          }
        }
      }
    }


  }
</style>
