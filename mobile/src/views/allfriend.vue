<template>
  <div class="ranking">
    <li-header class="header"
      @headerLeftEvent="configEvent(true)"
      @headerRightEvent="configEvent"
      :config="headerConfig"
      :show="true"
    ></li-header>
    <div class="page-main">

      <scroller
        lock-x use-pullup height="100%" ref="scroller"
        @on-pullup-loading="loadMore"
        :pullup-config="pullUC">
        <div>
              <div class="cell-box" v-for="item in list" @click="userMainPageEvent(item)">
                <div class="id">{{item.id}}</div>
                <div class="icon">
                  <img :src="item.avatar"/>
                </div>
                <div class="other">
                  <div class="name">{{item.username}}</div>
                  <div class="desc">{{!item.desc ? '这个人太懒了，还没有填写呢' : item.desc}}</div>
                </div>
              </div>
        </div>
      </scroller>


    </div>
  </div>
</template>

<script>
import {allUserListAjax} from '../api/ajax_router.js';
import { Scroller, Spinner, Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('box2/allfriend');
  export default {
    components: {
      XButton,
      Swipeout,
      SwipeoutItem,
      Scroller,
      Spinner,
      SwipeoutButton
    },
    data () {
      return {
        headerConfig: {
          left: '返回',
          title: '所有用户'
        },
        pullUC: {
          content: '上拉加载更多',
          pullUpHeight: 120,
          height: 60,
          autoRefresh: false,
          downContent: '松手加载更多',
          upContent: '上拉加载更多',
          loadingContent: '加载中...',
          clsPrefix: 'pullup-'
        },
        pageConfig: {
          num: 20,
          page: 0
        },
        list: []
      };
    },
    computed: {
      ...mapState({
      }),
      ...mapGetters([])
    },
    mounted () {
      this.loadMore();
    },
    methods: {
      ...mapMutations([]),
      ...mapActions([]),
      userMainPageEvent (item) {
        this.$router.push({path: '/user/' + item.id});
      },
      configEvent (status) {
        if (status) this.$router.go(-1);
        else console.log('好友列表触发事件');
      },
      loadMore () {
        this.getDataEvent(this.pageConfig.num, this.pageConfig.page, (result) => {
          if (result.code === 200) {
            this.list = this.list.concat(result.data.list);
            this.$refs.scroller.donePullup();
            if (result.data.list.length < this.pageConfig.num) { // 没有下一页数据了
              this.$refs.scroller.disablePullup();
              return;
            }
            this.pageConfig.page++;
          } else {
            this.toast(result.message);
          }
        });
      },
      toast (text) {
        this.$vux.toast.show({
          text,
          position: 'middle',
          time: 3000,
          type: 'text',
          width: '16em'
        });
      },
      async getDataEvent (num, page, cbb) {
        let result = await allUserListAjax({num, page});
        cbb(result);
      }
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
    background: #eee;
    .header {
      width: 100%;
      height: 50px;
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
        background: #fff;
        &:active {
          background: #eee;
        }
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
<style lang="less">
.pullup-container {
  line-height: 60px;
  color: #666;
}
</style>
