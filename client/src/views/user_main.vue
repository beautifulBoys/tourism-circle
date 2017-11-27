<template>
  <div class="user-main" ref="user_main">
    <div class="main">
      <div class="top">
        <li-header class="header"
          @headerLeftEvent="configEvent(true)"
          @headerRightEvent="configEvent"
          :config="headerConfig"
          :class="{opacity: opacity}"
        ></li-header>

        <div class="user">
          <img :src="userInfo.avatar"/>
        </div>
        <div class="name">{{userInfo.username}}</div>
        <div class="desc">{{userInfo.desc}}</div>
      </div>

      <div class="info">
        <div class="item" @click="followEvent">关注</div>
        <div class="item" @click="messageOrFriendEvent">{{isFriend ? '发消息' : '加好友'}}</div>
        <div class="item" @click="webMailEvent">站内信</div>
      </div>

      <div class="content">
        <ul>
          <li-user-post-item v-for="(item, index) in postList" :key="index" :data="item"></li-user-post-item>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import data from './dynamic.json';
  import Item from '../components/user_post_item.vue';
  import { createNamespacedHelpers } from 'vuex';
  const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('userMain');
  export default {
    components: {
      'li-user-post-item': Item
    },
    data () {
      return {
        travel: [],
        userId: 0,
        opacity: false
      };
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo,
        headerConfig: state => state.headerConfig,
        isFriend: state => state.isFriend,
        postList: state => state.postList
      }),
      ...mapGetters([])
    },
    mounted () {
      this.userId = this.$route.params.id;
      console.log(this.userId);
      this.travel = data.travel;
      this.getDataEvent({
        id: this.userId,
        error (text) {
          console.log(text);
        }
      });
      this.$refs.user_main.onscroll = () => {
        let n = this.$refs.user_main.scrollTop / 92;
        this.opacity = (n > 0.95);
      };
    },
    methods: {
      ...mapMutations([]),
      ...mapActions(['getDataEvent', 'followEvent', 'webMailEvent', '']),
      messageOrFriendEvent () {
        if (this.isFriend) this.$router.push({path: '/chat'});
      },
      configEvent (status) {
        if (status) this.$router.go(-1);
        else console.log('好友列表触发事件');
      },
      clickItemEvent (item) {
        if (item.path) this.$router.push({path: item.path});
      },
      toContentEvent () {
        this.$router.push({path: '/content'});
      }
    }
  };
</script>

<style lang="less" scoped>
  .user-main {
    width: 100%;
    height: 100%;
    background: #eee;
    overflow-y: scroll;
    .main {
      width: 100%;
      overflow-y: scroll;
      .top {
        width: 100%;
        background: #20a0ff;
        padding: 25px 0;
        box-sizing: border-box;
        .user {
          width: 100%;
          img {
            height: 64px;
            width: 64px;
            margin: 0 auto;
            display: block;
            border-radius: 100%;
            border: 3px solid rgba(255,255,255,0.6);
          }
        }
        .name {
          text-align: center;
          line-height: 35px;
          color: #fff;
        }
        .desc {
          text-align: center;
          font-size: 12px;
          color: rgba(255,255,255,0.7);
        }
        .header {
          width: 100%;
          height: 50px;
          text-align: center;
          line-height: 50px;
          color: #fff;
          position: fixed;
          top: 0;
          left: 0;
          background: #20a0ff;
          color: #fff;
          opacity: 0;
          transition: opacity .5s;
          &.opacity {
            opacity: 1;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10;
          }
        }
      }
      .info {
        width: 100%;
        display: flex;
        height: 45px;
        background: #fff;
        .item {
          flex: 1;
          font-size: 14px;
          text-align: center;
          line-height: 45px;
          color: #20a0ff;
          &:active {
            background: #eee;
          }
        }
      }
      .content {
        margin: 10px 0;
      }
      ul {
        padding: 0;
        margin: 0;
      }
    }
  }
</style>
