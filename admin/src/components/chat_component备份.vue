<template>
  <div class="chat-main">
    <div class="chat-left-box">
      <ul>
        <li :class="{active: index === dialogIndex}" v-for="(user, index) in list" @click="friendEvent(index)">
          <div class="user-left">
            <img :src="user.userInfo.url" />
          </div>
          <div class="user-right">
            <div class="name">{{user.userInfo.name}}</div>
            <div class="dialog">{{user.message[user.message.length - 1].msg}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="chat-right-box">
      <div class="content" ref="scroll">
        <div class="height-hook" v-if="dialogIndex !== -1">
          <div v-for="item in list[dialogIndex].message">
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
      <div class="footer">
        <div class="main">
          <el-form :model="formData">
            <input type="text" class="input" v-model="inputValue" @keyup.enter="sendEvent"/>
            <div class="send" :class="{logout: !connectState}" @click="sendEvent">发送</div>
          </el-form>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('box/chat');
export default {
  data () {
    return {
      dialogIndex: -1,
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
    })
  },
  mounted () {
    this.getDataEvent();
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(['getDataEvent', 'sendEvent']),
    friendEvent (index) {
      this.dialogIndex = index;
    }
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

    .chat-left-box {
        width: 130px;
        background: #e4e8ee;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin: 0 8px 8px 0;
        overflow: hidden;
        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
            li {
                height: 40px;
                padding: 5px;
                background: #fefefe;
                border-bottom: 1px solid #ddd;
                display: flex;
                cursor: pointer;
                &.active,
                &:hover {
                    background: #eee;
                }
                .user-left {
                    width: 30px;
                    height: 40px;
                    img {
                        width: 100%;
                        margin: 5px 0;
                        border-radius: 50%;
                    }
                }
                .user-right {
                    flex: 1;
                    height: 40px;
                    margin-left: 5px;
                    font-size: 12px;
                    line-height: 20px;
                    .name {
                        overflow: hidden;
                        height: 20px;
                    }
                    .dialog {
                        overflow: hidden;
                        height: 20px;
                        color: #aaa;
                    }
                }
            }
        }
    }
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
                    background: #e4e8ee;
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
