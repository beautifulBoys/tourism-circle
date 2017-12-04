<template>
  <div class="ranking">
    <li-header class="header"
      @headerLeftEvent="configEvent(true)"
      @headerRightEvent="configEvent"
      :config="headerConfig"
      :show="true"
    ></li-header>
    <div class="page-main">
      <!-- <ul>
        <li v-for="(item, key) in info">
          <div class="item bg1">
            <div class="title">{{item.text}}</div>
            <div class="value">
              <countup :end-val="item.value" :duration="2" :start="true"></countup><span style="font-size: 14px"> 次</span>
            </div>
          </div>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
import { Countup } from 'vux';
  export default {
    components: {
      Countup
    },
    data () {
      return {
        headerConfig: {
          left: '返回',
          title: '数据统计'
        },
        info: {
        },
        status: false
      };
    },
    mounted () {
    },
    methods: {
      configEvent (status) {
        if (status) this.$router.go(-1);
        else console.log('好友列表触发事件');
      },
      toast (text) {
        this.$vux.toast.show({
          text,
          position: 'middle',
          time: 3000,
          type: 'text',
          width: '15em'
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import '../lib/swiper.css';
  .ranking {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    .header {
      width: 100%;
      height: 50px;
    }
    .page-main {
      flex: 1;
      overflow-y: scroll;
      ul {
        margin: 0;
        padding: 5px;
        width: 100%;
        box-sizing: border-box;
        font-size: 0;
        li {
          width: 50%;
          display: inline-block;
          height: 100px;
          padding: 5px;
          text-align: center;
          box-sizing: border-box;
          .item {
            width: 100%;
            height: 100%;
            background: url(../images/api/a.png) no-repeat right center;
            background-size: 100% 100%;
            border-radius: 5px;
            box-shadow: 2px 2px 10px rgba(255, 142, 153, 0.8);
            font-size: 16px;
            overflow: hidden;
            box-sizing: border-box;
            color: #fff;
            padding: 8px 5px;
            &:active {
              opacity: 0.8;
            }
            .title {
              text-align: center;
              line-height: 30px;
            }
            .value {
              text-align: center;
              line-height: 40px;
              font-size: 30px;
            }
          }
        }
      }
    }

  }
</style>
