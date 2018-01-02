<template>
  <div class="contact">
    <div class="content-box">
      <el-tooltip effect="dark" content="QQ : 1298947916" placement="top">
        <div class="item qq" @click="clickEvent(0)"></div>
      </el-tooltip>
      <div class="item mail" @click="clickEvent(1)"></div>
      <el-tooltip effect="dark" placement="top">
        <div slot="content"><img style="width: 200px;" src="../images/wechat_lixin.png"/></div>
        <div class="item wechat" @click="clickEvent(2)"></div>
      </el-tooltip>
      <div class="item github" @click="clickEvent(3)"></div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      clickEvent (num) {
        if (num === 0) window.location.href = 'tencent://message/?uin=1298947916&Site=&menu=yes';
        else if (num === 1) window.location.href = 'mailto:1298947916@qq.com';
        else if (num === 2) console.log(num);
        else if (num === 3) window.open('https://github.com/beautifulBoys');
        else console.log('有错误，请检查');
      }
    }
  };
</script>

<style lang="less" scoped>
  .contact {
    height: 100%;
    box-sizing: border-box;
    padding: 20px 30px;
    display: flex;
    flex-flow: column;
    h1 {
      font-size: 20px;
      font-weight: 700;
      color: #666;
      margin-bottom: 20px;
    }
    .content-box {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .item {
        width: 70px;
        height: 70px;
        background: red;
        margin: 30px;
        border-radius: 100%;
        transition: all .3s;
        &.qq {
          cursor: pointer;
          background: #2998eb url(../images/qq.png) no-repeat center center;
          background-size: 35px;
        }
        &.wechat {
          background: #2bcb21 url(../images/wechat.png) no-repeat center center;
          background-size: 35px;
        }
        &.github {
          cursor: pointer;
          background: #333 url(../images/github.png) no-repeat center center;
          background-size: 35px;
        }
        &.mail {
          cursor: pointer;
          background: #feb100 url(../images/mail.png) no-repeat center center;
          background-size: 35px;
        }
        &:hover {
          background-size: 43px;
        }
      }
    }
  }
</style>
