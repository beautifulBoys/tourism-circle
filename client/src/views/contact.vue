<template>
  <div class="contact">
    <li-header class="header"
      @headerLeftEvent="configEvent(true)"
      @headerRightEvent="configEvent"
      :config="headerConfig"
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
          left: '返回',
          title: '我的圈友',
          right: '热聊列表'
        }
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
        if (status) this.$router.go(-1);
        else console.log('好友列表触发事件');
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
    .header {
      width: 100%;
      height: 50px;
    }
    .connect-box {
      width: 60px;
      height: 60px;
      line-height: 55px;
      background: #20a0ff url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTExODU4NzYzNTMwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI4OTciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTE2MC4zMjI5MTcgNDUzLjMyOTc2Mmw3MDEuOTg4MDUyIDAgMCAxMTYuOTk4NjkxLTcwMS45ODgwNTIgMCAwLTExNi45OTg2OTFaIiBwLWlkPSIyODk4IiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+PHBhdGggZD0iTTQ1Mi40Nzc4NiAxNjAuODM0MDU5bDExNi45OTc2NjggMCAwIDcwMS45ODgwNTItMTE2Ljk5NzY2OCAwIDAtNzAxLjk4ODA1MloiIHAtaWQ9IjI4OTkiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4=) no-repeat center center;
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
