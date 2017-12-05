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
          <el-button size="small" @click="thisPageFriendEvent(scope.$index, scope.row)">加好友</el-button>
          <el-button size="small" @click="mailEvent(scope.$index, scope.row)">站内信</el-button>
          <el-button size="small" type="danger" @click="thisPageFollowEvent(scope.$index, scope.row)">关 注</el-button>
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

  <div class="pagination-box">
    <el-pagination
      layout="prev, pager, next"
      :page-size="pageConfig.num"
      :total="pageConfig.total"
      @current-change="pageChangeEvent"
    ></el-pagination>
  </div>

</div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('box/allfriend');
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
      formData: state => state.formData,
      pageConfig: state => state.pageConfig
    }),
    ...mapGetters([])
  },
  mounted () {
    this.getDataFunc();
  },
  methods: {
    ...mapMutations(['changePage']),
    ...mapActions(['getDataEvent', 'sendMessageEvent', 'sendWebMailEvent', 'followEvent']),
    pageChangeEvent (n) {
      this.changePage(n - 1);
      this.getDataFunc();
    },
    getDataFunc () {
      this.getDataEvent({
        cbb (text) {
          this.$message({type: 'error', message: text});
        }
      });
    },
    sendMessage (id, value) {
      let me = this;
      this.sendMessageEvent({
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
    thisPageFriendEvent (index, row) {
      let me = this;
      this.$prompt('请输入添加理由', '添加好友', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        me.sendMessage(row.id, value);
      }).catch(() => {});
    },
    thisPageFollowEvent (index, row) {
      let me = this;
      this.followEvent({
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
    },
    mailEvent (index, row) {
      this.webMailUserId = row.id;
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

    .pagination-box {
      width: 100%;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
}
</style>
