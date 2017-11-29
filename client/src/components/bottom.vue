<template>
<div class="bottom border-1px-top">

    <div class="item" :class="{active: 0 === activeIndex}" @click="event(list[0], 0)">
      <div class="icon">
        <img :src="list[0].icon" v-show="activeIndex !== 0"/>
        <img :src="list[0].iconAct" v-show="activeIndex === 0"/>
      </div>
      <div class="text">{{list[0].text}}</div>
    </div>

    <div class="item" :class="{active: 1 === activeIndex}" @click="event(list[1], 1)">
      <div class="icon">
        <img :src="list[1].icon" v-show="!allNoRead && activeIndex !== 1"/>
        <img :src="list[1].iconAct" v-show="!allNoRead && activeIndex === 1"/>
        <span class="sign" v-show="allNoRead">{{allNoRead}}</span>
      </div>
      <div class="text">{{list[1].text}}</div>
    </div>

    <div class="item" :class="{active: 2 === activeIndex}" @click="event(list[2], 2)">
      <div class="icon">
        <img :src="list[2].icon" v-show="activeIndex !== 2"/>
        <img :src="list[2].iconAct" v-show="activeIndex === 2"/>
      </div>
      <div class="text">{{list[2].text}}</div>
    </div>

</div>
</template>
<script>
import base64png from '../images/base64png.json';
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('box1/contact');
export default {
  data () {
    return {
      list: [
        {path: '/dynamic', text: '动态', icon: base64png.circle, iconAct: base64png.circle_act},
        {path: '/contact', text: '圈友', icon: base64png.chat, iconAct: base64png.chat_act},
        {path: '/mine', text: '我', icon: base64png.mine, iconAct: base64png.mine_act}
      ],
      activeIndex: 0
    };
  },
  computed: {
    ...mapGetters(['allNoRead'])
  },
  created () {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].path === this.$route.path) {
        this.activeIndex = i;
        break;
      }
    }
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
@import '../lib/css/1px.less';
.bottom {
    width: 100%;
    height: 50px;
    background: #fff;
    display: flex;
    .border-1px-top(#ccc);
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
        .sign {
          background: red;
          height: 21px;
          display: inline-block;
          line-height: 21px;
          text-align: center;
          border-radius: 11px;
          padding: 0 7px;
          color: #fff;
        }
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
