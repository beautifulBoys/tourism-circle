<template>
  <div class="travel">
    <div class="main">
      <div class="top">
        <div class="user">
          <img :src="user.avatar"/>
        </div>
        <div class="name">{{user.username}}</div>
        <div class="desc">{{user.desc || '这个人很懒，还没有填写呢'}}</div>
      </div>

      <div class="info">
        <div class="item" v-for="(item, index) in infoList" @click="clickEvent(item.path)">{{item.text}}（{{item.num}}）</div>
      </div>

      <div class="content">
        <div class="square" v-for="squareItem in list">
          <div class="title border-1px-bottom">{{squareItem.title}}</div>
          <div class="row" v-for="rowList in squareItem.arr">
            <div class="item border-1px-bottom border-1px-right" v-for="item in rowList" @click="clickItemEvent(item)">
              <div class="img-box">
                <img :src="item.icon"/>
              </div>
              <div class="text">{{item.text}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn" @click="logout">退出登录</div>
    </div>
  </div>
</template>
<script>
  import base64png from '../images/base64png.json';
  import { createNamespacedHelpers } from 'vuex';
  const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('box1/mine');
  export default {
    data () {
      return {
        travel: [],
        list: [
          {
            title: '个人中心',
            arr: [
              [
                {icon: base64png.post, text: '分享', path: '/post'},
                {icon: base64png.posted, text: '我分享的', path: '/posted'},
                {icon: base64png.comment, text: '我评论的', path: '/comment'}
              ],
              [
                {icon: base64png.star, text: '我喜欢的', path: '/likes'},
                {icon: base64png.empty, text: '规划中', path: ''},
                {icon: base64png.empty, text: '规划中', path: ''}
              ]
            ]
          },
          {
            title: '数据中心',
            arr: [
              [
                {icon: base64png.ranking, text: '排行榜', path: '/ranking'},
                // {icon: base64png.data, text: '数据统计', path: '/data'},
                {icon: base64png.api, text: '接口统计', path: '/api'},
                {icon: base64png.empty, text: '规划中', path: ''}
              ]
            ]
          },
          {
            title: '我的圈子',
            arr: [
              [
                {icon: base64png.allfriend, text: '所有用户', path: '/allfriend'},
                {icon: base64png.friend, text: '我的圈友', path: '/friend'},
                {icon: base64png.empty, text: '全站聊天室', path: '/websit_chat'}
              ]
            ]
          }
        ]
      };
    },
    computed: {
      ...mapState({
        user: state => state.user,
        infoList: state => state.infoList
      }),
      ...mapGetters([])
    },
    mounted () {
      let me = this;
      this.getDataEvent({
        error (text) {
          me.$vux.toast.show({
            text,
            position: 'middle',
            time: 3000,
            type: 'text',
            width: '15em'
          });
        }
      });
    },
    methods: {
      ...mapMutations([]),
      ...mapActions(['getDataEvent', 'logoutEvent']),
      logout () {
        this.logoutEvent();
        this.$router.push({path: '/login'});
      },
      clickEvent (path) {
        this.$router.push({path});
      },
      clickItemEvent (item) {
        if (item.path) this.$router.push({path: item.path});
      },
      toContentEvent () {
        this.$router.push({path: '/content'});
      },
      toast (text) {
        this.$vux.toast.show({
          text,
          position: 'middle',
          time: 3000,
          type: 'text',
          width: '17em'
        });
      }
    }
  };
</script>

<style lang="less" scoped>

@import '../lib/css/1px.less';
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
        background-size: 100%;
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
            .border-1px-bottom(#ddd);
          }
          .row {
            width: 100%;
            display: flex;

            .item {
              flex: 1;
              padding: 10px 0;
              // border-right: 1px solid #ddd;
              .border-1px-bottom(#ddd);
              .border-1px-right(#ddd);
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
      .btn {
        width: 70%;
        line-height: 40px;
        display: block;
        text-align: center;
        background: #20a0ff;
        color: #fff;
        margin: 30px auto 30px auto;
        &:active {
          background: #1086de;
          color: rgba(255,255,255,0.6);
        }
      }
      ul {
        padding: 0;
        margin: 0;
      }
    }
  }
</style>
