<template>
<div class="bottom">
  <div class="item" v-for="(item, index) in list" :class="{active: index === activeIndex}" @click="event(item, index)">
    <div class="icon" :class="'bg' + index"></div>
    <div class="text">{{item.text}}</div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {path: '/dynamic', text: '圈子'},
        {path: '/chat', text: '聊天'},
        {path: '/mine', text: '我'}
      ],
      activeIndex: 0
    };
  },
  mounted () {
  },
  methods: {
    event (item, index) {
      this.activeIndex = index;
      this.$router.push({path: item.path});
    }
  }
};
</script>

<style lang="less" scoped>
.bottom {
    width: 100%;
    height: 50px;
    background: #fff;
    display: flex;
    border-top: 1px solid #ddd;
    .item {
      flex: 1;
      height: 100%;
      text-align: center;
      box-sizing: border-box;
      padding: 5px 0;
      color: #888;
      &.active {
        color: rgb(18, 150, 219);
        .text {
          font-weight: 600;
          font-size: 11px;
        }
        .icon {
          &.bg0 {
            background: url(../images/svg/dongtai.svg) no-repeat center center;
            background-size: 21px;
          }
          &.bg1 {
            background: url(../images/svg/quanzi.svg) no-repeat center center;
            background-size: 21px;
          }
          &.bg2 {
            background: url(../images/svg/wo.svg) no-repeat center center;
            background-size: 21px;
          }
        }
      }
      .icon {
        line-height: 25px;
        height: 25px;
        &.bg0 {
          background: url(../images/svg/dongtai1.svg) no-repeat center center;
          background-size: 20px;
        }
        &.bg1 {
          background: url(../images/svg/quanzi1.svg) no-repeat center center;
          background-size: 20px;
        }
        &.bg2 {
          background: url(../images/svg/wo1.svg) no-repeat center center;
          background-size: 20px;
        }
      }
      .text {
        line-height: 15px;
        font-size: 10px;
      }
    }
}
</style>
