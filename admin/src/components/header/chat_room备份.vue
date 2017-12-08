<template>
  <el-dialog title="全站聊天室" :visible.sync="chat_show" :modal-append-to-body="false">
    <div class="chat-main">
      <div class="chat-right-box">
        <div class="content" ref="scroll">
          <div class="height-hook">
            <div v-for="item in messageList">
              <div class="item-box left-hook" v-if="item.message.type === 2">
                <div class="left">
                  <img :src="item.user.avatar"/>
                </div>
                <div class="center">
                  <div class="user">{{ item.user.name }}</div>
                  <div class="text"><span class="horn">◀</span>{{ item.message.text }}</div>
                </div>
                <br style="clear: both;" />
              </div>
              <div class="item-box right-hook" v-if="item.message.type === 3">
                <div class="right">
                  <img :src="item.user.avatar"/>
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
            <el-form :model="formData">
              <el-input type="text" placeholder="回车发送消息" v-model="formData.value" @keyup.enter.native="sendMessageEvent"/>
              <el-input type="text" v-model="formData.value" style="display: none"/><!--没有这个隐藏的区块不好用，暂时不知道原因，如果你知道了，请告诉我。-->
            </el-form>
          </div>
        </div>
      </div>

    </div>
  </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('box/header');
  export default {
    data () {
      return {
        chat_show: false
      };
    },
    computed: {
      ...mapState({
        messageList: state => state.messageList,
        formData: state => state.formData,
        messageBoxShow: state => state.messageBoxShow,
        noReadMessageNum: state => state.noReadMessageNum,
        inputMessageValue: state => state.inputMessageValue,
        connect: state => state.connect,
        chatWindowOpenStatus: state => state.chatWindowOpenStatus
      })
    },
    watch: {
      chat_show (n) {
        this.changeChatWindowOpenStatus(n);
        if (n) this.toBottom();
      },
      messageList (n) {
        this.toBottom();
      }
    },
    methods: {
      toBottom () {
        this.$nextTick(() => {
          if (this.$refs.scroll) this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
        });
      },
      statusEvent (status) {
        this.chat_show = status;
        if (status) this.changeNoReadRoomNum0();
      },
      ...mapMutations(['chatRoomEvent', 'changeNoReadRoomNum0', 'changeChatWindowOpenStatus']),
      ...mapActions(['getDataEvent', 'sendMessageEvent'])
    }
  };
</script>

<style lang="less" scoped>
.chat-main {
    display: flex;
    width: 100%;
    height: 500px;
    margin: -20px 0;
    box-sizing: border-sizing;
    border-radius: 5px;
    .chat-right-box {
        flex: 1;
        height: 100%;
        display: flex;
        flex-flow: column;
        .content {
            width: 100%;
            flex: 1;
            padding: 10px;
            box-sizing: border-box;
            overflow-y: auto;
            background: #e4e8ee;
            border-radius: 5px;
            border: 1px solid #ddd;
            .item-box {
                width: 100%;
                margin-bottom: 10px;
                
                .left {
                    float: left;
                    width: 40px;
                    img {
                        height: 40px;
                        border-radius: 3px;
                    }
                }
                .right {
                    float: right;
                    width: 40px;
                    img {
                        height: 40px;
                        border-radius: 3px;
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
                            font-size: 15px;
                        }
                    }
                }
                &.center-hook {
                    text-align: center;
                    padding: 10px 0;
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
                            left: -6px;
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
                    margin-right: 10px;
                    .text {
                        background: #499eff;
                        color: #fff;
                        .horn {
                            color: #499eff;
                            right: -6px;
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
            padding: 8px 0;
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
                    background: #efefef;
                    padding: 0;
                    box-sizing: border-box;
                    border-radius: 5px 0 0 5px;
                    text-indent: 10px;
                    color: #444;
                    font-size: 14px;
                    font-family: "Microsoft YaHei";
                    &:focus {
                        border: 1px solid #ccc;
                    }
                }
                .send {
                    float: right;
                    width: 22%;
                    height: 34px;
                    outline: none;
                    background: #499eff;
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

}
</style>
