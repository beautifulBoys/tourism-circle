<template>
<div class="following">
  <h1>我的关注</h1>
  <div class="content-box">

    <el-table :data="tableData5"cstyle="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="性别："><span>{{ props.row.sex }}</span></el-form-item>
            <el-form-item label="地址："><span>{{ props.row.email }}</span></el-form-item>
            <el-form-item label="邮箱："><span>{{ props.row.email }}</span></el-form-item>
            <el-form-item label="发帖数："><span>{{ props.row.postNum }}</span></el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="用户 ID" prop="id"></el-table-column>
      <el-table-column label="用户名" prop="name"></el-table-column>
      <el-table-column label="碎碎念" prop="desc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="addFriendEvent(scope.$index, scope.row)">加好友</el-button>
          <el-button size="small" type="danger" @click="deleteFollowEvent(scope.$index, scope.row)">解除关注</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      tableData5: [{
        id: '12987123',
        name: '好滋好味',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        sex: '江浙小吃、小吃零食',
        address: '上海市普陀区真北路',
        email: '王小虎夫妻店',
        postNum: '13'
      }, {
        id: '12987124',
        name: '好滋好味',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        sex: '江浙小吃、小吃零食',
        address: '上海市普陀区真北路',
        email: '王小虎夫妻店',
        postNum: '13'
      }, {
        id: '12987125',
        name: '好滋好味',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        sex: '江浙小吃、小吃零食',
        address: '上海市普陀区真北路',
        email: '王小虎夫妻店',
        postNum: '13'
      }, {
        id: '12987126',
        name: '好滋好味',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        sex: '江浙小吃、小吃零食',
        address: '上海市普陀区真北路',
        email: '王小虎夫妻店',
        postNum: '13'
      }]
    };
  },

  methods: {
    addFriendEvent (index, row) {
      console.log(index, row);
    },
    deleteFollowEvent (index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style lang="less" scoped>
.following {
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
        display: flex;

        .demo-table-expand {
          font-size: 0;
        }
        .demo-table-expand label {
          width: 90px;
          color: #99a9bf;
        }
        .demo-table-expand .el-form-item {
          margin-right: 0;
          margin-bottom: 0;
          width: 50%;
        }



    }
}
</style>
