<template>
  <div class="travel">
    <li-header></li-header>
    <div class="main" style="height: calc(100% - 50px)">

    </div>
  </div>
</template>
<script>
  import data from './dynamic.json';
  import Header from '../components/header.vue';
  export default {
    components: {
      'li-header': Header
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
      margin-top: 50px;
      overflow-y: scroll;
      ul {
        padding: 0;
        margin: 0;
      }
    }
  }
</style>
