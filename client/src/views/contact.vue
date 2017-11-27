<template>
  <div class="contact">
    <li-header class="header"
      @headerLeftEvent="configEvent(true)"
      @headerRightEvent="configEvent"
      :config="headerConfig"
    ></li-header>
    <div class="page-main">

        <div class="cell-box" v-for="item in list" @click="roomEvent(item)">
          <div class="icon">
            <img :src="item.avatar"/>
          </div>
          <div class="name">{{item.username}}（ID: {{item.id}}）</div>
        </div>

    </div>
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
      ...mapMutations([]),
      ...mapActions(['getDataEvent']),
      configEvent (status) {
        if (status) this.$router.go(-1);
        else console.log('好友列表触发事件');
      },
      roomEvent (item) {
        this.$router.push({path: '/chat'});
        this.$store.commit('chat/addUserToHotChatList', item);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import '../lib/swiper.css';
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
    .page-main {
      flex: 1;
      overflow-y: scroll;
      padding: 0 15px;
      .cell-box {
        height: 50px;
        width: 100%;
        display: flex;
        padding: 7px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
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
        }

      }
    }

  }
</style>
