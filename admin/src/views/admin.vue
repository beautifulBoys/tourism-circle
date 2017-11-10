<template>
  <div class="admin">
    <h1>管理员权限设置</h1>
    <div class="content-box">
      <div class="search">
        <el-input placeholder="请输入内容" v-model="inputValue">
          <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 100px">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="search" style="width: 70px" @click="searchEvent()"></el-button>
        </el-input>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        inputValue: '',
        select: ''
      };
    },
    methods: {
      searchEvent () {
        console.log(this.select);
      }
    }
  };
</script>

<style lang="less" scoped>
  .admin {
    box-sizing: border-box;
    padding: 20px;
    h1 {
      font-size: 20px;
      font-weight: 700;
      color: #666;
      margin-bottom: 20px;
    }
    .content-box {
      width: 100%;
      height: 100px;
      display: flex;
      .search {
        width: 50%;
      }

    }
  }
</style>
