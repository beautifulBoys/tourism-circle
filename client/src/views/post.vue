<template>
  <div class="post">
    <li-header class="header"
      @headerLeftEvent="configEvent(true)"
      @headerRightEvent="configEvent"
      :config="headerConfig"
      :show="true"
    ></li-header>
    <div class="page-main">
      <div class="cell border-1px-bottom">
        <input type="text" v-model="title" placeholder="输入分享标题"/>
      </div>
      <div class="cell border-1px-bottom">
        <input type="text" v-model="spot" placeholder="输入景点名称"/>
      </div>
      <div class="cell click border-1px-bottom" @click="cityEvent()">
        旅游城市<span class="text">{{city_text}}</span>
      </div>
      <x-address style="display:none;" title="旅游城市" v-model="city_value" :list="cityData" placeholder="请选择地址" :show.sync="showAddress"></x-address>
      <div class="cell click border-1px-bottom" @click="timeEvent('start')">
        旅游时间（开始）<span class="text">{{time_text[0]}}</span>
      </div>
      <datetime
        style="display: none;"
        v-model="time_value"
        :show.sync="showtime"
        title="旅游时间（开始）"
        @on-confirm="datetimeEnterEvent">
      </datetime>
      <div class="cell click border-1px-bottom" @click="timeEvent('end')">
        旅游时间（结束）<span class="text">{{time_text[1]}}</span>
      </div>

      <div class="cell border-1px-bottom tag-hook">
        <input type="text" v-model="tag" @keyup.enter="addTagEvent" placeholder="输入旅游标签"/>
        <div class="btn" @click="addTagEvent">添 加</div>
      </div>
      <div class="cell border-1px-bottom">
        <div class="tag-item" v-for="(item, index) in tagList" @click="deleteTagEvent(index)">{{item.name}} x </div>
      </div>

      <div class="cell click border-1px-bottom" @click="imgBoxShow = true">
        添加图片<span class="text" v-show="postImgList.length">已添加 {{postImgList.length}} 张图片</span>
      </div>

      <div class="cell border-1px-bottom">
        <span style="margin: 0 15px;color: #666;">推荐指数</span><rater v-model="rate" star="☻" active-color="#FF9900" :margin="5"></rater>
      </div>

      <div class="cell border-1px-bottom">
        <textarea class="textarea" v-model="content" placeholder="请输入旅游趣事或心得~"></textarea>
      </div>
      <div class="submit" @click="submitEvent">发布分享</div>
    </div>

    <li-img-box ref="img_box" name="添加图片" :show="imgBoxShow" @send="imgBoxEnterEvent"></li-img-box>

  </div>
</template>

<script>
import { XAddress, Rater, Datetime, ChinaAddressV4Data } from 'vux';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('box2/post');
export default {
  components: {
    XAddress,
    Datetime,
    Rater
  },
  data () {
    return {
      headerConfig: {
        left: '返回',
        title: '分享我的旅程'
      },
      cityData: ChinaAddressV4Data,
      title: '',
      spot: '',
      city: [],
      time_value: '',
      time: [],
      content: '',
      rate: 0,
      postImgList: [],
      city_value: [],
      showAddress: false,
      showtime: false,
      dateTimeIndex: 0,
      imgBoxShow: false,
      city_text: '',
      time_text: {
        '0': '',
        '1': ''
      },
      tagList: [],
      tag: ''
    };
  },
  watch: {
    city_value (n) {
      for (let i = 0; i < this.cityData.length; i++) {
        if (this.cityData[i].value === n[0]) this.city[0] = this.cityData[i].name;
        if (this.cityData[i].value === n[1]) this.city[1] = this.cityData[i].name;
        if (this.cityData[i].value === n[2]) this.city[2] = this.cityData[i].name;
      }
      let a = '';
      for (let i = 0; i < this.city.length; i++) {
        a += this.city[i] + '-';
      }
      this.city_text = a.substring(0, a.length - 1);
    }
  },
  computed: {
    ...mapState([]),
    ...mapGetters([])
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(['sendEvent']),
    configEvent (status) {
      if (status) this.$router.go(-1);
      else console.log('好友列表触发事件');
    },
    cityEvent () {
      this.showAddress = true;
    },
    deleteTagEvent (index) {
      this.tagList.splice(index, 1);
    },
    submitEvent () {
      let me = this;
      if (
        !this.title ||
        !this.content ||
        !this.spot ||
        this.city.length < 1 ||
        this.time.length < 1 ||
        this.tagList.length < 1 ||
        this.postImgList.length < 1
      ) {
        this.toast(`所有信息均为必填项，请填写完整`);
        return;
      }
      this.sendEvent({
        obj: {
          title: this.title,
          content: this.content,
          spot: this.spot,
          city: this.city,
          time: this.time,
          tagList: this.tagList,
          urls: this.postImgList,
          tate: this.rate
        },
        success (text) {
          me.toast(text);
          me.clear();
        },
        error (text) {
          me.toast(text);
        }
      });
    },
    clear () {
      this.title = '';
      this.spot = '';
      this.city = [];
      this.time_value = '';
      this.time = [];
      this.content = '';
      this.postImgList = [];
      this.city_text = '';
      this.time_text = {
        '0': '',
        '1': ''
      };
      this.tagList = [];
      this.tag = '';
    },
    toast (text) {
      this.$vux.toast.show({
        text,
        position: 'middle',
        time: 3000,
        type: 'text',
        width: '15em'
      });
    },
    timeEvent (type) {
      this.showtime = true;
      if (type === 'start') this.dateTimeIndex = 0;
      else this.dateTimeIndex = 1;
    },
    datetimeEnterEvent (a) {
      let me = this;
      setTimeout(() => {
        me.time[me.dateTimeIndex] = new Date(me.time_value);
        me.time_text[me.dateTimeIndex] = me.time_value;
      });
    },
    imgBoxEnterEvent (arr) {
      this.imgBoxShow = false;
      this.postImgList = arr;
    },
    addTagEvent () {
      if (!this.tag) return;
      this.tagList.push({
        type: 'primary',
        name: this.tag
      });
      this.tag = '';
    }
  }
};
</script>

<style lang="less" scoped>
@import '../lib/css/1px.less';
  .post {
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-flow: column;
    .header {
      width: 100%;
      height: 50px;
      z-index: 10;
    }
    .page-main {
      flex: 1;
      overflow-y: scroll;
      .cell {
        width: 100%;
        font-size: 16px;
        line-height: 50px;
        .border-1px-bottom(#ddd);

        .tag-item {
          margin: 10px 0 0 15px;
          padding: 5px 10px;
          background: #20a0ff;
          color: #fff;
          font-size: 14px;
          display: inline-block;
          line-height: 22px;
          &:active {
            background: #1489df;
            color: rgba(255,255,255,0.6);
          }
        }

        &.tag-hook {
          display: flex;
          input {
            flex: 1;
          }
          .btn {
            width: 100px;
            text-align: center;
            background: #20a0ff;
            color: #fff;
            &:active {
              background: #1489df;
              color: rgba(255,255,255,0.6);
            }
          }
        }
        &.click {
          padding: 0 15px;
          box-sizing: border-box;
          color: #666;
          height: 50px;
          background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTEyMDI0ODQyNjYwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE4NjUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTMxOS4wODA2ODcgNDcuNzUyNTg0Yy0xNC4wNTkyMDQgMC0yOC4xMDEwMTIgNS4zOTg5NjQtMzguODIyMTkxIDE2LjIwMzAzLTIxLjQ1NjY4NCAyMS42MDA5NzEtMjEuNDU2Njg0IDU2LjYwMzE1OSAwIDc4LjE5Nzk5bDM1Mi40MjY2NTUgMzU0LjkzNjgyNS0zNTIuNDI2NjU1IDM1NC45MzQ3NzhjLTIxLjQ1NjY4NCAyMS42MDE5OTQtMjEuNDU2Njg0IDU2LjYwNTIwNiAwIDc4LjE5Nzk5IDIxLjQwODU4OSAyMS42MDUwNjQgNTYuMTkxNzkgMjEuNjA1MDY0IDc3LjYzODI0MSAwbDQzMC4xMjIyMDEtNDMzLjEzMzc5MUwzNTcuODk2NzM4IDYzLjk1NDU5MUMzNDcuMTgxNjk5IDUzLjE1MTU0NyAzMzMuMTI0NTQyIDQ3Ljc1MjU4NCAzMTkuMDgwNjg3IDQ3Ljc1MjU4NHoiIHAtaWQ9IjE4NjYiIGZpbGw9IiNhYWFhYWEiPjwvcGF0aD48L3N2Zz4=') no-repeat 97% center;
          &:active {
            background: #eee url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTEyMDI0ODQyNjYwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE4NjUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTMxOS4wODA2ODcgNDcuNzUyNTg0Yy0xNC4wNTkyMDQgMC0yOC4xMDEwMTIgNS4zOTg5NjQtMzguODIyMTkxIDE2LjIwMzAzLTIxLjQ1NjY4NCAyMS42MDA5NzEtMjEuNDU2Njg0IDU2LjYwMzE1OSAwIDc4LjE5Nzk5bDM1Mi40MjY2NTUgMzU0LjkzNjgyNS0zNTIuNDI2NjU1IDM1NC45MzQ3NzhjLTIxLjQ1NjY4NCAyMS42MDE5OTQtMjEuNDU2Njg0IDU2LjYwNTIwNiAwIDc4LjE5Nzk5IDIxLjQwODU4OSAyMS42MDUwNjQgNTYuMTkxNzkgMjEuNjA1MDY0IDc3LjYzODI0MSAwbDQzMC4xMjIyMDEtNDMzLjEzMzc5MUwzNTcuODk2NzM4IDYzLjk1NDU5MUMzNDcuMTgxNjk5IDUzLjE1MTU0NyAzMzMuMTI0NTQyIDQ3Ljc1MjU4NCAzMTkuMDgwNjg3IDQ3Ljc1MjU4NHoiIHAtaWQ9IjE4NjYiIGZpbGw9IiNhYWFhYWEiPjwvcGF0aD48L3N2Zz4=') no-repeat 97% center;
          }
        }
        .text {
          float: right;
          padding-right: 15px;
          color: #999;
        }
        .textarea {
          resize: none;
          width: 100%;
          height: 150px;
          padding: 10px 15px;
          border: none;
          outline: none;
          font-size: 15px;
          box-sizing: border-box;
          line-height: 25px;
        }
        input {
          width: 100%;
          outline: none;
          padding: 0;
          margin: 0;
          padding: 0 15px;
          box-sizing: border-box;
          border: none;
          font-size: 16px;
          line-height: 50px;
          color: #666;
        }
      }
      .tag-box {
      }
      .submit {
        width: 60%;
        margin: 50px auto;
        background: #20a0ff;
        line-height: 40px;
        text-align: center;
        color: #fff;
        &:active {
          background: #1588dd;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }

  }
</style>
