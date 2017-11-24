<template>
  <div class="travel" ref="travel">
    <div class="main">
      <div class="top">
        <div class="header" :class="{opacity: opacity}"><span>晚猛地小梦</span></div>
        <div class="user">
          <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/user/user%20(1).jpg"/>
        </div>
        <div class="name">晚猛地小梦</div>
        <div class="desc">sdds是的范德萨发生范德萨发生的发的是</div>
      </div>

      <div class="info">
        <div class="item">关注（2）</div>
        <div class="item">好友（24）</div>
        <div class="item">粉丝（234）</div>
      </div>
      <div class="content">
        <div class="square" v-for="squareItem in list">
          <div class="title">{{squareItem.title}}</div>
          <div class="row" v-for="rowList in squareItem.arr">
            <div class="item" v-for="item in rowList" @click="clickItemEvent(item)">
              <div class="img-box">
                <img :src="item.icon"/>
              </div>
              <div class="text">{{item.text}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Card, XButton} from 'vux';
  import data from './dynamic.json';
  import base64png from '../images/base64png.json';
  export default {
    components: {
      card: Card,
      'x-buttom': XButton
    },
    data () {
      return {
        travel: [],
        opacity: false,
        list: [
          {
            title: '个人中心',
            arr: [
              [
                {icon: base64png.posted, text: '我发表的', path: ''},
                {icon: base64png.comment, text: '我评论的', path: ''},
                {icon: base64png.star, text: '我喜欢的', path: ''}
              ],
              [
                {icon: base64png.empty, text: '规划中', path: ''},
                {icon: base64png.empty, text: '规划中', path: ''},
                {icon: base64png.empty, text: '规划中', path: ''}
              ]
            ]
          },
          {
            title: '数据中心',
            arr: [
              [
                {icon: base64png.ranking, text: '排行榜', path: ''},
                {icon: base64png.data, text: '接口统计', path: ''},
                {icon: base64png.empty, text: '规划中', path: ''}
              ]
            ]
          },
          {
            title: '我的圈子',
            arr: [
              [
                {icon: base64png.friend, text: '所有圈友', path: ''},
                {icon: base64png.friend, text: '我的圈友', path: ''},
                {icon: base64png.empty, text: '规划中', path: ''}
              ]
            ]
          }
        ]
      };
    },
    mounted () {
      this.travel = data.travel;
      this.$refs.travel.onscroll = () => {
        let n = this.$refs.travel.scrollTop / 92;
        this.opacity = (n > 0.95);
      };
    },
    methods: {
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
  .travel {
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
          height: 45px;
          text-align: center;
          line-height: 45px;
          color: #fff;
          position: fixed;
          top: 0;
          left: 0;
          background: #fff;
          color: #333;
          opacity: 0;
          border-bottom: 1px solid #ddd;
          transition: opacity .5s;
          &.opacity {
            opacity: 1;
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
        }
      }
      .content {
        margin-bottom: 10px;
        .square {
          background: #fff;
          margin-top: 10px;
          .title {
            line-height: 36px;
            font-size: 14px;
            padding: 0 15px;
            box-sizing: border-box;
            color: #888;
            border-bottom: 1px solid #eee;
          }
          .row {
            width: 100%;
            display: flex;

            .item {
              flex: 1;
              padding: 10px 0;
              border-right: 1px solid #eee;
              border-bottom: 1px solid #eee;
              &:active {
                background: #f4f4f4;
              }
              .img-box {
                width: 100%;
                height: 25px;
                img {
                  height: 100%;
                  margin: 0 auto;
                  display: block;
                }
              }
              .text {
                text-align: center;
                font-size: 13px;
                line-height: 30px;
                height: 25px;
              }
              &:last-child {
                border-right: none;
              }
            }
          }
        }
      }
      ul {
        padding: 0;
        margin: 0;
      }
    }
  }
</style>
