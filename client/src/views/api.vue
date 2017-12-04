<template>
  <div class="ranking">
    <li-header class="header"
      @headerLeftEvent="configEvent(true)"
      @headerRightEvent="configEvent"
      :config="headerConfig"
      :show="true"
    ></li-header>
    <div class="page-main">
      <ul>
        <li v-for="(item, key) in info">
          <div class="item bg1">
            <div class="title">{{item.text}}</div>
            <div class="value">
              <countup :end-val="item.value" :duration="2" :start="true"></countup><span style="font-size: 14px"> 次</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Countup } from 'vux';
import {apiAjax} from '../api/ajax_router.js';
  export default {
    components: {
      Countup
    },
    data () {
      return {
        headerConfig: {
          left: '返回',
          title: '接口统计'
        },
        info: {
          allapi: {
            text: '接口请求总数',
            path: '/allapi',
            value: 0
          },
          user: {
            text: '所有用户接口',
            path: '/allUser',
            value: 0
          },
          addFriend: {
            text: '添加好友接口',
            path: '/addFriend',
            value: 0
          },
          webMail: {
            text: '发送站内信接口',
            path: '/sendWebMail',
            value: 0
          },
          posting: {
            text: '发表分享接口',
            path: '/posting',
            value: 0
          },
          login: {
            text: '登录接口',
            path: '/login',
            value: 0
          },
          userMain: {
            text: '查看用户主页接口',
            path: '/userMainInfo',
            value: 0
          },
          toFollow: {
            text: '关注接口',
            path: '/toFollow',
            value: 0
          },
          comment: {
            text: '评论接口',
            path: '/pinglun',
            value: 0
          },
          star: {
            text: '喜欢分享接口',
            path: '/star',
            value: 0
          },
          ranking: {
            text: '排行榜接口',
            path: '/ranking',
            value: 0
          },
          myFollowing: {
            text: '我的关注接口',
            path: '/myFollowing',
            value: 0
          },
          follows: {
            text: '我的粉丝接口',
            path: '/follows',
            value: 0
          },
          myPosted: {
            text: '我的分享接口',
            path: '/myPosted',
            value: 0
          },
          myFriend: {
            text: '我的圈友接口',
            path: '/myFriend',
            value: 0
          }
        },
        status: false
      };
    },
    async mounted () {
      let result = await apiAjax();
      if (result.code === 200) {
        console.log(result.data);
        let allapicount = 0;

        for (let i in result.data) {
          allapicount += result.data[i];
          for (let k in this.info) {
            if (this.info[k].path === i) this.info[k].value = result.data[i];
          }
        }
        this.info.allapi.value = allapicount;

        // this.info.user.value = result.data.user;
        // this.info.allapi.value = result.data.allapi;
        // this.info.addFriend.value = result.data.addFriend;
        // this.info.webMail.value = result.data.webMail;
        // this.info.posting.value = result.data.posting;
        // this.info.login.value = result.data.login;
        // this.info.userMain.value = result.data.userMain;
        // this.info.toFollow.value = result.data.toFollow;
        // this.info.comment.value = result.data.comment;
        // this.info.star.value = result.data.star;
        this.status = true;
      } else {
        this.toast(result.message);
      }
    },
    methods: {
      configEvent (status) {
        if (status) this.$router.go(-1);
        else console.log('好友列表触发事件');
      },
      toast (text) {
        this.$vux.toast.show({
          text,
          position: 'middle',
          time: 3000,
          type: 'text',
          width: '15em'
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import '../lib/swiper.css';
  .ranking {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    .header {
      width: 100%;
      height: 50px;
    }
    .page-main {
      flex: 1;
      overflow-y: scroll;
      ul {
        margin: 0;
        padding: 5px;
        width: 100%;
        box-sizing: border-box;
        font-size: 0;
        li {
          width: 50%;
          display: inline-block;
          height: 100px;
          padding: 5px;
          text-align: center;
          box-sizing: border-box;
          .item {
            width: 100%;
            height: 100%;
            background: url(../images/api/a.png) no-repeat right center;
            background-size: 100% 100%;
            border-radius: 5px;
            box-shadow: 2px 2px 10px rgba(255, 142, 153, 0.8);
            font-size: 16px;
            overflow: hidden;
            box-sizing: border-box;
            color: #fff;
            padding: 8px 5px;
            &:active {
              opacity: 0.8;
            }
            .title {
              text-align: center;
              line-height: 30px;
            }
            .value {
              text-align: center;
              line-height: 40px;
              font-size: 30px;
            }
          }
        }
      }
    }

  }
</style>
