<template>
    <el-dialog title="图片查看器" :visible.sync="show" size="full" class="image-scan">
      <div class="box">
        <img :src="item.url"/>
      </div>
    </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        show: false,
        item: {
          url: ''
        }
      };
    },
    methods: {
      // ...mapActions([])
      close () {
        this.show = false;
      },
      open (item) {
        this.item = item;
        this.show = true;
      }
    }
  };
</script>

<style lang="less" scoped>
  .box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
<style>

  .image-scan .el-dialog__body {
    height: calc(100% - 120px);
  }

</style>
