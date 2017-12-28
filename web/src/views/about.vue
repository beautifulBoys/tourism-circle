<template>
  <div class="about">
    <h1>关于本站</h1>
    <div class="content-box">
      本网站是一个个人项目的线上站点。所有素材以及图片均收集自网络，绝不商用。
      <br/>
      如有内容侵权，请联系我删除。
      <br/>
      邮箱：1298947916@qq.com
      <br/>
      微信：lyxz12345
      （详细内容待填充）
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      };
    },
    methods: {
      addTagEvent () {
      }
    }
  };
</script>

<style lang="less" scoped>
  .about {
    box-sizing: border-box;
    padding: 20px 30px;
    h1 {
      font-size: 20px;
      font-weight: 700;
      color: #666;
      margin-bottom: 20px;
    }
    .content-box {
      width: 100%;
      height: 100px;
      display: flex;
    }
  }
</style>
