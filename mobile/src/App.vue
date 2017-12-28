<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  const { mapActions } = createNamespacedHelpers('login');
export default {
  name: 'app',
  created () {
    if (window.loginStatus) this.setUserInfo();
    else this.$router.push({path: '/login'});
  },
  watch: {
    $route (n, o) {
      if (!window.loginStatus) this.$router.push({path: '/login'});
    }
  },
  methods: {
    ...mapActions(['setUserInfo'])
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
* {
  font-family: "微软雅黑";
}
#app {
  width: 100%;
  height: 100%;
}
</style>
