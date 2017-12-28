<template>
  <div class="comments">
    <h1>我评论的</h1>
    <div class="content-box">
      <div class="left">
        <ul class="ul">
          <li class="li" v-for="item in list">
            <dynamic :listItem="item"></dynamic>
          </li>
          <el-button type="primary" v-show="loadmoreButtonShow" class="loadMore" @click="loadmoreEvent" :loading="loadmoreButtonStatus">点击加载更多</el-button>
        </ul>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>
<script>
  import Dynamic from '../components/dynamic.vue';

  import { createNamespacedHelpers } from 'vuex';
  const { mapState, mapMutations, mapActions } = createNamespacedHelpers('box/comments');
  export default {
    components: {
      'dynamic': Dynamic
    },
    computed: {
      ...mapState({
        list: state => state.list,
        loadmoreButtonStatus: state => state.loadmoreButtonStatus,
        loadmoreButtonShow: state => state.loadmoreButtonShow
      })
    },
    mounted () {
      this.loadmoreEvent();
    },
    methods: {
      ...mapMutations(['changePage']),
      ...mapActions(['getDataEvent']),
      loadmoreEvent () {
        this.getDataEvent({
          cbb (text) {
            this.$message({type: 'error', message: text});
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .comments {
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
      .ul {
        padding: 0;
        margin: 0;
        width: 100%;
        .li {
          list-style-type: none;
          margin: 15px 0;
        }
        .loadMore {
          width: 300px;
          margin: 20px auto 30px auto;
          display: block;
        }
      }

    }
  }
</style>
