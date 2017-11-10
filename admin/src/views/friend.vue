<template>
<div class="friend">
  <h1>我的圈友</h1>
  <div class="content-box">

    <el-table :data="list" cstyle="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="性别："><span>{{ props.row.sex }}</span></el-form-item>
            <el-form-item label="地址："><span>{{ props.row.address }}</span></el-form-item>
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
          <el-button size="small" @click="sendMessageEvent(scope.$index, scope.row)">发消息</el-button>
          <el-button size="small" type="danger" @click="deleteFriendEvent(scope.$index, scope.row)">解除好友</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="解除好友" :visible.sync="dialogFriendShow" size="tiny">
      水电费了解多少了房间里都是解放路上看到交流交流时代峰峻来说大家发了时间到了
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFriendShow = false">取 消</el-button>
        <el-button type="primary" @click="dialogFriendShow = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</div>
</template>
<script>

import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('friend');
export default {
  data () {
    return {
      dialogMessageShow: false,
      dialogFriendShow: false
    };
  },
  computed: {
    ...mapState({
      list: state => state.list,
      reason: state => state.reason,
      mailContent: state => state.mailContent
    }),
    ...mapGetters([])
  },
  mounted () {
    this.getDataEvent();
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(['getDataEvent']),
    sendMessageEvent (index, row) {
      console.log(index, row);
      this.dialogMessageShow = true;
    },
    deleteFriendEvent (index, row) {
      console.log(index, row);
      this.dialogFriendShow = true;
    }
  }
};
</script>

<style lang="less" scoped>
.friend {
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
