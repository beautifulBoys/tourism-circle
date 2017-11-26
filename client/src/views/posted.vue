<template>
  <div class="ranking">
    <li-header class="header"
      @headerLeftEvent="configEvent(true)"
      @headerRightEvent="configEvent"
      :config="headerConfig"
    ></li-header>
    <div class="page-main">
      <ul>
        <li-user-post-item v-for="(item, index) in travel" :key="index" :data="item"></li-user-post-item>
      </ul>
    </div>
  </div>
</template>

<script>
import data from './dynamic.json';
import Item from '../components/user_post_item.vue';
export default {
  components: {
    'li-user-post-item': Item
  },
  data () {
    return {
      headerConfig: {
        left: '返回',
        title: '我分享的',
        right: '设置'
      },
      travel: []
    };
  },
  mounted () {
    this.travel = data.travel;
  },
  methods: {
    configEvent (status) {
      if (status) this.$router.go(-1);
      else console.log('好友列表触发事件');
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
