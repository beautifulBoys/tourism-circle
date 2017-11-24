<template>
  <div class="ranking">
    <div class="header">排行榜</div>
    <div class="page-main">
      <li-tab :list="list">
        <div class="swiper-slide" :key="index" v-for="(item, index) in list">
          <div class="line tab">
            <div class="index">序号</div>
            <div class="id">ID</div>
            <div class="username">用户名</div>
            <div class="num">数量</div>
          </div>
          <div class="line" v-for="(item1, index1) in item.arr" :class="{first: index1 === 0, second: index1 === 1, third: index1 === 2}">
            <div class="index"><span class="box">{{index1 + 1}}</span></div>
            <div class="id">{{item1.id}}</div>
            <div class="username">{{item1.username}}</div>
            <div class="num">{{item1.num}}</div>
          </div>
        </div>
      </li-tab>
    </div>
  </div>
</template>

<script>
import tab from '../components/tab.vue';
// import tabItem from '../components/tab_item.vue';
  export default {
    data () {
      return {
        list: [
          {
            title: '关注',
            arr: [
              {id: 1232, username: '张小二', num: 12},
              {id: 1234, username: '王小三', num: 132},
              {id: 1234, username: '赵二狗', num: 13},
              {id: 1234, username: '崔文字', num: 12},
              {id: 1234, username: '赵二狗', num: 13},
              {id: 1234, username: '崔文字', num: 12},
              {id: 1234, username: '王小三', num: 132},
              {id: 1234, username: '赵二狗', num: 13},
              {id: 1234, username: '崔文字', num: 12},
              {id: 1234, username: '赵二狗', num: 13},
              {id: 1234, username: '崔文字', num: 12},
              {id: 1234, username: '赵二狗', num: 13},
              {id: 1234, username: '崔文字', num: 12},
              {id: 1234, username: '王小三', num: 132},
              {id: 1234, username: '赵二狗', num: 13},
              {id: 1234, username: '崔文字', num: 12},
              {id: 1234, username: '赵二狗', num: 13},
              {id: 1234, username: '崔文字', num: 12},
              {id: 1234, username: '赵二狗', num: 13},
              {id: 1234, username: '崔文字', num: 12},
              {id: 1234, username: '王小三', num: 132},
              {id: 1234, username: '赵二狗', num: 13},
              {id: 1234, username: '崔文字', num: 12},
              {id: 1234, username: '赵二狗', num: 13}
            ]
          },
          {
            title: '粉丝',
            arr: [
              {id: 1232, username: '张小二', num: 12},
              {id: 1234, username: '王小三', num: 132},
              {id: 1234, username: '赵二狗', num: 13},
              {id: 1234, username: '崔文字', num: 12},
              {id: 1234, username: '赵二狗', num: 13},
              {id: 1234, username: '赵二狗', num: 13},
              {id: 1234, username: '崔文字', num: 12},
              {id: 1234, username: '赵二狗', num: 13}
            ]
          },
          {
            title: '分享',
            arr: [
              {id: 1232, username: '张小二', num: 12},
              {id: 1234, username: '王小三', num: 132},
              {id: 1234, username: '赵二狗', num: 13},
              {id: 1234, username: '赵二狗', num: 13},
              {id: 1234, username: '崔文字', num: 12},
              {id: 1234, username: '赵二狗', num: 13}
            ]
          },
          {
            title: '好友',
            arr: [
              {id: 1232, username: '张小二', num: 12},
              {id: 1234, username: '王小三', num: 132},
              {id: 1234, username: '赵二狗', num: 13},
              {id: 1234, username: '崔文字', num: 12},
              {id: 1234, username: '赵二狗', num: 13},
              {id: 1234, username: '崔文字', num: 12},
              {id: 1234, username: '王小三', num: 132},
              {id: 1234, username: '赵二狗', num: 13}
            ]
          }
        ]
      };
    },
    components: {
      'li-tab': tab
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
      color: #fff;
    }
    .page-main {
      flex: 1;
      overflow-y: scroll;
      .swiper-slide {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        .line {
          height: 50px;
          border-bottom: 1px solid #eee;
          line-height: 40px;
          box-sizing: border-box;
          padding: 5px 15px;
          display: flex;
          text-align: center;
          color: #333;
          &.tab {
            line-height: 30px;
            background: #eee;
            color: #aaa;
            font-size: 12px;
            height: 30px;
            padding: 0 15px;
            .index {
              padding: 0;
            }
          }
          &.first {
            color: #fb6d74;
            .index .box {
              background: #fb6d74;
              color: #fff;
            }
          }
          &.second {
            color: #fb9c6c;
            .index .box {
              background: #fb9c6c;
              color: #fff;
            }
          }
          &.third {
            color: #7dc1f1;
            .index .box {
              background: #7dc1f1;
              color: #fff;
            }
          }
          .index {
            width: 40px;
            padding: 5px;
            box-sizing: border-box;
            .box {
              width: 100%;
              height: 100%;
              display: block;
              border-radius: 100%;
              line-height: 30px;

            }
          }
          .id {
            width: 80px;
          }
          .username {
            flex: 1;
          }
          .num {
            width: 60px;
          }
        }
      }
    }

  }
</style>
