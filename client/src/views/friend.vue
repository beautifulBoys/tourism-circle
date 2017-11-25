<template>
  <div class="ranking">
    <li-header class="header"
      @headerLeftEvent="configEvent(true)"
      @headerRightEvent="configEvent"
      :config="headerConfig"
    ></li-header>我的圈友
    <div class="page-main">

    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        headerConfig: {
          left: '返回',
          title: '我的圈友',
          right: '设置'
        }
      };
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
    }

  }
</style>
