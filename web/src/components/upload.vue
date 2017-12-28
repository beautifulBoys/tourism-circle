<template>
<div class="upload">
  测试开始
  <form>
    <input type="file" @change="getFile($event)">
    <button @click="submitForm($event)">提交</button>
  </form>
  测试结束
</div>
</template>
<script>
export default {
  data () {
    return {
      dialogIndex: 0,
      file: null
    };
  },
  methods: {
    getFile (event) {
      this.file = event.target.files[0];
      console.log(this.file);
    },
    submitForm (event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append('file', this.file);

      this.ajax.upload(formData).then(function (res) {
        console.log('请求会来了');
        if (res.status === 200) console.log(res.data);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.talk-main {}
</style>
