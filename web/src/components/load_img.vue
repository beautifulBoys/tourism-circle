<template>
  <div @click="seeEvent()">
    <img ref="img" :src="img" class="img-lixin"/>
  </div>
</template>
<script>
import zhanweiData from './zhanwei.js';
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('box/gallery');
  export default {
  props: ['src'],
    data () {
      return {
        img: zhanweiData,
        status: false
      };
    },
    mounted () {
      let newImg = new Image();
      newImg.src = this.src;
      newImg.setAttribute('class', 'img-lixin');
      newImg.onload = () => {
        let child = this.$refs.img;
        if (!child) return;
        let parent = child.parentNode;
        parent.replaceChild(newImg, child);
        this.status = true;
      };
    },
    methods: {
      ...mapActions(['watchEvent']),
      seeEvent () {
        if (this.status) this.watchEvent({url: this.src});
      }
    }
  };
</script>

  <style>
  .img-lixin {
    width: 100%;
    border-radius: 3px;
  }
  </style>
