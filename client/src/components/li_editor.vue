
<template>
  <div class="editor" v-if="show">
    <div class="left">
      <input type="text" v-focus="true" v-model="inputVal" @keyup.enter="sendThisPageEvent"/>
    </div>
    <div class="right">
      <div class="button" :class="{active: buttonStatus}" @click="sendThisPageEvent">发 送</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['show'],
  data () {
    return {
      inputVal: '',
      buttonStatus: false
    };
  },
  watch: {
    inputVal (n) {
      n = n.trim();
      this.inputVal = n;
      if (n.length > 0) {
        this.buttonStatus = true;
      } else {
        this.buttonStatus = false;
      }
    }
  },
  methods: {
    clear () {
      this.inputVal = '';
    },
    sendThisPageEvent () {
      this.$emit('send', this.inputVal);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../lib/css/1px.less';
  .editor {
    width: 100%;
    display: flex;
    padding: 5px;
    box-sizing: border-box;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    .left {
      flex: 1;
      input {
        width: 100%;
        border: 1px solid #ccc;
        border-right: none;
        background: #eee;
        outline: none;
        height: 40px;
        box-sizing: border-box;
        border-radius: 5px 0 0 5px;
        padding: 0 10px;
        &:focus {
          border: 1px solid #20a0ff;
          border-right: none;
        }
      }
    }
    .right {
      width: 80px;
      line-height: 40px;
      .button {
        width: 100%;
        height: 100%;
        line-height: 40px;
        color: #fff;
        text-align: center;
        border-radius: 0 5px 5px 0;
        background: #aaa;
        &.active {
          background: #20a0ff;
          &:active {
            background: #128be4;
            color: rgba(255,255,255,0.6);
          }
        }

      }
    }
  }

</style>
