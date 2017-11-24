<template>
  <div class="ranking">
    <div class="header">接口统计</div>
    <div class="page-main">

    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      };
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
      height: 45px;
      text-align: center;
      line-height: 45px;
      background: #20a0ff;
      color: #fff;
    }
    .page-main {
      flex: 1;
      overflow-y: scroll;
    }

  }
</style>
