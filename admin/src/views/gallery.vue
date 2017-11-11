<template>
<div class="gallery">
  <h1>我的圈友<el-button type="primary" style="float: right;" @click="checkUploadEvent()">上传图片</el-button></h1>
  <div class="content-box">
    <template v-for="item in list">
      <card :data="item"></card>
    </template>
  </div>
  <cut-image title="选择头像" :show="show" :ratio="1.6" :loading="loading" @getData="getDataEvent"></cut-image>
</div>
</template>
<script>
import card from '../components/gallery/card.vue';
import cutImage from '../components/gallery/cut_image.vue';

import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('box/gallery');
export default {
  components: {
    'card': card,
    'cut-image': cutImage
  },
  data () {
    return {
      show: false,
      loading: false
    };
  },
  computed: mapState({
    list: state => state.list
  }),
  methods: {
    getDataEvent (data) {
      console.log(data);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.show = false;
      }, 2000);
    },
    checkUploadEvent () {
      this.show = true;
    }
  }
};
</script>

<style lang="less" scoped>
.gallery {
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
    }
}
</style>
