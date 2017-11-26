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
        <!-- <div class="header" :class="{opacity: opacity}"><span>晚猛地小梦</span></div> -->
        <div class="user">
          <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/user/user%20(1).jpg"/>
        </div>
        <div class="name">晚猛地小梦</div>
        <div class="desc">sdds是的范德萨发生范德萨发生的发的是</div>
      </div>

      <div class="info">
        <div class="item">关注</div>
        <div class="item">加好友/发消息</div>
        <div class="item">站内信</div>
      </div>

      <div class="content">
        <ul>
          <li-user-post-item v-for="(item, index) in travel" :key="index" :data="item"></li-user-post-item>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import data from './dynamic.json';
  import Item from '../components/user_post_item.vue';
  export default {
    components: {
      'li-user-post-item': Item
    },
    data () {
      return {
        travel: [],
        opacity: false,
          headerConfig: {
            left: '返回',
            title: '晚猛地小梦'
          }
      };
    },
    mounted () {
      this.travel = data.travel;
      this.$refs.user_main.onscroll = () => {
        let n = this.$refs.user_main.scrollTop / 92;
        this.opacity = (n > 0.95);
      };
    },
    methods: {
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
