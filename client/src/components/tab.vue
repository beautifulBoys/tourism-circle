<template>
<div class="tab">
  <div class="header">
    <div class="item-box" :class="{active: index === tabIndex}" v-for="(item, index) in list" @click="tabEvent(index)">
      <span class="item">{{item.title}}</span>
    </div>
  </div>
  <div class="content" style="height: calc(100% - 37px)">
    <div class="swiper-container" ref="tab">
      <div class="swiper-wrapper">
          <slot></slot>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</div>
</template>
<script>
import Swiper from 'swiper';
export default {
  props: ['list'],
  data () {
    return {
      tabIndex: 0,
      swiper: null
    };
  },
  mounted () {
    setTimeout(this.swiperInit);
  },
  methods: {
    tabEvent (index) {
      this.tabIndex = index;
      this.swiper.slideTo(index);
    },
    swiperInit () {
      let me = this;
      this.swiper = new Swiper(this.$refs.tab, {
        on: {
          slideChange () {
            me.tabIndex = this.activeIndex;
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import '../lib/swiper.css';
.tab {
  width: 100%;
  height: 100%;
  .header {
    width: 100%;
    display: flex;
    border-bottom: 1px solid #eee;
    background: #fff;
    .item-box {
      flex: 1;
      padding: 0 15px;
      box-sizing: border-box;
      line-height: 35px;
      text-align: center;
      font-size: 14px;
      &.active {
        color: #20a0ff;
        .item {
          border-bottom: 3px solid #20a0ff;
        }
      }
      .item {
        line-height: 30px;
        display: inline-block;
      }
    }
  }
  .swiper-container {
    height: 100%;
  }
}
</style>
