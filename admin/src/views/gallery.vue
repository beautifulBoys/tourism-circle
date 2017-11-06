<template>
  <div class="gallery">
    <template v-for="item in [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]">
      <card></card>
    </template>
  </div>
</template>
<script>
  import card from '../components/card.vue';
  export default {
    components: {
      'card': card
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
  .gallery {
    box-sizing: border-box;
    padding: 20px 30px;
    .image {
      width: 250px;
    }
  }
</style>
