<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import sideNenu from './components/side_menu.vue';
import talkComponent from './components/talk_component.vue';
export default {
  name: 'app',
  components: {
    'side-menu': sideNenu,
    'talk-component': talkComponent
  },
  data () {
    return {
      talkShow: false
    };
  },
  methods: {
    dialogEvent () {
      this.talkShow = true;
    }
  }
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
