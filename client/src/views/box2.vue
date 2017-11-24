<template>
<div class="box">
  <div class="header">排行榜</div>
  <div class="page-view">
    <router-view/>
  </div>
</div>
</template>
<script>
import bottom from '../components/bottom.vue';
export default {
  components: {
    bottom
  },
  data () {
    return {
      pictures: []
    };
  },
  mounted () {},
  methods: {
    leftEvent () {
      this.$emit('sidebarMenu');
    }
  }
};
</script>

<style lang="less" scoped>
.box {
    width: 100%;
    height: 100%;
    background: #eee;
    display: flex;
    flex-flow: column;
    .header {
        width: 100%;
        height: 45px;
        text-align: center;
        line-height: 45px;
        background: #fff;
        color: #333;
        border-bottom: 1px solid #ddd;
    }
    .page-view {
        flex: 1;
        overflow-y: scroll;
        background: red;
    }
}
</style>
