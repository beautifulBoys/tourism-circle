<template>
  <div class="newest">
    <h1>最新动态</h1>
    <div class="content-box">
      <div class="left">
        <ul class="ul">
          <li class="li" v-for="item in list">
            <dynamic :data="item"></dynamic>
          </li>
        </ul>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>
<script>
  import Dynamic from '../components/dynamic.vue';
  import {test1} from '../api/fetch_router.js';

  import { createNamespacedHelpers } from 'vuex';
  const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('box/newest');
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
      this.testApi();
      console.log('执行到mounted函数了');
    },
    methods: {
      async testApi () {
        console.log('执行到testAPI函数了');
        let result = await test1();
        console.log(result);
      },
      ...mapMutations([]),
      ...mapActions(['getDataEvent'])
    }
  };
</script>

<style lang="less" scoped>
  .newest {
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
        .li {
          list-style-type: none;
          margin: 15px 0;
        }
      }

    }
  }
</style>
