<template>
  <div class="empty" v-show="show">
    <div class="line">{{line1}}</div>
    <div class="line" style="font-size: 16px;">{{line2}}</div>
  </div>
</template>
<script>
export default {
  props: ['show', 'line1', 'line2']
};
</script>

<style lang="less" scoped>
  .empty {
    width: 100%;
    height: 150px;
    background: #fff;
    margin-bottom: 10px;
    padding: 45px 0;
    box-sizing: border-box;
    .line {
      line-height: 25px;
      text-align: center;
      color: #20a0ff;
      font-size: 14px;
    }
  }
</style>
