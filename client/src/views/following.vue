<template>
  <div class="following">
    <li-header class="header"
      @headerLeftEvent="configEvent(true)"
      @headerRightEvent="configEvent"
      :config="headerConfig"
    ></li-header>
    <div class="page-main">

              <div class="cell-box" slot="content">
                <div class="id">2345</div>
                <div class="icon">
                  <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/user/user%20(1).jpg"/>
                </div>
                <div class="other">
                  <div class="name">速度防守打法</div>
                  <div class="desc">闪电发货梵蒂冈梵蒂冈发个梵蒂冈郭德纲地方地方规范地方</div>
                </div>
              </div>

    </div>
  </div>
</template>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux';
  export default {
    components: {
      XButton,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    },
    data () {
      return {
        headerConfig: {
          left: '返回',
          title: '我的粉丝',
          right: '设置'
        }
      };
    },
    methods: {
      configEvent (status) {
        if (status) this.$router.go(-1);
        else console.log('好友列表触发事件');
      }
    }
  };
</script>

<style lang="less" scoped>
  @import '../lib/swiper.css';
  .following {
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
      .cell-box {
        height: 60px;
        width: 100%;
        display: flex;
        padding: 5px 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        .id {
          width: 50px;
          line-height: 50px;
          text-align: center;
        }
        .icon {
          width: 50px;
          padding: 5px;
          box-sizing: border-box;
          img {
            width: 100%;
            border-radius: 100%;
          }
        }
        .other {
          flex: 1;
          margin-left: 5px;
          .name {
            font-size: 16px;
            color: #333;
            line-height: 28px;
          }
          .desc {
            font-size: 13px;
            color: #aaa;
            line-height: 20px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;

          }
        }

      }
    }

  }
</style>
