<template>
  <div class="box">
    <div class="chat" :class="{an: remind, suc: connect}" @click="chatOpenEvent">
      <i class="el-icon-menu" v-show="!connectLoading"></i>
      <i class="el-icon-loading" v-show="connectLoading"></i>
    </div>
    <el-dialog :title="'与 ' + hotChatObj[hotChatObjIndex].userInfo.username + ' 聊天中...'" :visible.sync="chatShow" :modal-append-to-body="false">
      <chat-component></chat-component>
    </el-dialog>
  </div>
</template>

<script>
  import chatComponent from '../chat_component.vue';
  import {myFriendAjax} from '../../api/ajax_router.js';
  import { createNamespacedHelpers } from 'vuex';
  const { mapState, mapMutations, mapActions } = createNamespacedHelpers('box/chat');
  export default {
    components: {
      'chat-component': chatComponent
    },
    data () {
      return {
        chatShow: false
      };
    },
    watch: {
      chatShow (n) {
        this.changeChatShow(n);
      }
    },
    computed: {
      ...mapState({
        connect: state => state.connect,
        remind: state => state.remind,
        connectLoading: state => state.connectLoading,
        hotChatObjIndex: state => state.hotChatObjIndex,
        hotChatObj: state => state.hotChatObj
      })
    },
    methods: {
      ...mapMutations(['changeFriendList', 'changeChatShow', 'changeRemind']),
      ...mapActions(['connectEvent']),
      chatOpenEvent () {
        let me = this;
        if (!this.connect) {
          this.connectEvent({
            fn (text) {
              me.toast(text);
              me.getFriendListFunc();
            }
          });
        } else {
          this.chatShow = true;
          this.changeRemind(false);
        }
      },
      async getFriendListFunc () {
        let result = await myFriendAjax();
        if (result.code === 200) this.changeFriendList(result.data.list);
        else this.toast(result.message);
      },
      toast (text) {
        this.$message({
          type: 'success',
          message: text
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .box {
    width: 60px;
    height: 60px;
    position: fixed;
    bottom: 20px;
    right: 40px;
    z-index: 100;
    .chat {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #aaa;
      cursor: pointer;
      display: flex;
      color: #fff;
      justify-content: center;
      align-items: center;
      box-shadow: 3px 3px 10px rgba(0,0,0,0.4);
      transition: all .1s;
      &:hover {
        background: #999;
      }
      &.suc {
        background: #20A0FF;
        &:hover {
          background: #128ae3;
        }
      }
      &.an {
        animation: an 2s infinite;
        transform: scale(1);
        background: #ff9c20;
        &:hover {
          background: #ed8e17;
        }
      }
    }
  }
  @keyframes an {
    0 {transform: scale(1);}
    50% {transform: scale(1.2); box-shadow: 5px 5px 20px rgba(0,0,0,0.5);}
    100% {transform: scale(1);}
  }
</style>
