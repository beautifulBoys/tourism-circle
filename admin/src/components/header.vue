<template>
  <div class="header">
    <el-badge :value="noReadMessageNum" class="item">
      <el-button size="small" @click="messageListEvent()">消息盒子</el-button>
    </el-badge>

    <el-dropdown trigger="click" style="float: right;">
      <span class="el-dropdown-link">
        <img class="user-img" src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/user/user%20(3).jpg"/>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog title="消息盒子" :visible.sync="show" :modal-append-to-body="false">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="seeEvent(scope.$index, scope.row)">查看</el-button>
            <el-button
              size="small"
              type="danger"
              @click="ignoreEvent(scope.$index, scope.row)">忽略</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('closeEvent')">取 消</el-button>
        <el-button type="primary" @click="addPostImgEvent()">确 定</el-button>
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
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
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
      ignoreEvent () {}
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
