<template>
  <div class="persional">
    <li-header1></li-header1>
    <div class="main" style="height: calc(100% - 50px)">
      <ul>
        <li-item v-for="(item, index) in travel" :key="index" :data="item"></li-item>
      </ul>
    </div>
  </div>
</template>
<script>
  import Header from '../components/header.vue';
  import Item from '../components/item.vue';
  export default {
    components: {
      'li-header1': Header,
      'li-item': Item
    },
    data () {
      return {
      };
    },
    created () {
    },
    methods: {
      async bind () {
      }
    }
  };
</script>

<style lang="less" scoped>
  .persional {
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
