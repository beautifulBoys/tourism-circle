<template>
  <div class="header">
    <el-badge :value="noReadMessageNum" class="item">
      <el-button size="small" @click="messageListEvent()">消息盒子</el-button>
    </el-badge>

    <el-dropdown trigger="click" style="float: right;" @command="menu_click">
      <span class="el-dropdown-link">
        <img class="user-img" src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/user/user%20(3).jpg"/>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">个人设置</el-dropdown-item>
        <el-dropdown-item command="b">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog title="消息盒子" :visible.sync="show" :modal-append-to-body="false">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="type" label="消息类型"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="seeEvent(scope.$index, scope.row)">查看</el-button>
            <el-button size="small" type="danger" @click="ignoreEvent(scope.$index, scope.row)">忽略</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="show = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        noReadMessageNum: 12,
        show: false,
        tableData: [{
          time: '05-02 12:03',
          name: '王小虎',
          type: '站内信'
        }, {
          time: '05-02 12:03',
          name: '王小虎',
          type: '站内信'
        }, {
          time: '05-02 12:03',
          name: '王小虎',
          type: '站内信'
        }, {
          time: '05-02 12:03',
          name: '王小虎',
          type: '站内信'
        }]
      };
    },
    methods: {
      messageListEvent () {
        this.show = true;
      },
      addPostImgEvent () {
        console.log('');
      },
      seeEvent () {},
      ignoreEvent () {},
      menu_click (item) {
        console.log(item);
        if (item === 'a') this.$router.push({path: '/personal'});
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
