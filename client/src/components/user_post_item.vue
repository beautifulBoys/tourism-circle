<template>
  <li class="li" @click="toContentEvent()">
    <div class="head">
      <div class="left">
        <img :src="data.avatar"/>
      </div>
      <div class="center">
        <span class="name">{{data.title}}</span>
        <span class="desc">{{data.postTime}}</span>
      </div>
    </div>
    <div class="imgList">
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
    toContentEvent () {
      this.$router.push({path: '/content'});
    }
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
