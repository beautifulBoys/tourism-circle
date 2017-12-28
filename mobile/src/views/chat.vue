<template>
<div class="chat">
  <chat-header class="header"
    @headerLeftEvent="configEvent(true)"
    @headerRightEvent="configEvent"
    :noRead="noReadUserNum"
    :config="headerConfig"
  ></chat-header>
  <div class="content" ref="scroll">
    <div class="height-hook">
      <div v-for="(item, index) in hotChatObj[hotChatObjIndex].list">
        <div class="item-box left-hook" v-if="item.type === 1">
          <div class="left">
            <img :src="hotChatObj[hotChatObjIndex].userInfo.avatar" />
          </div>
          <div class="center">
            <div class="user">{{ hotChatObj[hotChatObjIndex].userInfo.username }}</div>
            <pre class="text"><span class="horn">◀</span>{{ item.message }}</pre>
          </div>
          <div class="right"></div>
        </div>
        <div class="item-box right-hook" v-if="item.type === 0">
          <div class="left"></div>
          <div class="center">
            <div class="user">{{ meInfo.username }}</div>
            <pre class="text"><span class="horn">▶</span>{{ item.message }}</pre>
          </div>
          <div class="right">
            <img :src="meInfo.avatar" />
          </div>
        </div>
        <div class="item-box center-hook" v-if="item.type === 2">
          <span class="tip">{{ item.message }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="footer border-1px-top">
    <div class="main">

      <input type="text" class="input" placeholder="回车发送消息" v-model="inputValue" @keyup.enter="sendEvent" v-show="connectState" />
      <input type="text" class="input" disabled v-show="!connectState" v-model="inputValue" />
      <div class="send" :class="{logout: !connectState}" @click="sendEvent">发送</div>
    </div>
  </div>
  <li-screen :opacity="0.5" :status="userListStatus" @close="closeChatUserEvent"></li-screen>
  <div class="chat-list" :class="{move: userListStatus}">
    <div class="title">热聊列表</div>
    <div class="list-box">
      <div class="cell-box border-1px-bottom" :class="{noread: item.noReadMessageNum}" v-for="(item, key) in hotChatObj" @click="choiceUserChatEvent(key)">
        <div class="icon">
          <img :src="item.userInfo.avatar"/>
        </div>
        <div class="name">{{item.userInfo.username}}</div>
        <span class="sign" v-show="item.noReadMessageNum">{{item.noReadMessageNum}}</span>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import chatHeader from '../components/chat/chat_header.vue';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('chat');
export default {
  components: {
    'chat-header': chatHeader
  },
  data () {
    return {
      inputValue: '',
      connectState: true,
      userListStatus: false
    };
  },
  computed: {
    ...mapState({
      headerConfig: state => state.headerConfig,
      hotChatObj: state => state.hotChatObj,
      hotChatObjIndex: state => state.hotChatObjIndex,
      meInfo: state => state.meInfo,
      noReadUserNum: state => state.noReadUserNum
    }),
    ...mapGetters([])
  },
  mounted () {
    this.saveScrollFunc(this.scroll);
    this.userInfoInit();
  },
  methods: {
    ...mapMutations(['changeChatUserIndex', 'saveScrollFunc']),
    ...mapActions(['getDataEvent', 'sendMessageEvent', 'userInfoInit']),
    choiceUserChatEvent (key) {
      this.userListStatus = false;
      this.changeChatUserIndex(key);
    },
    closeChatUserEvent () {
      this.userListStatus = false;
    },
    configEvent (status) {
      if (status) this.$router.go(-1);
      else this.userListStatus = true;
    },
    sendEvent () {
      let value = this.trim(this.inputValue);
      this.inputValue = '';
      if (!value) return;
      this.sendMessageEvent({
        type: 0,
        message: value
      });
    },
    trim (s) {
      return s.replace(/(^\s*)|(\s*$)/g, '');
    },
    scroll () {
      let me = this;
      this.$nextTick(() => {
        me.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import '../lib/css/1px.less';
.chat {
    font-family: "Microsoft YaHei";
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background: #efefef;
    .header {
      height: 50px;
      width: 100%;
    }
    .chat-list {
      width: 50%;
      height: 100%;
      background: #fff;
      box-sizing: border-box;
      position: fixed;
      top: 0;
      left: 0;
      overflow: hidden;
      transform: translate3d(200%, 0, 0);
      z-index: 10;
      transition: all .4s;
      display: flex;
      flex-flow: column;
      &.move {
        transform: translate3d(100%, 0, 0);
      }
      .title {
        line-height: 50px;
        width: 100%;
        height: 50px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        background: #20a0ff;
      }
      .list-box {
        overflow-y: scroll;
        flex: 1;
        .cell-box {
          height: 50px;
          width: 100%;
          display: flex;
          padding: 7px 15px;
          box-sizing: border-box;
          .border-1px-bottom(#ccc);
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
          &.noread {
            background: rgba(255, 152, 0, 0.3);
          }
          .sign {
            background: red;
            float: right;
            height: 21px;
            display: block;
            line-height: 21px;
            text-align: center;
            margin: 7px 0;
            border-radius: 10px;
            color: #fff;
            padding: 0 6px;
          }
          .name {
            flex: 1;
            margin-left: 10px;
            font-size: 16px;
            color: #333;
            line-height: 36px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1; // 超出行数
            overflow: hidden;

          }
        }
      }

    }
    .content {
        width: 100%;
        flex: 1;
        display: block;
        padding: 10px;
        box-sizing: border-box;
        overflow-y: auto;
        .item-box {
            width: 100%;
            margin-bottom: 20px;
            display: flex;
            .left {
                width: 40px;
                img {
                    height: 40px;
                }
            }
            .right {
                width: 40px;
                img {
                    height: 40px;
                }
            }
            .center {
                flex: 1;
                .text {
                    position: relative;
                    font-size: 16px;
                    padding: 8px;
                    border-radius: 5px;
                    line-height: 24px;
                    display: inline-block;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    margin: 0;
                    .horn {
                        position: absolute;
                        top: 5px;
                        font-size: 16px;
                    }
                }
            }
            &.center-hook {
                .tip {
                    text-align: center;
                    padding: 5px 15px;
                    border-radius: 2px;
                    background: rgba(0, 0, 0, 0.2);
                    color: #fff;
                    font-size: 12px;
                    margin: 0 auto;
                }
            }
        }
        .left-hook {
            .center {
                margin-left: 10px;
                .text {
                    background: #fff;
                    color: #333;
                    box-shadow: 0 0 1px rgba(0,0,0,0.2);
                    .horn {
                        color: #fff;
                        left: -7px;
                    }
                }
                .user {
                    margin-bottom: 5px;
                    font-size: 12px;
                    color: #aaa;
                    line-height: 12px;
                }
            }
        }
        .right-hook {
            .center {
                margin-right: 10px;
                .text {
                    background: #499eff;
                    color: #fff;
                    float: right;
                    .horn {
                        color: #499eff;
                        right: -7px;
                    }
                }
                .user {
                    text-align: right;
                    margin-bottom: 5px;
                    font-size: 12px;
                    color: #aaa;
                    line-height: 12px;
                }
            }
        }
    }
    .userList {
        h5 {
            margin: 0;
            padding-top: 15px;
            line-height: 25px;
            text-align: center;
            color: #444;
        }
        ul {
            padding: 15px 0;
            margin: 0 auto;
            width: 90%;
            font-size: 0;
            li {
                width: 25%;
                display: inline-block;
                .box {
                    width: 80%;
                    margin: 0 auto;
                    padding-bottom: 5px;
                    img {
                        width: 100%;
                    }
                    .name {
                        width: 100%;
                        text-align: center;
                        line-height: 16px;
                        color: #888;
                        font-size: 12px;
                    }
                }
            }
        }
    }
    .footer {
        width: 100%;
        height: 55px;
        background: #fff;
        .border-1px-top(#ccc);
        padding: 8px 10px;
        box-sizing: border-box;
        .main {
            width: 100%;
            height: 100%;
            display: flex;
            .input {
                flex: 1;
                height: 39px;
                outline: none;
                border: 1px solid #ccc;
                border-right: none;
                background: #efefef;
                padding: 0;
                box-sizing: border-box;
                border-radius: 5px 0 0 5px;
                text-indent: 10px;
                color: #444;
                font-size: 14px;
                font-family: "Microsoft YaHei";
                &:focus {
                    border: 1px solid rgba(32, 160, 255, 1);
                    border-right: none;
                }
            }
            .send {
                width: 22%;
                height: 39px;
                outline: none;
                background: #20a0ff;
                border-radius: 0 5px 5px 0;
                box-sizing: border-box;
                text-align: center;
                line-height: 39px;
                color: #fff;
                cursor: pointer;
                &.logout {
                    background: #aaa;
                }
            }
        }
    }
}
</style>
