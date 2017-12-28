<template>
  <div class="ranking">
    <li-header class="header"
      @headerLeftEvent="configEvent(true)"
      @headerRightEvent="configEvent"
      :config="headerConfig"
      :show="true"
    ></li-header>
    <div class="page-main">
      <li-list-empty
        line1="身体和灵魂总有一个要在路上"
        line2="你的在哪？"
        :show="!list.length"
      ></li-list-empty>
            <scroller
              lock-x use-pullup height="100%" ref="scroller"
              @on-pullup-loading="loadMore"
              :pullup-config="pullUC">
              <ul>
                <li-user-post-item v-for="(item, index) in list" :key="index" :data="item"></li-user-post-item>
              </ul>
            </scroller>

    </div>
  </div>
</template>

<script>
import {myPostedAjax} from '../api/ajax_router.js';
import { Scroller, Spinner } from 'vux';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('box2/posted');
export default {
  components: {
    Scroller,
    Spinner
  },
  data () {
    return {
      headerConfig: {
        left: '返回',
        title: '我分享的'
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
        num: 10,
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
      let result = await myPostedAjax({num, page});
      cbb(result);
    }
  }
};
</script>

<style lang="less" scoped>
  .ranking {
    width: 100%;
    height: 100%;
    background: #eee;
    display: flex;
    flex-flow: column;
    .header {
      width: 100%;
      height: 50px;
      z-index: 10;
    }
    .page-main {
      flex: 1;
      overflow-y: scroll;
      ul {
        padding: 0;
        margin: 0;
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
