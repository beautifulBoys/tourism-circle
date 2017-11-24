<template>
<div class="bottom">
  <div class="item" v-for="(item, index) in list" :class="{active: index === activeIndex}" @click="event(item, index)">
    <div class="icon">
      <img :src="item.icon" v-show="activeIndex !== index"/>
      <img :src="item.iconAct" v-show="activeIndex === index"/>
    </div>
    <div class="text">{{item.text}}</div>
  </div>
</div>
</template>
<script>
import base64png from '../images/base64png.json';
export default {
  data () {
    return {
      list: [
        {path: '/dynamic', text: '圈子', icon: base64png.circle, iconAct: base64png.circle_act},
        {path: '/chat', text: '聊天', icon: base64png.chat, iconAct: base64png.chat_act},
        {path: '/mine', text: '我', icon: base64png.mine, iconAct: base64png.mine_act}
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
      }
      .icon {
        line-height: 25px;
        height: 25px;
        img {
          height: 25px;
        }
      }
      .text {
        line-height: 15px;
        font-size: 12px;
      }
    }
}
</style>
