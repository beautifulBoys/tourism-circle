<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  watch: {
    $route (n, o) {
      if (!window.loginStatus) this.$router.push({path: '/login'});
    }
  },
  created () {
    if (!window.loginStatus) this.$router.push({path: '/login'});
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
