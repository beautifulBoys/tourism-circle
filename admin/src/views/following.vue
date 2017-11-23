<template>
<div class="following">
  <h1>我的关注</h1>
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
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="碎碎念" prop="desc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="thisPageFriendEvent(scope.$index, scope.row)">加好友</el-button>
          <el-button size="small" @click="thisPageMailEvent(scope.$index, scope.row)">站内信</el-button>
          <el-button size="small" type="danger" @click="thisPageDeleteFollowEvent(scope.$index, scope.row)">解除关注</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="站内信" :visible.sync="dialogMailShow" size="tiny">
      <el-form :model="formData">
        <el-input type="textarea" :autosize="{minRows: 3}" placeholder="请输入内容" v-model="formData.mailContent"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMailShow = false">取 消</el-button>
        <el-button type="primary" :loading="webMailLoading" @click="sendWebMail">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</div>
</template>
<script>

import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('box/following');
export default {
  data () {
    return {
      dialogMailShow: false,
      webMailUserId: 0,
      webMailLoading: false
    };
  },
  computed: {
    ...mapState({
      list: state => state.list,
      reason: state => state.reason,
      formData: state => state.formData
    }),
    ...mapGetters([])
  },
  mounted () {
    this.getDataEvent();
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(['getDataEvent', 'deleteFollowEvent', 'addFriendEvent', 'sendWebMailEvent']),
    sendWebMail () {
      let me = this;
      this.sendWebMailEvent({
        id: me.webMailUserId,
        success (text) {
          me.webMailLoading = false;
          me.dialogMailShow = false;
          me.$message({
            type: 'success',
            message: text
          });
        },
        error (text) {
          me.webMailLoading = false;
          me.$message({
            type: 'error',
            message: text
          });
        }
      });
    },
    sendMessage (id, value) {
      let me = this;
      this.addFriendEvent({
        id,
        value,
        success (text) {
          me.$message({
            type: 'success',
            message: text
          });
        },
        error (text) {
          me.$message({
            type: 'error',
            message: text
          });
        }
      });
    },
    thisPageFriendEvent (index, row) {
      let me = this;
      this.$prompt('请输入添加理由', '添加好友', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        me.sendMessage(row.id, value);
      }).catch(() => {});
    },
    thisPageMailEvent (index, row) {
      this.webMailUserId = row.id;
      this.dialogMailShow = true;
    },
    thisPageDeleteFollowEvent (index, row) {
      let me = this;
      this.deleteFollowEvent({
        id: row.id,
        success (text) {
          me.$message({
            type: 'success',
            message: text
          });
        },
        error (text) {
          me.$message({
            type: 'error',
            message: text
          });
        }
      });
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
