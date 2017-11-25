<template>
    <div class="header">
      <!-- <div class="left"></div> -->
      <div class="center">旅游圈</div>
      <!-- <div class="right"></div> -->
    </div>
</template>

<script>
  export default {

  };
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  display: flex;
  background: #20a0ff;
  z-index: 10;
  .left {
    width: 50px;
    height: 50px;
    background: url(../images/svg/travel_check.svg) no-repeat center center;
    background-size: 20px;
  }
  .center {
    flex: 1;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #fff;
  }
  .right {
    width: 50px;
    height: 50px;
    background: url(../images/svg/travel_search.svg) no-repeat center center;
    background-size: 20px;
  }
}
</style>
