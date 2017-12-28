<template>
  <el-dialog :title="title" :visible.sync="show">
    <div class="img-box">
      <load-img :data="item" v-for="(item, index) in listData" @checkEvent="imgCheckTemporaryEvent" :key="index"></load-img>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('closeEvent')">取 消</el-button>
      <el-button type="primary" @click="addPostImgEvent()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import zhanweiData from './zhanwei.js';
  import Vue from 'vue';
  import loadImg from './posting/picture.vue';
  import { createNamespacedHelpers } from 'vuex';
  const { mapState } = createNamespacedHelpers('box/posting');
  export default {
    components: {
      'load-img': loadImg
    },
    props: ['show', 'choiceSize', 'title', 'size'],
    data () {
      return {
        img: zhanweiData,
        listData: []
      };
    },
    computed: {
      ...mapState({
        imgList: state => state.imgList
      })
    },
    watch: {
      imgList (n) {
        this.listData = n.concat([]);
        for (let i = 0; i < this.listData.length; i++) {
          Vue.set(this.listData[i], 'checked', false);
        }
      }
    },
    mounted () {
      this.listData = this.imgList.concat([]);
      for (let i = 0; i < this.listData.length; i++) {
        Vue.set(this.listData[i], 'checked', false);
      }
    },
    methods: {
      imgCheckTemporaryEvent (item) {
        let n = 0;
        this.listData.filter((item) => {
          if (item.checked) n++;
          return item;
        });
        if (n > this.size || (n === this.size && !item.checked)) {
          this.$message({showClose: true, type: 'error', message: `最多可添加 ${this.size} 张图片`});
          return;
        }

        for (let i = 0; i < this.listData.length; i++) {
          if (item.id === this.listData[i].id) {
            if (n <= this.size) this.listData[i].checked = !this.listData[i].checked;
            else console.log('这里逻辑出问题了');
          }
        }
      },
      addPostImgEvent () {
        let arr = [];
        for (let i = 0; i < this.listData.length; i++) {
          if (this.listData[i].checked) arr.push(this.listData[i]);
        }
        this.$emit('choiceEvent', arr);
      }
    }
  };
</script>

<style>

</style>
