<template>
  <div class="admin">
    <h1>管理员权限设置</h1>
    <div class="content-box">
      <div class="search">
        <el-input placeholder="请输入内容" v-model="search.input">
          <el-select v-model="search.select.value" slot="prepend" placeholder="请选择" style="width: 100px">
            <el-option
              v-for="(item, index) in search.select.data"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button slot="append" icon="search" style="width: 70px" @click="searchEvent()"></el-button>
        </el-input>
      </div>

      <div class="search-box">
        <el-table :data="tableData5"cstyle="width: 100%">
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
              <el-button type="primary" size="small" @click="adminEvent(scope.$index, scope.row)">设为管理员</el-button>
              <el-button type="danger" size="small" @click="superAdminEvent(scope.$index, scope.row)">设为超级管理员</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <br/>

      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="体验用户权限" name="0">
          <div>可以查看所有功能，无分享、加好友等所有功能。</div>
        </el-collapse-item>
        <el-collapse-item title="普通用户权限" name="1">
          <div>发布分享：分享自己的旅程。</div>
          <div>自由查看：查看旅游圈所有内容。</div>
          <div>互动权限：添加好友，发送站内信，关注、粉丝等功能。</div>
          <div>隐藏、删除权限：允许隐藏自己的发布以及删除自己的发布。</div>
          <div>资料设置：设置用户详细资料，获得更多人气。</div>
          <div>数据中心：任何用户均有权限查看数据中心的权限。</div>
        </el-collapse-item>
        <el-collapse-item title="管理员权限" name="2">
          <div>删帖权限：管理员具有删除恶意、灌水类帖子的权限。</div>
          <div>消息直达：管理员不通过加好友操作即可发送消息。</div>
          <div>私人空间：管理员可以拥有私人空间。</div>
        </el-collapse-item>
        <el-collapse-item title="超级管理员权限" name="3">
          <div>绝对权限：可以设置、取消管理员、超级管理员等。</div>
          <div>资源控制：可以直接增加、删除服务器资源等（维护资源绿色健康）。</div>
        </el-collapse-item>
      </el-collapse>


      <br/>
      <br/>

    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('box/admin');

  export default {
    data () {
      return {
        tableData5: [{
          id: '12987123',
          name: '好滋好味',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          sex: '男',
          address: '上海市普陀区真北路',
          email: '212635475678@qq.com',
          postNum: '13'
        }, {
          id: '12987124',
          name: '好滋好味',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          sex: '男',
          address: '上海市普陀区真北路',
          email: '212635475678@qq.com',
          postNum: '13'
        }, {
          id: '12987125',
          name: '好滋好味',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          sex: '男',
          address: '上海市普陀区真北路',
          email: '212635475678@qq.com',
          postNum: '13'
        }, {
          id: '12987126',
          name: '好滋好味',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          sex: '男',
          address: '上海市普陀区真北路',
          email: '212635475678@qq.com',
          postNum: '13'
        }]
      };
    },
    computed: {
      ...mapState({
        search: state => state.search
      })
    },
    methods: {
      ...mapMutations(['closeEvent']),
      ...mapActions(['postEvent']),
      searchEvent () {
        console.log(this.search.select.value);
      },
      adminEvent (index, row) {
        console.log(index, row);
      },
      superAdminEvent (index, row) {
        console.log(index, row);
      }
    }
  };
</script>

<style lang="less" scoped>
  .admin {
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
      height: 100px;
      .search {
        width: 50%;
      }
      .search-box {
        width: 100%;
        margin-top: 20px;
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
  }
</style>
