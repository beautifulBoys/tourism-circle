<template>
  <div class="travel">
    <div class="main" style="height: calc(100% - 50px)">
      <div class="top">
        <div class="bg"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import data from './dynamic.json';
  export default {
    components: {
    },
    data () {
      return {
        travel: []
      };
    },
    created () {
      this.travel = data.travel;
    },
    methods: {
      toContentEvent () {
        this.$router.push({path: '/content'});
      }
    }
  };
</script>

<style lang="less" scoped>
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
        height: 250px;
        background: url(https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/tourism-circle/client/bg.png) no-repeat center center;
        .bg {
          width: 100%;
          height: 100%;
          background: #20a0ff;
        }
      }
      ul {
        padding: 0;
        margin: 0;
      }
    }
  }
</style>
