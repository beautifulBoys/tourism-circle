<template>
  <li class="li">
    <div class="head" @click="$router.push({path: '/user/' + data.userId})">
      <div class="left">
        <img :src="data.avatar"/>
      </div>
      <div class="center">
        <span class="name">{{data.title}}</span>
        <span class="desc">{{data.postTime}}</span>
      </div>
    </div>
    <div class="imgList" @click="$router.push({path: '/content/' + data.id})">
      <ul>
        <li v-for="imgInfo in data.urls">
          <div class="img-box">
            <div class="img-box1">
              <img :src="imgInfo.url"/>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </li>
</template>
<script>
export default {
  props: ['data'],
  data () {
    return {
    };
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
.li {
  padding: 0 0 10px 0;
  margin: 0 0 10px 0;
  background: #fff;
  font-size: 0;
  &:active {
    background: #f8f8f8;
  }
  .head {
    width: 100%;
    height: 50px;
    display: flex;
    padding: 5px;
    box-sizing: border-box;
    margin-bottom: 10px;
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
  }
  .imgList {
    width: 100%;
    padding: 0 3%;
    box-sizing: border-box;
    overflow-x: scroll;
    ul {
      height: 100%;
      padding: 0;
      margin: 0;
      font-size: 0;
      li {
        position: relative;
        width: 25%;
        height: 0;
        margin: 0;
        padding-top: 25%;
        box-sizing: border-box;
        display: inline-block;
        .img-box {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          padding: 3px;
          box-sizing: border-box;

          .img-box1 {
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: #ddd url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTEyMDA1OTg0NzExIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExMjY0IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ij48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik0xNzAuODE0IDE3MS4zNjNWMTAwLjg4YzAtMi45OTcgMS4wOTktNS45NiAzLjMyNC04LjIwOCAyLjI2LTIuMjg0IDUuMTg4LTMuNDE0IDguMTk2LTMuNDE0aDgxLjA5YzMuNDczIDAuMzQ5IDE1LjUzIDIuNDk1IDE1LjUzIDE3LjgwNXY2NC4yOTloLTEwOC4xNHpNMTAwLjE2IDIzMC41NmMtOC43ODYgMC0xMS45NDQtNy4yOTUtMTIuNTM4LTExLjU5MlYxNjAuMTMySDQzOC42N2EyMi45ODEgMjIuOTgxIDAgMCAxIDE2LjM0NiA2LjgwMSAyMy4xNiAyMy4xNiAwIDAgMSA2Ljc3IDE2LjM4NnY0Ny4yNDJIMTAwLjE2eiBtMTI1LjI5NyA1NjEuNDU1aDEuNzY4YzM1LjUwMy0wLjg5NyA3MS4xODMtMTEuMDcgODguODMyLTMwLjM2MyAyMS4xMjktMjIuODk0IDIzLjY0Ny01Mi44NDkgMjMuMDU2LTY5LjI5M2gtMC4wNlYzOTQuNDk4YzAtMTEuNzY3LTIuODMzLTE5LjYxLTEzLjgwNS0xOS42MWgtNjMuOTEybC0yLjE4NS03MC40aDEwNy44ODRjMzAuMzUzIDAgODEuMjQ2IDExLjk4NyA4MS4yNDYgOTIuNTY2VjY0OS4zNmMtMC4xMzIgNzcuMjgyLTI1LjMzIDEzNC4yMzItNzQuOTIxIDE2OS4yNC0zNS44NyAyNS4yMi04My42MjMgMzkuMTk2LTE0Ni4wMjcgNDIuNTMzbC0xLjg3NyAwLjIwNXYtNjkuMzIyeiBtLTE2My44NzMgMi4wMzVsMC43NTMtMC42MTJjNzkuNTA4LTEwMS42NiAxMDUuNTgtMjY5LjI3MyAxMDguNDc3LTQxNy43ODIgMS4wMzctNTYuMDcyIDAtMTY3LjA2MyAwLTE2Ny4wNjNsMTA4LjE0IDUuMjN2MTc4LjM2M2MwIDI0Ni4xMzMtODkuOTkgMzg1LjM5LTE5MS42NzkgNDY4Ljc3MmwtMi4wODIgMS4xMDktMjMuNjA5LTY4LjAxN3ogbTUxMi42NiA2Ni45N2MtOC4xOTUgMC04MC4wMDYtMi4zNTUtODAuMDA2LTg0LjQ5MlYzODEuNTgyYzAtNjEuOTk3IDQzLjAyLTkxLjM3MiA4Ny4zNDQtOTMuMjkxbDMwLjg3My0wLjI5YzkuMzEgMCAyMjcuOTEyLTAuMjkyIDMwMS45NzgtMjQuNjRsMS43OTctMC41NjYgMC40OTEgMS44MzNjMi43MjQgMTAuOTkxIDUuOTc4IDI1Ljc0IDguOTEyIDM4LjY5OCAyLjE5MSA5LjczNCA0LjEgMTguMTg1IDUuNDM1IDIzLjY5MmwwLjQ1IDEuNjEyLTEuNjcgMC41MjRjLTUxLjg2NSAxNi43MzYtMTQ1LjIwNyAyNy4yOTYtMjg0Ljk3IDI5LjM0NS0yNS41NDYgMC4zMzQtMzIuNTk3IDE5LjkwMy0zMi41OTcgNDAuMTM1djM2OC45MmMwLjE3NCAxNi45OTMgMTEuMjM1IDE5LjExNyAxOS41NDggMTkuMTE3IDEuODY0LTAuMzQ4IDIzLjA4NC00LjQ0NiA5NS45NjItMjMuMzg3bDEuODk3LTAuNDQ0IDEwLjIzOCA2NS42NjYtMS4zOTEgMC41MjNjLTAuOTEgMC4zMi05MS4wNjIgMzAuNjU0LTE2My40ODMgMzEuOTkxbC0wLjgwOCAwLjAwMXogbS00MS4zOTgtNjQ1Ljc5Yy0zMC4wMjQgMC00MS4yODItMjEuMTUtNDEuOTkxLTM5Ljk2MWgtMC4wNTh2LTc0LjM5YzAtMi45OTcgMS4wOTktNS45NiAzLjQwMS04LjIwOGExMS4zNiAxMS4zNiAwIDAgMSA4LjEwNS0zLjQxNGg5Mi4xNmMzLjU0NiAwLjM0OSAxNC4zMTkgMi42IDE0LjMxOSAxOC42MXYzNi44OGgyOTIuMDQyYzUuOTUgMCAxMS44NiAyLjI4MiAxNi4zNzUgNi43ODcgNC40NiA0LjUxNCA2LjcwNCAxMC40NTggNi43MDQgMTYuMzk5djQ3LjI5N0g1MzIuODQ2ek04ODguNDIxIDg2MS40QzcyNy4yNTggNzE1LjY5IDY3Ni4yMDUgNTU4LjU2NyA2NjEuNzMgNDk3Ljc1NmMtNC45MS0yMC4xNzctMy4wMTItMzcuMTYgNS42NDYtNTAuNDY3IDE0LjMyNy0yMS44NjQgNDEuNTI0LTI1Ljg1NCA0Mi42NzEtMjYuMDMgMTM5LjQ4Mi0xMS4wNDIgMjA4LjI1MS0zMS40MzggMjA4Ljg3NC0zMS41OTZsMi4yNzEtMC43MTV2NjYuNzI1bC0xLjE2IDAuNDYyYy00MS42ODUgMTUuNzY1LTEwNy45NDggMjYuMjUtMTQ4LjAwMyAyOS43MzktMTEuMDYgMC45NTYtMTcuNjkgMTEuNzY4LTEyLjI2IDI2Ljc4OCA0Ny42MzYgMTMxLjY3MyAxOTguMTM0IDI0OC4wNjQgMTk5LjczOSAyNDkuMTY1bDEuNTQ5IDEuMDQ3LTcxLjIxNiA5OS44Ni0xLjQyMS0xLjMzNHoiIHAtaWQ9IjExMjY1IiBmaWxsPSIjYWFhYWFhIj48L3BhdGg+PC9zdmc+') no-repeat center center;
            img {
              height: 100%;
              margin-left: -10%;
            }
          }
        }

      }
    }
  }
}
</style>
