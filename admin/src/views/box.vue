<template>
  <div class="box">
    <div class="left-container">
      <side-menu></side-menu>
    </div>
    <div class="right-container">
      <header-component></header-component>
      <div class="main-box">
        <router-view></router-view>
      </div>
    </div>
    <chat-box></chat-box>
    <div class="scan"></div>
  </div>
</template>

<script>
import sideNenu from '../components/side_menu.vue';
import headerComponent from '../components/header.vue';
import chatBox from '../components/box/box.vue';
export default {
  name: 'app',
  components: {
    'side-menu': sideNenu,
    'chat-box': chatBox,
    'header-component': headerComponent
  },
  data () {
    return {
      chatShow: false
    };
  },
  methods: {
    dialogEvent () {
      this.chatShow = true;
    }
  }
};
</script>

<style lang="less" scoped>
.box {
    width: 100%;
    height: 100%;
    display: flex;
    .left-container {
        width: 240px;
        background: #324157;
        overflow-y: auto;
    }
    .right-container {
        flex: 1;
        display: flex;
        flex-flow: column;

        .main-box {
            flex: 1;
            width: 100%;
            background: #fff;
            overflow: auto;
        }
    }

}
</style>
