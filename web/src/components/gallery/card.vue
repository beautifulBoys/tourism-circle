<template>
  <div class="card">
    <load-img :src="data.url"></load-img>
    <div class="title">{{data.name || '未命名'}}.{{data.suff || 'jpg'}}</div>
    <div class="control-box">
      <div class="btn left" ref="imgUrl" :data-clipboard-text="data.url" @click="copyPathEvent">复制</div>
      <div class="btn center" @click="watchEvent">查看</div>
      <div class="btn right" @click="deleteEvent">删除</div>
    </div>
  </div>
</template>
<script>
import loadImg from '../load_img.vue';
import Clipboard from 'clipboard';
  export default {
    props: ['data'],
    components: {
      'load-img': loadImg
    },
    data () {
      return {};
    },
    mounted () {
      this.clipboard = new Clipboard(this.$refs.imgUrl);
    },
    methods: {
      copyPathEvent () {
        this.clipboard.on('success', (e) => {
          this.$message({
            message: '复制图片地址成功',
            type: 'success'
          });
        });
      },
      watchEvent () {
        this.$emit('event', {type: 'watch', item: this.data});
      },
      deleteEvent () {
        this.$message({
          type: 'warning',
          message: '目前所有用户共用一个图片库，不允许删除，先占个坑，未来开放。'
        });
        // this.$emit('event', {type: 'delete', item: this.data});
      }
    }
  };
</script>
<style lang="less" scoped>

  .card {
    width: 20%;
    border: 1px solid #ddd;
    overflow: hidden;
    padding: 10px;
    font-size: 0;
    border-radius: 5px;
    transition: all .3s;
    display: inline-block;
    margin: 1%;
    position: relative;
    &:hover {
      box-shadow: 0 0 10px rgba(0,0,0,0.25);
    }

    .title {
      font-size: 16px;
      text-align: center;
      line-height: 40px;
      height: 30px;
    }
    &:hover {
      .control-box {
        opacity: 1;
        .btn {
          &.left {
            transform: translate3d(0, 0, 0);
          }
          &.right {
            transform: translate3d(0, 0, 0);
          }
          &.center {
            transform: translate3d(0, 0, 0);
          }
        }
      }
    }
    .control-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: all .5s;
      opacity: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .btn {
        width: 60px;
        height: 60px;
        background: #fff;
        display: inline-block;
        margin: 10px;
        transition: all .4s;
        border-radius: 100%;
        font-size: 18px;
        text-align: center;
        line-height: 60px;
          border: 2px solid #fff;
        &:hover {
          border: 2px solid #fff;
          background: rgba(255,255,255,0.2);
          color: #fff;
        }
        &.left {
          transform:translate3d(-100px, 0, 0);
        }
        &.right {
          transform:translate3d(100px, 0, 0);
        }
        &.center {
          transform:translate3d(0, -100px, 0);
        }
      }
    }
  }

</style>
