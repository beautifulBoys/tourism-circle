<template>
  <div class="gallery">
    <template v-for="item in list">
      <card :data="item"></card>
    </template>
  </div>
</template>
<script>
  import card from '../components/gallery/card.vue';
  import {mapState} from 'vuex';
  export default {
    components: {
      'card': card
    },
    computed: mapState({
      list: state => state.gallery.list
    })
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
