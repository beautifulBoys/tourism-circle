<template>
  <div class="dynamic">
    <li-header class="header"
      @headerLeftEvent="configEvent(true)"
      @headerRightEvent="configEvent"
      :config="headerConfig"
    ></li-header>
    <div class="page-main">
      <ul>
        <li-dynamic-item v-for="(item, index) in travel" :key="index" :data="item"></li-dynamic-item>
      </ul>
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
  import { createNamespacedHelpers } from 'vuex';
  const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('box1/dynamic');
  export default {
    components: {
      'li-dynamic-item': dynamicItem
    },
    data () {
      return {
        headerConfig: {
          title: '旅游圈',
          right: '切换'
        },
        wayList: [
          {id: 'newest', text: '最新动态'},
          {id: 'hotest', text: '最热动态'},
          {id: 'mostest', text: '最多评论'}
        ],
        wayIndex: 'newest',
        wayStatus: false
      };
    },
    computed: {
      ...mapState({
        travel: state => state.travel
      }),
      ...mapGetters([])
    },
    created () {
      this.getDataFunc();
    },
    methods: {
      ...mapMutations([]),
      ...mapActions(['getDataEvent']),
      getDataFunc () {
        this.getDataEvent({
          type: this.wayIndex,
          success (text) {

          },
          error (text) {

          }
        });
      },
      wayEvent (item) {
        this.wayIndex = item.id;
        this.wayStatus = false;
        this.getDataFunc();
      },
      closeWayChioceEvent () {
        this.wayStatus = false;
      },
      configEvent (status) {
        if (status) this.$router.go(-1);
        else this.wayStatus = true;
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
