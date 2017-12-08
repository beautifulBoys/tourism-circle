<template>
<div class="ranking">
  <h1>接口统计</h1>
  <div class="content-box">
    <div class="item" v-for="(item, key) in info">
      <div class="title">{{item.text}}</div>
      <div class="number">
        <countup :startVal="0" :endVal="item.value"></countup><span class="second">次</span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {apiAjax} from '../api/ajax_router.js';
import countup from '../components/countup.vue';
export default {
  components: {
    countup
  },
  data () {
    return {
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
      }
    };
  },
  mounted () {
    this.getDate();
  },
  methods: {
    async getDate () {
      let result = await apiAjax();
      if (result.code === 200) {
        let allapicount = 0;
        for (let i in result.data) {
          allapicount += result.data[i];
          for (let k in this.info) {
            if (this.info[k].path === i) this.info[k].value = result.data[i];
          }
        }
        this.info.allapi.value = allapicount;
        this.status = true;
      } else {
        this.$message({type: 'error', message: result.message});
      }
    }
  }
};
</script>

<style lang="less" scoped>
.ranking {
    box-sizing: border-box;
    padding: 20px 30px;
    h1 {
        font-size: 20px;
        font-weight: 700;
        color: #666;
        margin-bottom: 20px;
    }
    .content-box {
        width: 100%;
        height: 200px;
        .item {
          width: 250px;
          height: 150px;
          background: #edf8fe;
          border: 1px solid #b3e3fc;
          padding: 20px;
          box-sizing: border-box;
          border-radius: 2px;
          margin: 10px;
          display: inline-block;
          overflow: hidden;
          transition: all .5s;
          cursor: pointer;
          &:hover {
            transform: translate3d(0, -5px, 0);
            box-shadow: 0 4px 15px rgba(32, 160, 255, 0.2);
            border: 1px solid #20A0FF;
          }
          .title {
            font-size: 20px;
            color: #666;
            line-height: 30px;
          }
          .number {
            font-size: 40px;
            color: #20A0FF;
            text-align: center;
            line-height: 80px;
            .second {
              font-size: 16px;
              color: #999;
              margin: 0 5px;
            }
          }
        }
    }
}
</style>
