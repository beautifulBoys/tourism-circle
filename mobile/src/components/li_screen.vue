<template>
  <transition name="fade">
    <div class="screen" v-show="status" @click="$emit('close')"></div>
  </transition>
  </div>
</template>

<script>
export default {
  props: ['status']
};
</script>

<style lang="less" scoped>

  .screen {
      width: 100%;
      height: 100%;
      background: #000;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      opacity: 0.5;
      &.fade-enter-active,
      &.fade-leave-active {
          transition: opacity .4s;
      }
      &.fade-enter,
      &.fade-leave-to {
          opacity: 0;
      }
  }

</style>
