<template>
<div class="allfriend">
  <h1>我的圈友</h1>
  <div class="content-box">

    <el-table :data="list" style="width: 100%">
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
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="碎碎念" prop="desc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="friendEvent(scope.$index, scope.row)">加好友</el-button>
          <el-button size="small" @click="mailEvent(scope.$index, scope.row)">站内信</el-button>
          <el-button size="small" type="danger" @click="followEvent(scope.$index, scope.row)">关 注</el-button>
        </template>
      </el-table-column>
    </el-table>



    <el-dialog title="添加好友" :visible.sync="dialogFriendShow" size="tiny">
      <el-form :model="formData">
        <el-input v-model="formData.addFriendRemark" placeholder="请输入添加理由"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFriendShow = false">取 消</el-button>
        <el-button type="primary" :loading="addFriendLoading" @click="sendMessage">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="站内信" :visible.sync="dialogMailShow" size="tiny">
      <el-form :model="formData">
        <el-input type="textarea" :autosize="{minRows: 3}" placeholder="请输入内容" v-model="formData.mailContent"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMailShow = false">取 消</el-button>
        <el-button type="primary" @click="dialogMailShow = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="解除关注" :visible.sync="dialogFollowShow" size="tiny">
      水电费了解多少了房间里都是解放路上看到交流交流时代峰峻来说大家发了时间到了
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFollowShow = false">取 消</el-button>
        <el-button type="primary" @click="dialogFollowShow = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('box/allfriend');
export default {
  data () {
    return {
      dialogFriendShow: false,
      dialogMailShow: false,
      dialogFollowShow: false,
      addFriendUserId: 0,
      addFriendLoading: false
    };
  },
  computed: {
    ...mapState({
      list: state => state.list,
      formData: state => state.formData
    }),
    ...mapGetters([])
  },
  mounted () {
    this.getDataEvent();
    // this.ajax.bind().then(res => {
    //   console.log(res);
    // });
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(['getDataEvent', 'sendMessageEvent']),
    sendMessage () {
      let me = this;
      this.sendMessageEvent({
        id: me.addFriendUserId,
        success () {
          me.addFriendLoading = false;
          me.dialogFriendShow = false;
          me.$message({
            type: 'success',
            message: '添加好友请求已发出'
          });
        },
        error () {
          me.addFriendLoading = false;
          me.$message({
            type: 'error',
            message: '添加好友请求发送失败'
          });
        }
      });
    },
    friendEvent (index, row) {
      this.addFriendUserId = row.id;
      this.dialogFriendShow = true;
    },
    followEvent (index, row) {
      console.log(index, row);
      this.dialogFollowShow = true;
    },
    mailEvent (index, row) {
      console.log(index, row);
      this.dialogMailShow = true;
    }
  }
};
</script>

<style lang="less" scoped>
.allfriend {
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
