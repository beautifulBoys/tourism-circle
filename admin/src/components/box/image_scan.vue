<template>
    <el-dialog title="提示" :visible.sync="show" size="full">
      <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/1/c2.jpg"/>
    </el-dialog>
</template>

<script>
  // import { createNamespacedHelpers } from 'vuex';
  // const { mapState, mapActions } = createNamespacedHelpers('box/chat');
  export default {
    data () {
      return {
        show: false
      };
    },
    // computed: {
    //   ...mapState({
    //     connectState: state => state.connectState,
    //     connectLoading: state => state.connectLoading
    //   })
    // },
    methods: {
      // ...mapActions([])
      close () {
        this.show = false;
      },
      open () {
        this.show = true;
      }
    }
  };
</script>

<style lang="less" scoped>
  .image-scan {

  }
</style>
