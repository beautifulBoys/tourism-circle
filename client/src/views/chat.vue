<template>
<div class="chat">
  <li-chat-header class="header-style"
    @headerLeftEvent="configEvent(true)"
    @headerRightEvent="configEvent"
    :config="headerConfig"
  ></li-chat-header>
  <div class="content" ref="scroll">
    <div class="height-hook">
      <div v-for="(item, index) in messageList">
        <div class="item-box left-hook" v-if="item.type === 2">
          <div class="left">
            <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/user/user%20(1).jpg" />
          </div>
          <div class="center">
            <div class="user">{{ item.msgUser.userName }}</div>
            <div class="text"><span class="horn">◀</span>{{ item.msg }}</div>
          </div>
          <br style="clear: both;" />
        </div>
        <div class="item-box right-hook" v-if="item.type === 3">
          <div class="right">
            <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/user/user%20(1).jpg" />
          </div>
          <div class="center">
            <div class="user">{{ item.msgUser.userName }}</div>
            <div class="text"><span class="horn">▶</span>{{ item.msg }}</div>
          </div>
          <br style="clear: both;" />
        </div>
        <div class="item-box center-hook" v-if="item.type === 1">
          <span class="tip">{{ item.msg }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="main">
      <input type="text" class="input" v-model="inputValue" @keyup.enter="sendEvent" v-show="connectState" />
      <input type="text" class="input" disabled v-show="!connectState" v-model="inputValue" />
      <div class="send" :class="{logout: !connectState}" @click="sendEvent">发送</div>
    </div>
  </div>
</div>
</template>

<style lang="less" scoped>
.chat {
    font-family: "Microsoft YaHei";
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background: #efefef;
    .header-style {
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
        height: 50px;
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
                height: 34px;
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
                height: 34px;
                outline: none;
                background: #20a0ff;
                border-radius: 0 5px 5px 0;
                box-sizing: border-box;
                text-align: center;
                line-height: 34px;
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

<script>
// import io from '../../../lib/socket.io';
import chatHeader from '../components/chat_header.vue';
export default {
  components: {
    'li-chat-header': chatHeader
  },
  data () {
    return {
      headerConfig: {
        left: '返回',
        title: '最美狼毒花',
        right: '设置'
      },
      userInfo: {},
      userNameList: ['加菲猫 ', '流氓兔', '蜡笔小新', '樱木花道', '机器猫', '皮卡丘', '史努比', '蓝精灵', '紫龙', '芭比 '],
      onlineUserList: [],
      messageList: [],
      inputValue: '',
      connectState: true
    };
  },
  created () {
    this.userInfo = {};
    this.messageList = []; // type = 1 提示信息     type = 2 对方内容     type = 3 我发送内容
  },
  mounted () {
    // this.connectEvent();
  },
  updated () {
    this.scroll();
  },
  methods: {
    connectEvent () {
      var me = this;
      var randomNum = Math.floor(Math.random() * 10);
      this.userInfo = {
        userId: this.getUserId(),
        userName: this.userNameList[randomNum],
        userImg: randomNum + 1
      };
      // this.httpServer = io.connect('http://10.209.96.67:3000');
      this.httpServer.emit('login', this.userInfo);
      this.onlineUserList.push(this.userInfo);
      this.httpServer.on('login', function (obj) {
        console.log(obj);
        me.onlineUserList = obj.onlineUserList;
        me.messageList.push({
          type: 1,
          msg: '用户 ' + obj.msgUser.userName + ' 加入聊天',
          msgUser: obj.msgUser
        });
      });
      this.httpServer.on('loginSuccess', function (obj) { // 1 成功
        if (obj.sign === 1) {
          me.onlineUserList = obj.onlineUserList;
          me.connectState = true; // 登录状态
          me.headerConfig.left = me.userInfo.userImg.toString();
          console.log('连接好了');
        }
      });
      this.httpServer.on('logout', function (obj) {
        me.messageList.push({
          type: 1,
          msg: '用户 ' + obj.msgUser.userName + ' 退出聊天',
          msgUser: obj.msgUser
        });
      });
      this.httpServer.on('message', function (obj) {
        console.log(obj);
        me.onlineUserList = obj.onlineUserList;
        me.messageList.push({
          type: 2,
          msg: obj.msg,
          msgUser: obj.user
        });
      });
    },
    unConnectEvent () {

    },
    getUserId () {
      return (new Date().getTime() + '' + Math.floor(Math.random() * 100000 + 100)) - 0;
    },
    configEvent (status) {
      if (status) this.$router.go(-1);
      else console.log('好友列表触发事件');
    },
    loginEvent () {
      console.log('加入聊天室事件');
      console.log(this.connectState);
      if (!this.connectState) {
        this.$refs.confirm.modelOpen();
      }
    },
    headCenterEvent () {
      if (this.connectState) {
        console.log('弹出群组全部成员弹窗事件');
        this.$refs.pop.modelOpen();
        console.log(this.onlineUserList);
      }
    },
    alertBtnEvent () {
      console.log('alert弹窗确认事件');
    },
    sendEvent () {
      console.log('sdfds');
      this.inputValue = this.trim(this.inputValue);
      if (this.inputValue.length > 0) {
        if (this.connectState) {
          this.httpServer.emit('message', {
            msg: this.inputValue,
            user: this.userInfo
          });
          this.messageList.push({
            type: 3,
            msg: this.inputValue,
            msgUser: this.userInfo
          });
          this.inputValue = '';
        } else {
          this.$refs.confirm.modelOpen();
        }
      }
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
      this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
    }
  }
};
</script>
