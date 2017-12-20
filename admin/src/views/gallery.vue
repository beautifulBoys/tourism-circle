<template>
<div class="gallery">
  <h1>我的图库<el-button type="primary" style="float: right;" @click="checkUploadEvent()">上传图片</el-button></h1>
  <div class="content-box">
    <template v-for="item in list">
      <card :data="item" @event="event"></card>
    </template>
  </div>
  <cut-image title="上传图片" :show="show" :ratio="1.6" :loading="loading" @getData="getDataEvent"></cut-image>
</div>
</template>
<script>
import card from '../components/gallery/card.vue';
import cutImage from '../components/gallery/cut_image.vue';

import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('box/gallery');
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
  created () {
    this.getHtmlDataEvent();
  },
  computed: mapState({
    list: state => state.list
  }),
  methods: {
    ...mapActions(['watchEvent', 'deleteEvent', 'getHtmlDataEvent']),
    event (obj) {
      let me = this;
      if (obj.type === 'watch') this.watchEvent(obj.item);
      else if (obj.type === 'delete') {
        this.deleteEvent({
          item: obj.item,
          callb (type, text) {
            if (type === 'success') {
              me.$message({ type: 'success', message: text });
              me.getHtmlDataEvent();
            } else if (type === 'error') me.$message({ type: 'error', message: text });
            else console.log('这里好像出错了，请查看');
          }}
        );
      } else console.log('出错请检查--type=' + obj.type);
    },
    getDataEvent (data) {
      console.log(data);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.show = false;
      }, 2000);
    },
    checkUploadEvent () {
      // this.show = true;
      this.$alert(
        `因服务器存储空间及流量有限，所以暂不开放上传功能。未来如果搭建图片服务器了，将长期开放，如果不搭建，此功能太监。
        如想体验上传功能，请移步个人资料设置 - 头像设置（base64），或者后期私人空间应该会有大文件上传（file）的功能，请稍安勿躁。`,
        '图库说明',
        {
          confirmButtonText: '确定'
        });
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
