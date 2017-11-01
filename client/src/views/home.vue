<template>
  <div class="travel">
    <div class="header">
      <div class="left"></div>
      <div class="center">旅游圈</div>
      <div class="right"></div>
    </div>
    <div class="main" style="height: calc(100% - 50px)">
      <ul>
        <li v-for="item in travel">
          <div class="head">
            <div class="left" @click="toContentEvent()">
              <img :src="item.userInfo.img"/>
            </div>
            <div class="center" @click="toContentEvent()">
              <span class="name">{{item.userInfo.name}}</span>
              <span class="desc">{{item.userInfo.desc}}</span>
            </div>
            <div class="right"></div>
          </div>
          <div class="imgList">
            <ul :style="{'width': item.imgList.length * 195 + 'px'}">
              <li v-for="imgItem in item.imgList">
                <img :src="imgItem"/>
              </li>
            </ul>
          </div>
          <div class="footer">
            <div class="info">
              <span class="title">{{item.topicInfo.title}}</span>
              <span class="date"><span class="tag">● </span> {{item.topicInfo.desc}}</span>
            </div>
            <div class="control">
              <div class="left">
                <img v-for="(img, index) in item.bottomInfo.starList" :src="img" :class="{se: index != 0}"/>
                <span class="kan">{{item.bottomInfo.num}}人浏览</span>
              </div>
              <div class="right">
                <span class="star"></span>
                <span class="down"></span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import data from './home.json';
  export default {
    data () {
      return {
        travel: []
      };
    },
    created () {
      this.travel = data.travel;
    },
    methods: {
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
      margin-top: 50px;
      overflow-y: scroll;
      ul {
        padding: 0;
        margin: 0;
        li {
          padding: 0;
          margin: 0 0 10px 0;
          background: #fff;
          font-size: 0;
          .head {
            width: 100%;
            height: 50px;
            display: flex;
            padding: 10px 0;
            .left {
              width: 50px;
              height: 50px;
              img {
                width: 70%;
                margin: 15%;
                border-radius: 50%;
              }
            }
            .center {
              flex: 1;
              color: #333;
              span.name {
                margin: 8px 0 3px 0;
                color: #333;
                width: 100%;
                display: block;
                font-size: 14px;
              }
              span.desc {
                color: #888;
                width: 100%;
                display: block;
                font-size: 12px;
              }
            }
            .right {
              width: 50px;
              height: 50px;
              background: url(../images/svg/share.svg) no-repeat center center;
              background-size: 18px;
            }
          }
          .imgList {
            width: 100%;
            height: 120px;
            padding: 0 3%;
            box-sizing: border-box;
            overflow-x: scroll;
            ul {
              height: 100%;
              padding: 0;
              margin: 0;
              font-size: 0;
              li {
                padding: 0;
                margin: 0 10px 0 0;
                height: 100%;
                display: inline-block;
                img {
                  height: 100%;
                  width: 185px;
                  border-radius: 4px;
                }
              }
            }
          }
          .footer {
            padding: 10px;
            box-sizing: border-box;
            .info {
              border-bottom: 1px solid #eee;
              padding-bottom: 10px;
              .title {
                width: 100%;
                display: block;
                font-size: 15px;
                line-height: 25px;
              }
              .date {
                width: 100%;
                color: #888;
                font-size: 12px;
                .tag {
                  font-size: 8px;
                  color: #3c95d8;
                }
              }
            }
            .control {
              height: 30px;
              width: 100%;
              padding-top: 10px;
              .left {
                width: 50%;
                float: left;
                img {
                  width: 26px;
                  border: 2px solid #fff;
                  border-radius: 50%;
                  &.se {
                    margin-left: -10px;
                  }
                }
                .kan {
                  line-height: 30px;
                  vertical-align: top;
                  height: 30px;
                  font-size: 12px;
                }
              }
              .right {
                width: 50%;
                height: 30px;
                float: right;
                text-align: right;
                .star {
                  width: 35px;
                  height: 30px;
                  display: inline-block;
                  background: url("../images/svg/travel_star1.svg") no-repeat center center;
                  background-size: 20px;
                }
                .down {
                  width: 35px;
                  height: 30px;
                  display: inline-block;
                  background: url("../images/svg/travel_msg1.svg") no-repeat center center;
                  background-size: 20px;
                }
              }
            }
          }
        }
      }
    }
    .header {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #ddd;
      position: fixed;
      top: 0;
      display: flex;
      background: #fff;
      z-index: 10;
      .left {
        width: 50px;
        height: 50px;
        background: url(../images/svg/travel_check.svg) no-repeat center center;
        background-size: 20px;
      }
      .center {
        flex: 1;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        color: #333;
      }
      .right {
        width: 50px;
        height: 50px;
        background: url(../images/svg/travel_search.svg) no-repeat center center;
        background-size: 20px;
      }
    }
  }
</style>
