<template>
<div class="followers">
  <h1>我的粉丝</h1>
  <div class="content-box">

    <el-table :data="tableData5"cstyle="width: 100%">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称"><span>{{ props.row.name }}</span></el-form-item>
            <el-form-item label="所属店铺"><span>{{ props.row.shop }}</span></el-form-item>
            <el-form-item label="商品 ID"><span>{{ props.row.id }}</span></el-form-item>
            <el-form-item label="店铺 ID"><span>{{ props.row.shopId }}</span></el-form-item>
            <el-form-item label="商品分类"><span>{{ props.row.category }}</span></el-form-item>
            <el-form-item label="店铺地址"><span>{{ props.row.address }}</span></el-form-item>
            <el-form-item label="商品描述"><span>{{ props.row.desc }}</span></el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="用户 ID" prop="id"></el-table-column>
      <el-table-column label="用户名" prop="name"></el-table-column>
      <el-table-column label="阿萨德" prop="desc"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="friendEvent(scope.$index, scope.row)">发 消 息</el-button>
          <el-button size="small" type="danger" @click="deleteEvent(scope.$index, scope.row)">解除好友</el-button>
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
        id: '12987122',
        name: '好滋好味',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }]
    };
  },

  methods: {
    friendEvent (index, row) {
      console.log(index, row);
    },
    deleteEvent (index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style lang="less" scoped>
.followers {
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
