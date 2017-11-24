<template>
  <div class="page-view">
    <router-view/>
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
    .page-view {
        height: 100%;
        width: 100%;
    }
</style>
