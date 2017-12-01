<template>
<div class="content" ref="content">
  <li-header
    @headerLeftEvent="configEvent(true)"
    @headerRightEvent="configEvent"
    :config="headerConfig"
    :show="headShow"
  ></li-header>

  <div class="user-info">

    <div class="swiper-container" ref="a">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in postInfo.urls"><img :src="item.url"/></div>
      </div>
      <div class="swiper-pagination"></div>
    </div>

    <div class="user" @click="$router.push({path: '/user/' + postUserInfo.id})">
      <div class="icon">
        <img class="user-icon" :src="postUserInfo.avatar"/>
      </div>
      <div class="text">{{postUserInfo.username}}</div>
    </div>
  </div>
  <div class="body1">
    <div class="info">
      <span class="title">{{postInfo.title}}</span>
      <span class="date"><span class="tag">● </span> {{postInfo.postTime}}</span>
    </div>
    <div class="content-text border-1px-bottom">{{postInfo.content}}</div>
    <div class="control">
      <div class="left">
        <img v-for="(item, index) in postInfo.starList" :src="item.avatar" :class="{se: index !== 0}" />
        <span class="kan">{{postInfo.starList.length}}人喜欢</span>
      </div>
      <div class="right">
        <span class="star" :class="{active: postInfo.isStared}" @click="starEvent"></span>
        <span class="down" @click="editorStatus = true"></span>
      </div>
    </div>
  </div>
  <div class="recommend" style="display:none;">

  </div>
  <div class="comment">
    <div class="no-comment" v-show="!postInfo.commentList.length">还没有任何评论~</div>
    <div class="row" v-for="item in postInfo.commentList">
      <div class="left">
        <img class="user-icon" :src="item.userInfo.avatar" />
      </div>
      <div class="right border-1px-bottom">
        <div class="line1">{{item.userInfo.username}}
          <!-- <div class="zan-box" @click="starEvent(item)">
            <span class="zan after"></span>
            <span class="zan-num">{{item.comment.starNum}}</span>
          </div> -->
        </div>
        <div class="line2">{{item.comment.content}}</div>
      </div>
    </div>
  </div>
  <li-screen :status="editorStatus" @close="editorStatus = false"></li-screen>
  <li-editor ref="editor" :show="editorStatus" @send="editorEvent"></li-editor>

</div>
</template>
<script>
import Swiper from 'swiper';
import {postInfoAjax, commentAjax, starAjax} from '../api/ajax_router.js';
export default {
  data () {
    return {
      id: 0,
      headerConfig: {
        left: '返回',
        title: ''
      },
      headShow: false,
      postInfo: {
        starList: [],
        commentList: []
      },
      postUserInfo: {
        username: '',
        avatar: ''
      },
      editorStatus: false
    };
  },
  mounted () {
    this.$refs.content.onscroll = () => {
      let n = this.$refs.content.scrollTop / 92;
      this.headShow = (n > 2);
    };
    if (this.$route.query.sign) this.editorStatus = true;
    if (this.$route.params.id) {
      this.id = this.$route.params.id - 0;
      this.ajaxFunc();
    } else this.toast('非法操作，请返回');
  },
  methods: {
    async starEvent () {
      let result = await starAjax({id: this.id});
      if (result.code === 200) {
        this.postInfo.isStared = (result.data.status === 'star');
        this.postInfo.starList = result.data.list;
        this.toast(result.message);
      } else this.toast(result.message);
    },
    async ajaxFunc () {
      let result = await postInfoAjax({id: this.id});
      if (result.code === 200) {
        this.postInfo = result.data;
        this.headerConfig.title = result.data.title;
        this.postUserInfo = result.data.userInfo;
        setTimeout(() => {
          this.swiperInit();
        });
      } else {
        this.toast(result.message);
      }
    },
    async editorEvent (value) {
      let result = await commentAjax({id: this.id, value});
      if (result.code === 200) {
        this.toast('评论成功');
        this.postInfo.commentList.push(result.data);
        this.$refs.editor.clear();
        this.editorStatus = false;
      } else this.toast(result.message);
    },
    swiperInit () {
      /* eslint-disable no-new */
      new Swiper(this.$refs.a, {
        loop: true,
        autoplay: 3000,
        pagination: '.swiper-pagination',
        autoplayDisableOnInteraction: false
      });
    },
    // async starEvent (item) {
    //   this.starPostCommentAjax({postId: this.id, commentId: item.id});
    // },
    toast (text) {
      this.$vux.toast.show({
        text,
        position: 'middle',
        time: 3000,
        type: 'text',
        width: '15em'
      });
    },
    configEvent (status) {
      if (status) this.$router.go(-1);
      else console.log('好友列表触发事件');
    }
  }
};
</script>

<style lang="less" scoped>
@import "../lib/swiper.css";
@import "../lib/css/1px.less";
.content {
    width: 100%;
    height: 100%;
    background: #eee;
    overflow-y: scroll;
    .header {
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        color: #fff;
    }
    .user-info {
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
            .border-1px-bottom(#ccc);
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
                  background: url("../images/svg/travel_star.svg") no-repeat center center;
                  background-size: 20px;
                  &.active {
                    background: url("../images/svg/travel_star1.svg") no-repeat center center;
                    background-size: 20px;
                  }
                }
                .down {
                  width: 35px;
                  height: 30px;
                  display: inline-block;
                  background: url("../images/svg/travel_msg.svg") no-repeat center center;
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
        .no-comment {
          font-size: 14px;
          text-align: center;
          line-height: 40px;
          color: #444;
        }
        .row {
            display: flex;
            margin-top: 10px;
            .left {
                width: 25px;
                height: 25px;
                margin-right: 10px;
                .user-icon {
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                }
            }
            .right {
                flex: 1;
                .border-1px-bottom(#ccc);
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
