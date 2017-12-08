
<template>
<div class="data">
  <h1>数据统计</h1>
  <div class="content-box">
    <!-- <iframe src="https://www.baidu.com" height="500px" width="100%" style="outline: none; overflow: hidden; border: none;"></iframe> -->
    <el-button type="default" @click="textEvent">测试下载</el-button>
  </div>
</div>
</template>
<script>
  export default {
    mounted () {
    },
    methods: {
      textEvent () {
        window.location.href = 'http://10.209.96.67:3000/admin/download';
      }
    }
  };
</script>

<style lang="less" scoped>
.data {
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
        height: 200px;
    }
}
</style>
