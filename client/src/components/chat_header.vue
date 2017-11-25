<template>
<div class="header">
  <div class="left" @click="leftHandleEvent" v-show="config.left"><img :src="backData"/></div>
  <div class="center">{{config.title}}</div>
  <div class="right" @click="rightHandleEvent" v-show="config.right"><img :src="listData"/></div>
</div>
</template>
<script>
import base64png from '../images/base64png.json';
export default {
  props: ['config'],
  data () {
    return {
      backData: base64png.back,
      listData: base64png.list
    };
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
.absoluteCenter {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.header {
    font-family: "Microsoft YaHei";
    width: 100%;
    height: 100%;
    line-height: 50px;
    background: #20a0ff;
    color: #fff;
    z-index: 10;
    text-align: center;
    display: flex;
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
    }
}
@keyframes waitAn {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
@keyframes load {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        box-shadow: -0.11em -0.83em 0 -0.4em #128d91, -0.11em -0.83em 0 -0.42em #128d91, -0.11em -0.83em 0 -0.44em #128d91, -0.11em -0.83em 0 -0.46em #128d91, -0.11em -0.83em 0 -0.477em #128d91;
    }
    5%,
    95% {
        box-shadow: -0.11em -0.83em 0 -0.4em #128d91, -0.11em -0.83em 0 -0.42em #128d91, -0.11em -0.83em 0 -0.44em #128d91, -0.11em -0.83em 0 -0.46em #128d91, -0.11em -0.83em 0 -0.477em #128d91;
    }
    30% {
        box-shadow: -0.11em -0.83em 0 -0.4em #128d91, -0.51em -0.66em 0 -0.42em #128d91, -0.75em -0.36em 0 -0.44em #128d91, -0.83em -0.03em 0 -0.46em #128d91, -0.81em 0.21em 0 -0.477em #128d91;
    }
    55% {
        box-shadow: -0.11em -0.83em 0 -0.4em #128d91, -0.29em -0.78em 0 -0.42em #128d91, -0.43em -0.72em 0 -0.44em #128d91, -0.52em -0.65em 0 -0.46em #128d91, -0.57em -0.61em 0 -0.477em #128d91;
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
        box-shadow: -0.11em -0.83em 0 -0.4em #128d91, -0.11em -0.83em 0 -0.42em #128d91, -0.11em -0.83em 0 -0.44em #128d91, -0.11em -0.83em 0 -0.46em #128d91, -0.11em -0.83em 0 -0.477em #128d91;
    }
}
</style>
