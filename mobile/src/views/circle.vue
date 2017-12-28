<template>
  <div class="travel">
    <li-header class="header"
      :config="headerConfig"
      :show="true"
    ></li-header>
    <div class="main" style="height: calc(100% - 50px)">
      <ul>
        <li-item v-for="(item, index) in travel" :key="index" :data="item"></li-item>
      </ul>
    </div>
  </div>
</template>
<script>
  import data from './dynamic.json';
  import dynamicItem from '../components/dynamic_item.vue';
  export default {
    components: {
      'li-item': dynamicItem
    },
    data () {
      return {
        travel: [],
        headerConfig: {
          title: '旅游圈'
        }
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
