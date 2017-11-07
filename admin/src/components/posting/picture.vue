<template>
  <div class="img-box-picture" :class="{checked: checked}" @click="checkEvent()">
    <img ref="img" :src="img" class="img-lixin-picture"/>
    <div class="sign"></div>
    <div class="text">✔</div>
  </div>
</template>
<script>
import zhanweiData from '../zhanwei.js';
  export default {
  props: ['data'],
    data () {
      return {
        img: zhanweiData,
        checked: false
      };
    },
    mounted () {
      let newImg = new Image();
      newImg.src = this.data.url;
      newImg.setAttribute('class', 'img-lixin-picture');
      newImg.onload = () => {
        let child = this.$refs.img;
        let parent = child.parentNode;
        parent.replaceChild(newImg, child);
      };
    },
    methods: {
      checkEvent () {
        this.$emit('checkEvent', this.data, !this.checked);
        this.checked = !this.checked;
      }
    }
  };
</script>
<style lang="less" scoped>

.img-box-picture {
  width: 21%;
  display: inline-block;
  margin: 10px 2%;
  font-size: 0;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
  .sign {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -50px;
    right: -50px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    transform: translate3d(30px, -30px, 0) rotate(45deg);
    opacity: 0;
    transition: all .3s;
  }
  .text {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 25px;
    color: #20A0FF;
    text-align: center;
    width: 30px;
    line-height: 30px;
    transition: all .2s;
    opacity: 0;
  }
  &.checked {
    .sign {
      opacity: 1;
      transform: translate3d(10px, -10px, 0) rotate(45deg);
    }
    .text {
      opacity: 1;
    }
  }
}

  </style>
  <style>
  .img-lixin-picture {
    width: 100%;
    border-radius: 3px;
  }
  </style>
