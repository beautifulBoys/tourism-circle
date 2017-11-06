<template>
  <div class="card">
    <img class="img" src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/1/c1.jpg"/>
    <div class="title">速度防守打法的.jpg</div>
    <div class="control-box">
      <div class="btn left" title="复制">复制</div>
      <div class="btn" title="查看">查看</div>
      <div class="btn right" title="删除">删除</div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      };
    },
    methods: {
      handleOpen () {},
      handleClose () {}
    }
  };
</script>
<style lang="less" scoped>

  .card {
    width: 250px;
    border: 1px solid #ddd;
    overflow: hidden;
    padding: 10px;
    font-size: 0;
    border-radius: 5px;
    transition: all .3s;
    display: inline-block;
    margin: 10px;
    position: relative;
    &:hover {
      box-shadow: 0 0 10px rgba(0,0,0,0.25);
    }
    .img {
      width: 100%;
      border-radius: 3px;
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
            transform:translate3d(0, 0, 0);
          }
          &.right {
            transform:translate3d(0, 0, 0);
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
      }
    }
  }

</style>
