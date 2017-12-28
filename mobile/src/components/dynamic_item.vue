<template>
  <li class="li">
    <div class="head">
      <div class="left" @click="toUserPageEvent()">
        <img :src="data.userInfo.avatar"/>
      </div>
      <div class="center" @click="toUserPageEvent()">
        <span class="name">{{data.userInfo.username}}</span>
        <span class="desc">{{data.userInfo.desc || '这个人很懒，还没有填写'}}</span>
      </div>
      <div class="right" @click="shareEvent"></div>
    </div>
    <div class="imgList" @click="toContentEvent()">
      <ul :style="{'width': data.urls.length * 195 + 'px'}">
        <li v-for="imgInfo in data.urls">
          <img :src="imgInfo.url"/>
        </li>
      </ul>
    </div>
    <div class="footer">
      <div class="info border-1px-bottom" @click="toContentEvent()">
        <span class="title">{{data.title}}</span>
        <span class="date"><span class="tag">● </span> {{data.postTime}}</span>
      </div>
      <div class="control">
        <div class="left">
          <img v-for="(user, index) in data.starList" :src="user.avatar" :class="{se: index != 0}"/>
          <span class="kan">{{data.starList.length}}人喜欢</span>
        </div>
        <div class="right">
          <span class="star" :class="{active: data.isStared}" @click="starEvent"></span>
          <span class="down" @click="$router.push({path: '/content/' + data.id, query: {sign: 1}})"></span>
        </div>
      </div>
    </div>
  </li>
</template>
<script>
import {starAjax} from '../api/ajax_router.js';
export default {
  props: ['data'],
  data () {
    return {
    };
  },
  methods: {
    toContentEvent () {
      this.$router.push({path: '/content/' + this.data.id});
    },
    toUserPageEvent () {
      this.$router.push({path: '/user/' + this.data.userId});
    },
    async starEvent () {
      let result = await starAjax({id: this.data.id});
      if (result.code === 200) {
        this.data.isStared = (result.data.status === 'star');
        this.data.starList = result.data.list;
        this.toast(result.message);
      } else this.toast(result.message);
    },
    shareEvent () {
      this.toast('该图标存在只为美观，不做此功能');
    },
    toast (text) {
      this.$vux.toast.show({
        text,
        position: 'middle',
        time: 3000,
        type: 'text',
        width: '17em'
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import '../lib/css/1px.less';
.li {
  padding: 0;
  margin: 0 0 10px 0;
  background: #fff;
  font-size: 0;
  .head {
    width: 100%;
    height: 50px;
    display: flex;
    padding: 10px 0;
    .left {
      width: 50px;
      height: 50px;
      img {
        width: 70%;
        margin: 15%;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      color: #333;
      span.name {
        margin: 8px 0 3px 0;
        color: #333;
        width: 100%;
        display: block;
        font-size: 14px;
      }
      span.desc {
        color: #888;
        width: 100%;
        display: block;
        font-size: 12px;
      }
    }
    .right {
      width: 50px;
      height: 50px;
      background: url(../images/svg/share.svg) no-repeat center center;
      background-size: 18px;
    }
  }
  .imgList {
    width: 100%;
    height: 120px;
    padding: 0 3%;
    box-sizing: border-box;
    overflow-x: scroll;
    ul {
      height: 100%;
      padding: 0;
      margin: 0;
      font-size: 0;
      li {
        padding: 0;
        margin: 0 10px 0 0;
        height: 100%;
        display: inline-block;
        background: #eee url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTEyMDA1OTg0NzExIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExMjY0IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ij48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik0xNzAuODE0IDE3MS4zNjNWMTAwLjg4YzAtMi45OTcgMS4wOTktNS45NiAzLjMyNC04LjIwOCAyLjI2LTIuMjg0IDUuMTg4LTMuNDE0IDguMTk2LTMuNDE0aDgxLjA5YzMuNDczIDAuMzQ5IDE1LjUzIDIuNDk1IDE1LjUzIDE3LjgwNXY2NC4yOTloLTEwOC4xNHpNMTAwLjE2IDIzMC41NmMtOC43ODYgMC0xMS45NDQtNy4yOTUtMTIuNTM4LTExLjU5MlYxNjAuMTMySDQzOC42N2EyMi45ODEgMjIuOTgxIDAgMCAxIDE2LjM0NiA2LjgwMSAyMy4xNiAyMy4xNiAwIDAgMSA2Ljc3IDE2LjM4NnY0Ny4yNDJIMTAwLjE2eiBtMTI1LjI5NyA1NjEuNDU1aDEuNzY4YzM1LjUwMy0wLjg5NyA3MS4xODMtMTEuMDcgODguODMyLTMwLjM2MyAyMS4xMjktMjIuODk0IDIzLjY0Ny01Mi44NDkgMjMuMDU2LTY5LjI5M2gtMC4wNlYzOTQuNDk4YzAtMTEuNzY3LTIuODMzLTE5LjYxLTEzLjgwNS0xOS42MWgtNjMuOTEybC0yLjE4NS03MC40aDEwNy44ODRjMzAuMzUzIDAgODEuMjQ2IDExLjk4NyA4MS4yNDYgOTIuNTY2VjY0OS4zNmMtMC4xMzIgNzcuMjgyLTI1LjMzIDEzNC4yMzItNzQuOTIxIDE2OS4yNC0zNS44NyAyNS4yMi04My42MjMgMzkuMTk2LTE0Ni4wMjcgNDIuNTMzbC0xLjg3NyAwLjIwNXYtNjkuMzIyeiBtLTE2My44NzMgMi4wMzVsMC43NTMtMC42MTJjNzkuNTA4LTEwMS42NiAxMDUuNTgtMjY5LjI3MyAxMDguNDc3LTQxNy43ODIgMS4wMzctNTYuMDcyIDAtMTY3LjA2MyAwLTE2Ny4wNjNsMTA4LjE0IDUuMjN2MTc4LjM2M2MwIDI0Ni4xMzMtODkuOTkgMzg1LjM5LTE5MS42NzkgNDY4Ljc3MmwtMi4wODIgMS4xMDktMjMuNjA5LTY4LjAxN3ogbTUxMi42NiA2Ni45N2MtOC4xOTUgMC04MC4wMDYtMi4zNTUtODAuMDA2LTg0LjQ5MlYzODEuNTgyYzAtNjEuOTk3IDQzLjAyLTkxLjM3MiA4Ny4zNDQtOTMuMjkxbDMwLjg3My0wLjI5YzkuMzEgMCAyMjcuOTEyLTAuMjkyIDMwMS45NzgtMjQuNjRsMS43OTctMC41NjYgMC40OTEgMS44MzNjMi43MjQgMTAuOTkxIDUuOTc4IDI1Ljc0IDguOTEyIDM4LjY5OCAyLjE5MSA5LjczNCA0LjEgMTguMTg1IDUuNDM1IDIzLjY5MmwwLjQ1IDEuNjEyLTEuNjcgMC41MjRjLTUxLjg2NSAxNi43MzYtMTQ1LjIwNyAyNy4yOTYtMjg0Ljk3IDI5LjM0NS0yNS41NDYgMC4zMzQtMzIuNTk3IDE5LjkwMy0zMi41OTcgNDAuMTM1djM2OC45MmMwLjE3NCAxNi45OTMgMTEuMjM1IDE5LjExNyAxOS41NDggMTkuMTE3IDEuODY0LTAuMzQ4IDIzLjA4NC00LjQ0NiA5NS45NjItMjMuMzg3bDEuODk3LTAuNDQ0IDEwLjIzOCA2NS42NjYtMS4zOTEgMC41MjNjLTAuOTEgMC4zMi05MS4wNjIgMzAuNjU0LTE2My40ODMgMzEuOTkxbC0wLjgwOCAwLjAwMXogbS00MS4zOTgtNjQ1Ljc5Yy0zMC4wMjQgMC00MS4yODItMjEuMTUtNDEuOTkxLTM5Ljk2MWgtMC4wNTh2LTc0LjM5YzAtMi45OTcgMS4wOTktNS45NiAzLjQwMS04LjIwOGExMS4zNiAxMS4zNiAwIDAgMSA4LjEwNS0zLjQxNGg5Mi4xNmMzLjU0NiAwLjM0OSAxNC4zMTkgMi42IDE0LjMxOSAxOC42MXYzNi44OGgyOTIuMDQyYzUuOTUgMCAxMS44NiAyLjI4MiAxNi4zNzUgNi43ODcgNC40NiA0LjUxNCA2LjcwNCAxMC40NTggNi43MDQgMTYuMzk5djQ3LjI5N0g1MzIuODQ2ek04ODguNDIxIDg2MS40QzcyNy4yNTggNzE1LjY5IDY3Ni4yMDUgNTU4LjU2NyA2NjEuNzMgNDk3Ljc1NmMtNC45MS0yMC4xNzctMy4wMTItMzcuMTYgNS42NDYtNTAuNDY3IDE0LjMyNy0yMS44NjQgNDEuNTI0LTI1Ljg1NCA0Mi42NzEtMjYuMDMgMTM5LjQ4Mi0xMS4wNDIgMjA4LjI1MS0zMS40MzggMjA4Ljg3NC0zMS41OTZsMi4yNzEtMC43MTV2NjYuNzI1bC0xLjE2IDAuNDYyYy00MS42ODUgMTUuNzY1LTEwNy45NDggMjYuMjUtMTQ4LjAwMyAyOS43MzktMTEuMDYgMC45NTYtMTcuNjkgMTEuNzY4LTEyLjI2IDI2Ljc4OCA0Ny42MzYgMTMxLjY3MyAxOTguMTM0IDI0OC4wNjQgMTk5LjczOSAyNDkuMTY1bDEuNTQ5IDEuMDQ3LTcxLjIxNiA5OS44Ni0xLjQyMS0xLjMzNHoiIHAtaWQ9IjExMjY1IiBmaWxsPSIjYWFhYWFhIj48L3BhdGg+PC9zdmc+') no-repeat center center;
        img {
          height: 100%;
          width: 185px;
          border-radius: 4px;
        }
      }
    }
  }
  .footer {
    padding: 10px;
    box-sizing: border-box;
    .info {
      .border-1px-bottom(#ccc);
      padding-bottom: 10px;
      .title {
        width: 100%;
        display: block;
        font-size: 15px;
        line-height: 25px;
      }
      .date {
        width: 100%;
        color: #888;
        font-size: 12px;
        .tag {
          font-size: 8px;
          color: #3c95d8;
        }
      }
    }
    .control {
      height: 30px;
      width: 100%;
      padding-top: 10px;
      .left {
        width: 50%;
        float: left;
        img {
          width: 26px;
          border: 2px solid #fff;
          border-radius: 50%;
          &.se {
            margin-left: -10px;
          }
        }
        .kan {
          line-height: 30px;
          vertical-align: top;
          height: 30px;
          font-size: 12px;
        }
      }
      .right {
        width: 50%;
        height: 30px;
        float: right;
        text-align: right;
        .star {
          width: 35px;
          height: 30px;
          display: inline-block;
          background: url("../images/svg/travel_star.svg") no-repeat center center;
          background-size: 20px;
          &.active {
            background: url("../images/svg/travel_star1.svg") no-repeat center center;
            background-size: 20px;
          }
        }
        .down {
          width: 35px;
          height: 30px;
          display: inline-block;
          background: url("../images/svg/travel_msg.svg") no-repeat center center;
          background-size: 20px;
        }
      }
    }
  }
}
</style>
