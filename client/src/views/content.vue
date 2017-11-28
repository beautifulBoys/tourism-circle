<template>
<div class="content">
  <div class="header">


    <div class="swiper-container" ref="a">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in pictures"><img :src="item"/></div>
      </div>
      <div class="swiper-pagination"></div>
    </div>


    <div class="user">
      <div class="icon">
        <img class="user-icon" src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/user/user%20(1).jpg" />
      </div>
      <div class="text">旅行的意义</div>
    </div>
  </div>
  <div class="body1">
    <div class="info">
      <span class="title">{{contentInfo.title}}</span>
      <span class="date"><span class="tag">● </span> {{contentInfo.date}}</span>
    </div>
    <div class="content-text">{{contentInfo.content}}</div>
    <div class="control">
      <div class="left">
        <img v-for="(item, index) in browseList" :src="item.icon" :class="{se: index !== 0}" />
        <span class="kan">{{browseList.length}}人浏览</span>
      </div>
      <div class="right">
        <span class="star"></span>
        <span class="down"></span>
      </div>
    </div>
  </div>
  <div class="recommend" style="display:none;">

  </div>
  <div class="comment">
    <div class="row" v-for="item in commentList">
      <div class="left">
        <img class="user-icon" :src="item.user.icon" />
      </div>
      <div class="right">
        <div class="line1">{{item.user.name}}
          <div class="zan-box">
            <span class="zan after"></span>
            <span class="zan-num">{{item.comment.starNum}}</span>
          </div>
        </div>
        <div class="line2">{{item.comment.content}}</div>
      </div>
    </div>
  </div>

</div>
</template>
<script>
import dataJson from './content.json';
import Swiper from 'swiper';
export default {
  data () {
    return {
      pictures: [],
      contentInfo: {
        title: '',
        date: '',
        content: ''
      },
      browseList: [],
      commentList: []
    };
  },
  mounted () {
    this.ajaxEvent();
    this.pictures = dataJson.pictures;
    this.contentInfo = dataJson.contentInfo;
    this.browseList = dataJson.browseList;
    this.commentList = dataJson.commentList;
    setTimeout(() => {
      this.swiperInit();
    });
  },
  methods: {
    swiperInit () {
      /* eslint-disable no-new */
      new Swiper(this.$refs.a, {
        loop: true,
        autoplay: 3000,
        pagination: '.swiper-pagination',
        autoplayDisableOnInteraction: false
      });
    },
    ajaxEvent () {
    },
    leftEvent () {
      this.$emit('sidebarMenu');
    }
  }
};
</script>

<style lang="less" scoped>
@import "../lib/swiper.css";
.content {
    width: 100%;
    height: 100%;
    background: #eee;
    overflow-y: scroll;
    .header {
        width: 100%;
        height: 280px;
        position: relative;
        .swiper-container {
          width: 100%;
          .swiper-pagination {
            font-size: 16px;
            padding: 0 20px;
            box-sizing: border-box;
            text-align: right;
          }
          .swiper-slide {
            position: relative;
            height: 0;
            padding-top: 280px;
            img {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
            }
          }
        }
        .user {
            line-height: 40px;
            height: 40px;
            border-radius: 20px;
            background: #fff;
            display: flex;
            position: absolute;
            bottom: 15px;
            left: 15px;
            z-index: 10;
            .icon {
                width: 40px;
                .user-icon {
                    width: 90%;
                    height: 90%;
                    margin: 5%;
                    border-radius: 100%;
                }
            }
            .text {
                flex: 1;
                padding: 0 15px 0 10px;
                font-size: 14px;
            }
        }
    }
    .body1 {
        width: 100%;
        padding: 15px;
        background: #fff;
        box-sizing: border-box;
        .info {
            .title {
                width: 100%;
                display: block;
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
        .content-text {
            font-size: 14px;
            line-height: 22px;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
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
    .recommend {
        width: 100%;
        height: 100px;
        margin: 10px 0;
        background: #fff;
    }
    .comment {
        width: 100%;
        background: #fff;
        padding: 10px 15px;
        margin-top: 10px;
        box-sizing: border-box;
        .row {
            display: flex;
            margin-top: 10px;
            .left {
                width: 22px;
                height: 22px;
                margin-right: 10px;
                .user-icon {
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                }
            }
            .right {
                flex: 1;
                border-bottom: 1px solid #eee;
                .line1 {
                    line-height: 22px;
                    font-size: 12px;
                    color: #888;
                    .zan-box {
                        height: 30px;
                        float: right;
                        display: flex;
                        margin-top: -6px;
                        padding: 0 3px;
                        .zan-num {
                            flex: 1;
                            line-height: 33px;
                            display: inline-block;
                        }
                        .zan {
                            width: 20px;
                            height: 30px;
                            display: inline-block;
                            &.before {
                                background: url("../images/content/zan_before.svg") no-repeat center center;
                                background-size: 20px;
                            }
                            &.after {
                                background: url("../images/content/zan_after.svg") no-repeat center center;
                                background-size: 20px;
                            }
                        }

                    }
                }
                .line2 {
                    line-height: 20px;
                    font-size: 14px;
                    margin: 5px 0 8px;
                }
            }
        }
    }
}
</style>
<style lang="less">
  .swiper-pagination-bullet-active {
    background: rgb(34, 166, 255);
  }
</style>
