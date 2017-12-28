<template>
  <div class="posted">
    <h1>我发表的</h1>
    <div class="content-box">
      <ul class="ul">
        <li class="li" v-for="item in list">
          <dynamic type="mine" @refresh="loadmoreEvent" :listItem="item" :control="true"></dynamic>
        </li>
        <el-button type="primary" v-show="loadmoreButtonShow" class="loadMore" @click="loadmoreEvent" :loading="loadmoreButtonStatus">点击加载更多</el-button>
      </ul>
    </div>
  </div>
</template>

<script>
  import Dynamic from '../components/dynamic.vue';

  import { createNamespacedHelpers } from 'vuex';
  const { mapState, mapMutations, mapActions } = createNamespacedHelpers('box/posted');
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
  .posted {
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
