<template>
  <div>
    <img ref="img" :src="img" class="img-lixin"/></div>
  </div>
</template>
<script>
import zhanweiData from './zhanwei.js';
  export default {
  props: ['src'],
    data () {
      return {
        img: zhanweiData
      };
    },
    mounted () {
      let newImg = new Image();
      newImg.src = this.src;
      newImg.setAttribute('class', 'img-lixin');
      newImg.onload = () => {
        let child = this.$refs.img;
        let parent = child.parentNode;
        parent.replaceChild(newImg, child);
      };
    },
    methods: {
      handleOpen () {},
      handleClose () {}
    }
  };
</script>

  <style>
  .img-lixin {
    width: 100%;
    border-radius: 3px;
  }
  </style>
