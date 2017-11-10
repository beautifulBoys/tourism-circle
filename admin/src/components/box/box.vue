<template>
  <div class="box">
    <div class="chat" @click="chatOpenEvent"></div>
    <el-dialog title="与 最美夕阳 聊天中..." :visible.sync="chatShow" :modal-append-to-body="false">
      <chat-component></chat-component>
    </el-dialog>
  </div>
</template>

<script>
  import chatComponent from '../chat_component.vue';
  export default {
    components: {
      'chat-component': chatComponent
    },
    data () {
      return {
        chatShow: false
      };
    },
    mounted () {
    },
    methods: {
      chatOpenEvent () {
        this.chatShow = true;
      }
    }
  };
</script>

<style lang="less" scoped>
  .box {
    width: 60px;
    height: 60px;
    position: fixed;
    bottom: 20px;
    right: 40px;
    z-index: 100;
    .chat {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: red;
      cursor: pointer;
    }
  }
</style>
