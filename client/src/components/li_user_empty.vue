<template>
  <div class="empty" v-show="show"><slot></slot></div>
</template>
<script>
export default {
  props: ['show', 'text']
};
</script>

<style lang="less" scoped>
  .empty {
    width: 100%;
    height: 160px;
    background: #fff;
    line-height: 160px;
    text-align: center;
    color: #666;
  }
</style>
