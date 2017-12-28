<template>
<div class="header" :class="{bg: show}">
  <div class="left" @click="leftHandleEvent"><img v-show="config.left" :src="backData"/></div>
  <div class="center"><span v-show="show">{{config.title}}</span></div>
  <div class="right" @click="rightHandleEvent">
    <img v-show="config.right" :src="rightIcon"/>
  </div>
</div>
</template>
<script>
import base64png from '../images/base64png.json';
export default {
  props: ['config', 'show', 'rIcon'],
  data () {
    return {
      backData: base64png.back,
      rightIcon: base64png.list
    };
  },
  mounted () {
    if (this.rIcon) this.rightIcon = base64png[this.rIcon];
  },
  methods: {
    leftHandleEvent () {
      this.$emit('headerLeftEvent');
    },
    rightHandleEvent () {
      this.$emit('headerRightEvent');
    }
  }
};
</script>

<style lang="less" scoped>
.header {
    font-family: "Microsoft YaHei";
    width: 100%;
    height: 100%;
    line-height: 50px;
    color: #fff;
    z-index: 20;
    text-align: center;
    display: flex;
    &.bg {
      background: #20a0ff;
    }
    .left, .right {
      width: 50px;
      padding: 13px;
      box-sizing: border-box;
      img {
        width: 24px;
        margin: 0 auto;
        display: block;
      }
    }
    .center {
        flex: 1;
        height: 50px;
        font-size: 18px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1; // 超出行数
        overflow: hidden;
    }
}

</style>
