<template>
  <div class="posted">
    <h1>我发表的</h1>
    <div class="content-box">
      <ul class="ul">
        <li class="li" v-for="item in list">
          <dynamic type="mine" :listItem="item" :control="true"></dynamic>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Dynamic from '../components/dynamic.vue';

  import { createNamespacedHelpers } from 'vuex';
  const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('box/posted');
  export default {
    components: {
      'dynamic': Dynamic
    },
    computed: {
      ...mapState({
        list: state => state.list
      }),
      ...mapGetters([])
    },
    mounted () {
      this.getDataEvent();
    },
    methods: {
      ...mapMutations([]),
      ...mapActions(['getDataEvent'])
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
      }

    }
  }
</style>
