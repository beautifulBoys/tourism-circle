<template>
  <div id="app">
    <div class="left-container">
      <side-menu></side-menu>
    </div>
    <div class="right-container">
      <div class="header"></div>
      <div class="main-box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import sideNenu from './components/side_menu.vue';
export default {
  name: 'app',
  components: {
    'side-menu': sideNenu
  }
};
</script>

<style lang="less" scoped>
  #app {
    width: 100%;
    height: 100%;
    display: flex;
    .left-container {
      width: 240px;
      background: #324157;

    }
    .right-container {
      flex: 1;
      display: flex;
      flex-flow: column;
      .header {
        height: 60px;
        background: #20A0FF;
      }
      .main-box {
        flex: 1;
        width: 100%;
        background: #fff;
        overflow: auto;
      }
    }
  }
</style>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
