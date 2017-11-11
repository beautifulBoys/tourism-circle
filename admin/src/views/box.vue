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
    <image-scan ref="imageScan"></image-scan>
  </div>
</template>

<script>
import sideNenu from '../components/side_menu.vue';
import headerComponent from '../components/header.vue';
import chatBox from '../components/box/box.vue';
import imageScan from '../components/box/image_scan.vue';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('box');
export default {
  name: 'app',
  components: {
    'side-menu': sideNenu,
    'chat-box': chatBox,
    'header-component': headerComponent,
    'image-scan': imageScan
  },
  data () {
    return {
      chatShow: false
    };
  },
  computed: {
    ...mapState({})
  },
  mounted () {
    this.boxInitEvent(this.$refs.imageScan);
  },
  methods: {
    ...mapMutations(['boxInitEvent']),
    ...mapActions([]),
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
