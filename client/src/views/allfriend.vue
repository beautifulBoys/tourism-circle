<template>
  <div class="ranking">
    <div class="header">所有圈友</div>
    <div class="page-main">
          <swipeout class="vux-1px-tb">
            <swipeout-item transition-mode="follow" v-for="(item, index) in [1,1,1,1]" :key="index">
              <div slot="right-menu">
                <swipeout-button background-color="rgb(252,184,207)" @click.native="friendEvent(item)">加好友</swipeout-button>
                <swipeout-button background-color="rgb(175,229,253)" @click.native="followEvent(item)">关注</swipeout-button>
              </div>
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
            </swipeout-item>
          </swipeout>
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
      };
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
      height: 45px;
      text-align: center;
      line-height: 45px;
      background: #20a0ff;
      color: #ffffff;
    }
    .page-main {
      flex: 1;
      overflow-y: scroll;
      .list-sign {
        line-height: 30px;
        background: #eee;
        font-size: 12px;
        color: #666;
        display: flex;
        padding: 0 15px;
        text-align: center;
        .id {
          width: 50px;
        }
        .icon {
          width: 50px;
        }
        .other {
          flex: 1;
        }
      }
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
