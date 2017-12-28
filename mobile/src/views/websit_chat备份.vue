<template>
<div class="chat">
  <li-header class="header"
    @headerLeftEvent="configEvent(true)"
    @headerRightEvent="configEvent"
    :config="headerConfig"
  ></li-header>
  <div class="content" ref="scroll">
    <div class="height-hook">
      <div v-for="item in messageList">
        <div class="item-box left-hook" v-if="item.message.type === 2">
          <div class="left">
            <img :src="userIconUrl"/>
          </div>
          <div class="center">
            <div class="user">{{ item.user.name }}</div>
            <div class="text"><span class="horn">◀</span>{{ item.message.text }}</div>
          </div>
          <br style="clear: both;" />
        </div>
        <div class="item-box right-hook" v-if="item.message.type === 3">
          <div class="right">
            <img :src="userIconUrl"/>
          </div>
          <div class="center">
            <div class="user">{{ item.user.name }}</div>
            <div class="text"><span class="horn">▶</span>{{ item.message.text }}</div>
          </div>
          <br style="clear: both;" />
        </div>
        <div class="item-box center-hook" v-if="item.message.type === 1">
          <span class="tip">{{ item.message.text }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="main">
      <input type="text" class="input" v-model="inputValue" @keyup.enter="thisPageSendMessageEvent" v-show="connect" />
      <input type="text" class="input" disabled v-show="!connect" v-model="inputValue" />
      <div class="send" :class="{logout: !connect}" @click="thisPageSendMessageEvent">发送</div>
    </div>
  </div>
</div>
</template>

<script>
// import io from '../../../lib/socket.io';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('websitChat');
export default {
  data () {
    return {
      headerConfig: {
        left: '返回',
        title: '全站聊天室'
      },
      userIconUrl: 'https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/user/user%20(3).jpg',
      inputValue: ''
    };
  },
  computed: {
    ...mapState({
      messageList: state => state.messageList,
      connect: state => state.connect
    })
  },
  watch: {
    inputValue (n) {
      this.changeSendValue(n);
    }
  },
  mounted () {
    // this.connectServer();
  },
  methods: {
    ...mapMutations(['changeSendValue']),
    ...mapActions(['connectServer', 'sendMessageEvent']),
    getUserId () {
      return (new Date().getTime() + '' + Math.floor(Math.random() * 100000 + 100)) - 0;
    },
    thisPageSendMessageEvent () {
      let me = this;
      this.sendMessageEvent({
        success () {
          me.inputValue = '';
          setTimeout(me.scroll);
        }
      });
    },
    configEvent (status) {
      if (status) this.$router.go(-1);
      else console.log('好友列表触发事件');
    },
    trim (s) {
      return s.replace(/(^\s*)|(\s*$)/g, '');
    },
    confirmBtnEvent (num) {
      if (num === 1) {
        this.connectEvent();
      }
    },
    scroll () {
      this.$nextTick(() => {
        this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
      });
    }
  }
};
</script>

<style lang="less" scoped>
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
    .content {
        width: 100%;
        flex: 1;
        display: block;
        padding: 10px;
        box-sizing: border-box;
        overflow-y: auto;
        .item-box {
            width: 100%;
            margin-bottom: 10px;
            .left {
                float: left;
                width: 40px;
                img {
                    height: 40px;
                }
            }
            .right {
                float: right;
                width: 40px;
                img {
                    height: 40px;
                }
            }
            .center {
                max-width: 65%;
                .text {
                    position: relative;
                    font-size: 13px;
                    padding: 8px 10px 5px;
                    border-radius: 3px;
                    line-height: 20px;
                    .horn {
                        position: absolute;
                        top: 5px;
                        font-size: 12px;
                    }
                }
            }
            &.center-hook {
                text-align: center;
                padding: 20px 0;
                .tip {
                    padding: 3px 6px;
                    border-radius: 2px;
                    background: rgba(0, 0, 0, 0.2);
                    color: #fff;
                    font-size: 12px;
                    line-height: 12px;
                }
            }
        }
        .left-hook {
            .center {
                float: left;
                margin-left: 10px;
                .text {
                    background: #fff;
                    color: #333;
                    .horn {
                        color: #fff;
                        left: -8px;
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
                float: right;
                text-align: right;
                margin-right: 10px;
                .text {
                    background: #499eff;
                    color: #fff;
                    .horn {
                        color: #499eff;
                        right: -8px;
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
        border-top: 1px solid #dedede;
        padding: 8px 10px;
        box-sizing: border-box;
        .main {
            width: 100%;
            height: 100%;
            .input {
                float: left;
                width: 78%;
                height: 39px;
                outline: none;
                border: 1px solid #ddd;
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
                float: right;
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
