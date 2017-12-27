<template>
  <div class="dynamic">
    <li-header class="header"
      @headerLeftEvent="configEvent(true)"
      @headerRightEvent="configEvent"
      :config="headerConfig"
      :show="true"
    ></li-header>
    <div class="page-main">
            <scroller
              lock-x use-pullup use-pulldown height="100%" ref="scroller"
              @on-pulldown-loading="refresh"
              @on-pullup-loading="loadMore"
              :pulldown-config="pullDC" :pullup-config="pullUC">
              <ul>
                <li-dynamic-item v-for="(item, index) in list" :key="index" :data="item"></li-dynamic-item>
              </ul>
            </scroller>
    </div>

    <li-screen :status="wayStatus" @close="closeWayChioceEvent"></li-screen>

    <transition name="fade">
      <div class="way-list" v-show="wayStatus" :class="{show: wayStatus}">
        <div class="cell"
          :class="{active: wayIndex === item.id}"
          v-for="item in wayList"
          @click="wayEvent(item)"
        >{{item.text}}</div>
      </div>
    </transition>
  </div>
</template>
<script>
  import dynamicItem from '../components/dynamic_item.vue';
  import { Scroller, Spinner } from 'vux';
  import { createNamespacedHelpers } from 'vuex';
  import {getPostAjax} from '../api/ajax_router.js';
  const { mapState, mapMutations } = createNamespacedHelpers('box1/dynamic');

  export default {
    components: {
      'li-dynamic-item': dynamicItem,
      Scroller,
      Spinner
    },
    data () {
      return {
        headerConfig: {
          title: '旅游圈',
          right: '切换'
        },
        wayStatus: false,
        pullDC: {
          content: '下拉刷新',
          height: 60,
          autoRefresh: false,
          downContent: '下拉刷新',
          upContent: '松手刷新',
          loadingContent: '刷新中...',
          clsPrefix: 'pulldown-'
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
        list: [],
        refreshAjaxStatus: false
      };
    },
    computed: {
      ...mapState({
        wayList: state => state.wayList,
        wayIndex: state => state.wayIndex
      })
    },
    created () {
      this.refresh();
    },
    methods: {
      ...mapMutations(['changeWayIndex']),
      loadMore () {
        this.getDataEvent(this.wayIndex, this.pageConfig.num, this.pageConfig.page, (result) => {
          if (result.code === 200) {
            this.list = this.list.concat(result.data.list);
            this.$refs.scroller.donePulldown();
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
      refresh () {
        if (this.refreshAjaxStatus) return; // 解决连续刷新的问题
        this.refreshAjaxStatus = true;
        this.getDataEvent(this.wayIndex, this.pageConfig.num, 0, (result) => {
          if (result.code === 200) {
            this.list = result.data.list;
            this.pageConfig.page = 1;
            this.$refs.scroller.donePulldown();
            this.$refs.scroller.donePullup();
            if (result.data.list.length === this.pageConfig.num) this.$refs.scroller.enablePullup();
          } else {
            this.toast(result.message);
          }
          this.refreshAjaxStatus = false;
        });
      },
      async getDataEvent (type, num, page, cbb) {
        let result = await getPostAjax({type, num, page});
        cbb(result);
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
      wayEvent (item) {
        this.wayStatus = false;
        this.changeWayIndex(item);
        this.list = [];
        this.refresh();
      },
      closeWayChioceEvent () {
        this.wayStatus = false;
      },
      configEvent (status) {
        if (!status) this.wayStatus = true;
      },
      toContentEvent () {
        this.$router.push({path: '/content'});
      }
    }
  };
</script>

<style lang="less" scoped>
.dynamic {
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
    ul {
      padding: 0;
      margin: 0;
    }

  }
  .way-list {
    width: 120px;
    height: 0;
    background: #fff;
    position: fixed;
    top: 50px;
    right: 0;
    transition: all .5s;
    z-index: 10;
    &.show {
      height: 153px;
    }

    &.fade-enter-active,
    &.fade-leave-active {
        transition: opacity .4s;
    }
    &.fade-enter,
    &.fade-leave-to {
        opacity: 0;
    }

    .cell {
      line-height: 50px;
      border-bottom: 1px solid #eee;
      padding: 0 15px;
      box-sizing: border-box;
      &.active {
        color: #20a0ff;
      }
    }
  }

}
</style>
<style lang="less">
.pullup-container, .pulldown-container {
  line-height: 60px;
  color: #666;
}
</style>
