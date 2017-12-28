<template>
<div class="box">
  <router-view class="top"/>
  <bottom></bottom>
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
    .top {
      flex: 1;
      overflow-y: scroll;
    }
}
</style>
