<template>
  <div class="follow">
    <li-header class="header"
      @headerLeftEvent="configEvent(true)"
      @headerRightEvent="configEvent"
      :config="headerConfig"
      :show="true"
    ></li-header>
    <div class="page-main">
        <li-user-empty :show="!list.length">你还没有好友</li-user-empty>
        <div class="cell-box border-1px-bottom" slot="content" v-for="item in list" @click="toUserMainPage(item)">
          <div class="id">{{item.id}}</div>
          <div class="icon">
            <img :src="item.avatar"/>
          </div>
          <div class="other">
            <div class="name">{{item.username}}</div>
            <div class="desc">{{item.desc || '这个人太懒了，还没有填写呢'}}</div>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('box2/friend');
  export default {
    data () {
      return {
        headerConfig: {
          left: '返回',
          title: '我的圈友'
        }
      };
    },
    computed: {
      ...mapState({
        list: state => state.list
      }),
      ...mapGetters([])
    },
    mounted () {
      let me = this;
      this.getDataEvent({
        error (text) {
          me.$vux.toast.show({
            text,
            position: 'middle',
            time: 3000,
            type: 'text',
            width: '15em'
          });
        }
      });
    },
    methods: {
      ...mapMutations([]),
      ...mapActions(['getDataEvent']),
      toUserMainPage (item) {
        this.$router.push({path: '/user/' + item.id});
      },
      configEvent (status) {
        if (status) this.$router.go(-1);
        else console.log('好友列表触发事件');
      }
    }
  };
</script>

<style lang="less" scoped>
  @import './common_less/friend_follow_following.less';
</style>
