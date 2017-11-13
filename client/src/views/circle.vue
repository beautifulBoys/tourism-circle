<template>
  <div class="travel">
    <li-header></li-header>
    <div class="main" style="height: calc(100% - 50px)">
      <ul>
        <li-item v-for="(item, index) in travel" :key="index" :data="item"></li-item>
      </ul>
    </div>
  </div>
</template>
<script>
  import data from './dynamic.json';
  import Header from '../components/header.vue';
  import Item from '../components/item.vue';
  import {bind} from '../api/ajax_router.js';
  export default {
    components: {
      'li-header': Header,
      'li-item': Item
    },
    data () {
      return {
        travel: []
      };
    },
    created () {
      this.travel = data.travel;
      this.bind();
    },
    methods: {
      async bind () {
        var result = await bind();
        console.log('返回的结果：', result);
      },
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
