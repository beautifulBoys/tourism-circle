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
  </div>
</template>
<script>
  import data from './dynamic.json';
  import dynamicItem from '../components/dynamic_item.vue';
  export default {
    components: {
      'li-dynamic-item': dynamicItem
    },
    data () {
      return {
        headerConfig: {
          title: '旅游圈'
        },
        travel: []
      };
    },
    created () {
      this.travel = data.travel;
    },
    methods: {
      configEvent (status) {
        if (status) this.$router.go(-1);
        else console.log('好友列表触发事件');
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

}
</style>
