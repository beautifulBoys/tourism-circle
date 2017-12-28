<template>
  <div class="contact">
    <li-header class="header"
      @headerLeftEvent="configEvent(true)"
      @headerRightEvent="configEvent"
      :config="headerConfig"
      :show="true"
      rIcon="shuoming"
    ></li-header>
    <div class="page-main">

        <div class="cell-box border-1px-bottom" :class="{noread: item.noReadNum}" v-for="item in list" @click="roomEvent(item)">
          <div class="icon">
            <img :src="item.avatar"/>
          </div>
          <div class="name">{{item.username}}（ID: {{item.id}}）<span class="sign" v-show="item.noReadNum">{{item.noReadNum}}</span></div>
        </div>
    </div>
    <div v-show="!connect" class="connect-box" @click="chat"></div>

    <li-screen :status="signStatus" @close="closeSignEvent" style="z-index: 100"></li-screen>

    <transition name="fade">
      <div class="sign-box" v-show="signStatus" @click="closeSignEvent">
        <div class="sign" @click="(e) => {if (e && e.stopPropagation) e.stopPropagation()}">
          <div class="title">说 明</div>
          <p>此应用定位是在线分享旅程的社区，在线聊天只是附带的一个圈友分享互动的辅助功能，
            与微信是不一样的。因此在线聊天设计为登陆账号时不自动上线，需要手动点击右下角
            的连接按钮至上线成功，才可以正常聊天。</p>
          <p>PS：个人中心里面有一个全站聊天室，它是在登录账号时同步在线的一个全站所有用户
            都在的群组聊天室。</p>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('box1/contact');
  export default {
    components: {
      XButton,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    },
    data () {
      return {
        headerConfig: {
          title: '我的圈友',
          right: true
        },
        signStatus: false
      };
    },
    computed: {
      ...mapState({
        list: state => state.list
      }),
      connect () {
        return this.$store.state.chat.connect;
      },
      ...mapGetters([])
    },
    mounted () {
      this.getDataEvent({
        error (text) {
          console.log(text);
        }
      });
    },
    methods: {
      ...mapMutations(['noReadEmpty']),
      ...mapActions(['getDataEvent']),
      closeSignEvent () {
        this.signStatus = false;
      },
      chat () {
        let me = this;
        this.$store.dispatch('chat/userInfoInit');
        this.$store.dispatch('chat/connectEvent', {
          fn (text) {
            me.$vux.toast.show({
              text,
              position: 'middle',
              time: 3000,
              type: 'text',
              width: '15em'
            });
          }
        });
      },
      configEvent (status) {
        if (!status) this.signStatus = true;
      },
      roomEvent (item) {
        if (!this.connect) {
          this.$vux.toast.show({
            text: '请先设置在线状态才可以进入聊天。',
            position: 'middle',
            time: 3000,
            type: 'text',
            width: '15em'
          });
          return;
        }
        this.$router.push({path: '/chat'});
        this.noReadEmpty(item);
        this.$store.commit('chat/addUserToHotChatList', item);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import '../lib/swiper.css';
  @import '../lib/css/1px.less';
  .contact {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background: #fff;
    .sign-box {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
      &.fade-enter-active,
      &.fade-leave-active {
          transition: all .4s;
          transform: scale(1);
      }
      &.fade-enter,
      &.fade-leave-to {
          opacity: 0;
          transform: scale(1.2);
      }
      .sign {
        width: 70%;
        padding: 10px 20px 20px 20px;
        background: #fff;
        .title {
          line-height: 30px;
          text-align: center;
          font-size: 16px;
        }
        p {
          margin: 5px 0;
          line-height: 25px;
          color: #666;
          text-indent: 20px;
          font-size: 14px;
        }
      }
    }
    .header {
      width: 100%;
      height: 50px;
    }
    .connect-box {
      width: 60px;
      height: 60px;
      line-height: 55px;
      background-size: 20px;
      background: #20a0ff url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTEyMjg2ODg4NzIwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjUgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIxNTMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIuMDMxMjUiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTM1MS45MDE2OTYgNzM2LjMwODMyNiA3MzYuNTIxNjI2IDM1MS42ODgzNTZDNzU1LjE4NzMwMiAzMzMuMDIyNjU5IDc1NS4xODczMDIgMzAyLjUxNzU3NiA3MzYuNTIxNjI2IDI4My44NTE4NzggNzE3Ljg1NTk0OSAyNjUuMTg2MTgxIDY4Ny4zNTA3ODQgMjY1LjE4NjE4MSA2NjguNjg1MTA3IDI4My44NTE4NzhMMjg0LjA2NTE3OCA2NjguNDcxODQ5QzI2NS4zOTk1MDEgNjg3LjEzNzU0NiAyNjUuMzk5NTAxIDcxNy42NDI2MjkgMjg0LjA2NTE3OCA3MzYuMzA4MzI2IDMwMi42MjQxNTQgNzU0Ljk3NDAwMyAzMzMuMjM2MDE5IDc1NC45NzQwMDMgMzUxLjkwMTY5NiA3MzYuMzA4MzI2Wk00NzguODI4MzM5IDY2OS43NTE3ODhDNDg1LjU0ODAzMiA2NzkuMTM3OTU2IDQ4Ni43MjEzMzEgNjg5LjA1NzQ0NCA0ODYuNzIxMzMxIDY5NC42MDM4MTcgNDg2LjcyMTMzMSA3MDEuMjE2ODA5IDQ4NS4xMjE0MzQgNzE0LjAxNjE1NCA0NzQuMzQ4NTQ0IDcyNC43ODg5MkwyNzIuNzU5MTk0IDkyNi4zNzg0MTRDMjYxLjk4NjMwNCA5MzcuMTUxMTgxIDI0OS4yOTM2MTkgOTM4Ljc1MTA5OSAyNDIuNTc0MTMxIDkzOC43NTEwOTkgMjM1Ljk2MTEzOSA5MzguNzUxMDk5IDIyMy4xNjE3NTQgOTM3LjE1MTE4MSAyMTIuMzg4ODY0IDkyNi4zNzg0MTRMOTcuNzI4MzA3IDgxMS43MTc3MTRDODYuOTU1NDE4IDgwMC45NDQ5NDcgODUuMzU1NTIgNzg4LjI1MjI4MyA4NS4zNTU1MiA3ODEuNTMyNjMxIDg1LjM1NTUyIDc3NC44MTI5NzkgODYuOTU1NDE4IDc2Mi4xMjAzMTUgOTcuNzI4MzA3IDc1MS4zNDc1MjhMMjk5LjMxNzY1OCA1NDkuNzU4MDM0QzMxMC4wOTA1NDcgNTM4Ljk4NTI2NyAzMjIuNzgzMjMyIDUzNy4zODUzNDkgMzI5LjUwMjkyNSA1MzcuMzg1MzQ5IDMzNC4xOTU5MTcgNTM3LjM4NTM0OSAzNDEuODc1NTA3IDUzOC4yMzg2MjggMzQ5LjY2MTc5OCA1NDIuMzk4NDIzTDQxMC44ODUzMjUgNDgxLjE3NDkzOEMzNjAuNzU0NTg2IDQzOS43OTA0MjggMjg1Ljg3ODQ3NyA0NDIuNTYzNjI1IDIzOC45NDc1MzMgNDg5LjM4Nzg0OEwzNy4zNTc5NzggNjkwLjk3NzM0MUMtMTIuNDUyNjU5IDc0MC43ODgwODEtMTIuNDUyNjU5IDgyMi4xNzA1MjIgMzcuMzU3OTc4IDg3MS45ODEyNjFMMTUyLjAxODczOSA5ODYuNjQxOTRDMjAxLjgyOTU4MSAxMDM2LjQ1MjY4IDI4My4yMTE5ODEgMTAzNi40NTI2OCAzMzMuMDIyNjE4IDk4Ni42NDE5NEw1MzQuNjEyMTczIDc4NS4wNTI0NDdDNTgyLjcxNjQxNiA3MzYuOTQ4Mjg1IDU4NC4zMTYzMTQgNjU5LjE5MjM0IDUzOS40MTE4NjYgNjA5LjA2MTYwMUw0NzguODI4MzM5IDY2OS43NTE3ODhaTTk4Ni43NDg1MTggMTUyLjAxODczOSA4NzIuMDg3OTYyIDM3LjM1ODA2QzgyMi4yNzcxMi0xMi40NTI2OCA3NDAuODk0NzItMTIuNDUyNjggNjkxLjA4NDA4MyAzNy4zNTgwNkw0ODkuNDk0NTI4IDIzOC45NDc1NTNDNDQyLjY3MDI4NSAyODUuNzcxNzc2IDQzOS44OTcwODggMzYwLjY0Nzg4NSA0ODEuMjgxNjM4IDQxMC44ODUyNjNMNTQyLjUwNTE2NSAzNDkuNjYxNzk4QzUzOC4zNDUyNjcgMzQxLjc2ODg2OCA1MzcuNDkyMDcgMzM0LjA4OTI1NyA1MzcuNDkyMDcgMzI5LjUwMjg0MyA1MzcuNDkyMDcgMzIyLjg4OTg1MSA1MzkuMDkxOTY4IDMxMC4wOTA1MDYgNTQ5Ljg2NDY1MyAyOTkuMzE3NzRMNzUxLjQ1NDIwOCA5Ny43MjgyNDZDNzYyLjIyNjg5MyA4Ni45NTU0NzkgNzc0LjkxOTU3OCA4NS4zNTU1NjEgNzgxLjYzOTI3IDg1LjM1NTU2MSA3ODguMjUyMjYyIDg1LjM1NTU2MSA4MDEuMDUxNjQ4IDg2Ljk1NTQ3OSA4MTEuODI0MzMzIDk3LjcyODI0Nkw5MjYuNDg1MDk0IDIxMi4zODg5NDZDOTM3LjI1Nzc3OSAyMjMuMTYxNzEzIDkzOC44NTc2NzcgMjM1Ljg1NDM3NyA5MzguODU3Njc3IDI0Mi41NzQwMjkgOTM4Ljg1NzY3NyAyNDkuMTg3MDIxIDkzNy4yNTc3NzkgMjYxLjk4NjM0NSA5MjYuNDg1MDk0IDI3Mi43NTkxMzJMNzI0Ljg5NTUzOSA0NzQuMzQ4NjI2QzcxNC4xMjI4NTQgNDg1LjEyMTM5MyA3MDEuNDMwMTcgNDg2LjcyMTMxMSA2OTQuNzEwNDc3IDQ4Ni43MjEzMTEgNjg5LjE2NDA4MyA0ODYuNzIxMzExIDY3OS4yNDQ1OTUgNDg1LjU0ODA1MiA2NjkuODU4NDA2IDQ3OC44Mjg0MDFMNjA5LjI3NDg4IDUzOS40MTE5MDdDNjU5LjQwNTYxOSA1ODQuMzE2MjMyIDczNy4wNTQ5MjUgNTgyLjgyMjk3MyA3ODUuMjY1ODY5IDUzNC42MTIxNTJMOTg2Ljg1NTIxOSAzMzMuMDIyNjU5QzEwMzYuNTU5MzYgMjgzLjIxMTkxOSAxMDM2LjU1OTM2IDIwMS43MjI4MTkgOTg2Ljc0ODUxOCAxNTIuMDE4NzM5WiIgcC1pZD0iMjE1NCIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPg==') no-repeat center center;
      color: #fff;
      font-size: 45px;
      text-align: center;
      border-radius: 100%;
      box-shadow: 2px 2px 10px rgba(0,0,0,0.3);
      position: fixed;
      bottom: 100px;
      right: 10px;
      cursor: pointer;
    }
    .page-main {
      flex: 1;
      overflow-y: scroll;
      .cell-box {
        height: 50px;
        width: 100%;
        display: flex;
        padding: 7px 15px;
        box-sizing: border-box;
        .border-1px-bottom(#ddd);
        &.noread {
          background: rgba(255, 152, 0, 0.3);
        }
        &:active {
          background: #f6f6f6;
        }
        .icon {
          width: 36px;
          box-sizing: border-box;
          img {
            width: 100%;
            border-radius: 8px;
          }
        }
        .name {
          flex: 1;
          margin-left: 10px;
          font-size: 16px;
          color: #333;
          line-height: 36px;
          .sign {
            background: red;
            float: right;
            height: 21px;
            display: block;
            line-height: 21px;
            text-align: center;
            margin: 7px 0;
            border-radius: 11px;
            padding: 0 7px;
            color: #fff;
          }
        }

      }
    }

  }
</style>
