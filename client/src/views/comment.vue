<template>
  <div class="comment">
    <li-header class="header"
      @headerLeftEvent="configEvent(true)"
      @headerRightEvent="configEvent"
      :config="headerConfig"
    ></li-header>
    <div class="page-main">
      <ul>
        <li-user-post-item v-for="(item, index) in list" :key="index" :data="item"></li-user-post-item>
      </ul>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('box2/comment');
export default {
  data () {
    return {
      headerConfig: {
        left: '返回',
        title: '我评论的',
        right: '设置'
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
  .comment {
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
