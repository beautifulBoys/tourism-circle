<template>
  <div class="box">
    <div class="left-container">
      <side-menu></side-menu>
    </div>
    <div class="right-container">
      <div class="header"></div>
      <div class="main-box">
        <router-view></router-view>
      </div>
    </div>
    <div class="talk" @click="dialogEvent()"></div>
    <el-dialog title="与 最美夕阳 聊天中..." :visible.sync="talkShow">
      <talk-component class="talk-box"></talk-component>
    </el-dialog>
  </div>
</template>

<script>
import sideNenu from '../components/side_menu.vue';
import talkComponent from '../components/talk_component.vue';
export default {
  name: 'app',
  components: {
    'side-menu': sideNenu,
    'talk-component': talkComponent
  },
  data () {
    return {
      talkShow: false
    };
  },
  methods: {
    dialogEvent () {
      this.talkShow = true;
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
        .header {
            height: 60px;
            background: #20A0FF;
            box-shadow: 0 5px 7px rgba(0,0,0,0.2);
            z-index: 10;
        }
        .main-box {
            flex: 1;
            width: 100%;
            background: #fff;
            overflow: auto;
        }
    }
    .talk {
        width: 60px;
        height: 60px;
        position: fixed;
        bottom: 20px;
        right: 40px;
        border-radius: 50%;
        background: red;
        cursor: pointer;
    }
    .talk-box {
        width: 100%;
        height: 500px;
        margin: -20px 0;
        box-sizing: border-sizing;
        border-radius: 5px;
    }
}
</style>
