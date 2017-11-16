<template>
  <div class="header">
    <el-badge :value="noReadMessageNum" class="item">
      <el-button size="small" @click="messageBoxShowEvent(true)">消息盒子</el-button>
    </el-badge>

    <el-badge :value="noReadRoomNum" class="item">
      <el-button size="small" :loading="!connect" @click="chatRoomEvent()">全站聊天室</el-button>
    </el-badge>

    <chat-room ref="chat_room_component"></chat-room>

    <el-dropdown trigger="click" style="float: right;" @command="menu_click">
      <span class="el-dropdown-link">
        <img class="user-img" src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/user/user%20(3).jpg"/>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">个人设置</el-dropdown-item>
        <el-dropdown-item command="b">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog title="消息盒子" :visible.sync="messageBox_show" :modal-append-to-body="false">
      <el-table :data="messageBoxList" style="width: 100%">
        <el-table-column prop="typeText" label="消息类型"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="remark" label="内容"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="seeEvent(scope.$index, scope.row)">查看</el-button>
            <el-button size="small" type="danger" @click="ignoreMessageEvent(scope.row)">忽略</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="messageBoxShowEvent(false)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import charRoom from './header/chat_room.vue';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('box/header');
  export default {
    components: {
      'chat-room': charRoom
    },
    data () {
      return {
        tableData: [],
        messageBox_show: false
      };
    },
    watch: {
      messageBoxShow (n) {
        this.messageBox_show = n;
      },
      messageBox_show (n) {
        this.messageBoxShowEvent(n);
      }
    },
    computed: {
      ...mapState({
        messageBoxShow: state => state.messageBoxShow,
        noReadMessageNum: state => state.noReadMessageNum,
        chatShow: state => state.chatShow,
        noReadRoomNum: state => state.noReadRoomNum,
        connect: state => state.connect,
        messageBoxList: state => state.messageBoxList
      })
    },
    mounted () {
      if (!this.connect && window.loginStatus) {
        // this.connectServer();
      }
      this.getMessageListEvent();
    },
    methods: {
      ...mapMutations(['messageBoxShowEvent', 'logout']),
      ...mapActions(['connectServer', 'getMessageListEvent', 'ignoreMessageEvent']),
      chatRoomEvent () {
        this.$refs.chat_room_component.statusEvent(true);
      },
      seeEvent (index, row) {
        console.log(row);
      },
      menu_click (item) {
        console.log(item);
        if (item === 'a') this.$router.push({path: '/personal'});
        else if (item === 'b') {
          this.logout();
          this.$router.push({path: '/login'});
          this.$message({
            type: 'success',
            message: '退出成功'
          });
        } else console.log('出错了，查看下');
      }
    }
  };
</script>

<style lang="less" scoped>
.header {
    height: 60px;
    background: #20A0FF;
    box-shadow: 0 5px 7px rgba(0,0,0,0.2);
    z-index: 10;
    padding: 10px;
    box-sizing: border-box;
    .item {
      margin-right: 40px;
      margin-top: 5px;
    }
    .user-img {
      height: 36px;
      border-radius: 5px;
      border: 2px solid #20A0FF;
      transition: all .5s;
      &:hover {
        box-shadow: 0 0 10px rgba(0,0,0,0.4);
        border: 2px solid #fff;
      }
    }
}
</style>
