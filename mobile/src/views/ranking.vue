<template>
  <div class="ranking">
    <li-header class="header"
      @headerLeftEvent="configEvent(true)"
      @headerRightEvent="configEvent"
      :config="headerConfig"
      :show="true"
    ></li-header>
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
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('box2/ranking');
  export default {
    data () {
      return {
        headerConfig: {
          left: '返回',
          title: '排行榜'
        }
      };
    },
    computed: {
      ...mapState({
        list: state => state.list
      }),
      ...mapGetters([])
    },
    mounted () {
      this.getDataEvent({
        error (text) {
          console.log(text);
        }
      });
    },
    methods: {
      ...mapMutations([]),
      ...mapActions(['getDataEvent']),
      configEvent (status) {
        if (status) this.$router.go(-1);
        else console.log('好友列表触发事件');
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
    .header {
      width: 100%;
      height: 50px;
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
            color: #888;
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
