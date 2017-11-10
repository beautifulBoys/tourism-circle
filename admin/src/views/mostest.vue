<template>
  <div class="mostest">
    <h1>最多评论</h1>
    <div class="content-box">
      <div class="left">
        <ul class="ul">
          <li class="li" v-for="item in [1,1,1,1,1,1,1,1,1,11,1,1]">
            <dynamic></dynamic>
          </li>
        </ul>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>
<script>
  import Dynamic from '../components/dynamic.vue';
  export default {
    components: {
      'dynamic': Dynamic
    },
    data () {
      return {

      };
    },
    methods: {
      addTagEvent () {
        console.log('aa');
        this.tagList.push({ name: this.tag, type: 'primary' });
        this.tag = '';
      }
    }
  };
</script>

<style lang="less" scoped>
  .mostest {
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
