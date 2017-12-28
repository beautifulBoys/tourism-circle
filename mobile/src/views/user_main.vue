<template>
<div class="user-main" ref="user_main">
  <div class="top">
    <li-header class="header"
      @headerLeftEvent="configEvent(true)"
      @headerRightEvent="configEvent"
      :show="headShow"
      :config="headerConfig"
    ></li-header>

    <div class="user">
      <img :src="userInfo.avatar" />
    </div>
    <div class="name">{{userInfo.username}}</div>
    <div class="desc">{{userInfo.desc || '这个人很懒，还没有填写呢'}}</div>
  </div>

  <div class="info">
    <div class="item" @click="followEvent">{{isFollowing ? '解除关注' : '关注'}}</div>
    <div class="item" @click="messageOrFriendEvent">{{isFriend ? '发消息' : '加好友'}}</div>
    <div class="item" @click="webMailStatus = true">站内信</div>
  </div>

  <div class="content">
    <li-list-empty
      line1="这个人太懒了"
      line2="还没有分享过自己的旅程呢"
      :show="!postList.length"
    ></li-list-empty>
    <ul>
      <li-user-post-item v-for="(item, index) in postList" :key="index" :data="item"></li-user-post-item>
    </ul>
  </div>
  <li-screen :status="addFriendStatus" @close="addFriendStatus = false"></li-screen>
  <li-editor :show="addFriendStatus" @send="sendAddfrendEvent"></li-editor>

    <li-screen :status="webMailStatus" @close="webMailStatus = false"></li-screen>
  <li-web-mail ref="web_mail" :name="userInfo.username" :show="webMailStatus" @send="webMailThisPageEvent"></li-web-mail>
</div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('userMain');
export default {
  data () {
    return {
      userId: 0,
      headShow: false,
      webMailStatus: false,
      addFriendStatus: false,
      remark: ''
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      headerConfig: state => state.headerConfig,
      isFriend: state => state.isFriend,
      isFollowing: state => state.isFollowing,
      postList: state => state.postList
    }),
    ...mapGetters([])
  },
  mounted () {
    this.userId = this.$route.params.id - 0;
    this.getDataEvent({
      id: this.userId,
      error (text) {
        console.log(text);
      }
    });
    this.$refs.user_main.onscroll = () => {
      let n = this.$refs.user_main.scrollTop / 92;
      this.headShow = (n > 0.95);
    };
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(['getDataEvent', 'addFriendEvent', 'toFollowEvent', 'webMailEvent', 'deleteFollowingEvent']),
    webMailThisPageEvent (obj) {
      let me = this;
      this.webMailEvent({
        ...obj,
        to: this.userId,
        cbb (text) {
          me.$vux.toast.show({
            text,
            position: 'middle',
            time: 3000,
            type: 'text',
            width: '15em'
          });
          me.$refs.web_mail.clear();
          me.webMailStatus = false;
        },
        error (text) {
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
    sendAddfrendEvent (str) {
      let me = this;
      this.remark = str;
      this.addFriendEvent({
        to: this.userId,
        remark: str,
        cbb (text) {
          me.addFriendStatus = false;
          me.$vux.toast.show({
            text,
            position: 'middle',
            time: 3000,
            type: 'text',
            width: '16em'
          });
        }
      });
    },
    messageOrFriendEvent () {
      if (this.isFriend) {
        this.$router.push({path: '/contact'});
      } else {
        this.addFriendStatus = true;
      }
    },
    followEvent () {
      let me = this;
      if (me.isFollowing) { // 解除关注
        me.deleteFollowingEvent({
          id: me.userId,
          cbb (text) {
            me.$vux.toast.show({
              text,
              position: 'middle',
              time: 3000,
              type: 'text',
              width: '15em'
            });
          }
        });
      } else { // 去关注
        me.toFollowEvent({
          id: me.userId,
          cbb (text) {
            me.$vux.toast.show({
              text,
              position: 'middle',
              time: 3000,
              type: 'text',
              width: '15em'
            });
          }
        });
      }
    },
    configEvent (status) {
      if (status) this.$router.go(-1);
      else console.log('好友列表触发事件');
    },
    clickItemEvent (item) {
      if (item.path) {
        this.$router.push({
          path: item.path
        });
      }
    },
    toContentEvent () {
      this.$router.push({
        path: '/content'
      });
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
            color: #fff;
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
</style>
