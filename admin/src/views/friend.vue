<template>
<div class="newest">
  <h1>我的圈友</h1>
  <div class="content-box">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="日期" width="180">
        <template scope="scope">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template scope="scope">
        <el-popover trigger="hover" placement="top">
        <p>姓名: {{ scope.row.name }}</p>
        <p>住址: {{ scope.row.address }}</p>
        <div slot="reference" class="name-wrapper">
        <el-tag>{{ scope.row.name }}</el-tag>
        </div>
        </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
        <el-button
        size="small"
        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
        size="small"
        type="danger"
        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    handleEdit (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style lang="less" scoped>
.newest {
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
        .ul {
            padding: 0;
            margin: 0;
            .li {
                list-style-type: none;
                display: flex;
                margin: 15px 0;
                .li-left {
                    width: 60px;
                    height: 60px;
                    margin-right: 20px;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 5px;
                    }
                }
                .li-right {
                    flex: 1;
                    .title {
                        line-height: 30px;
                        font-size: 16px;
                        color: #333;
                        margin-bottom: 10px;
                        font-weight: 700;
                    }
                    .content {
                        font-size: 15px;
                        color: #666;
                        line-height: 25px;
                    }
                    .img-box {
                        width: 100%;
                        padding: 0 0 10px;
                        border-bottom: 1px solid #eee;
                        img {
                            width: 150px;
                            margin: 5px;
                        }
                    }
                }

            }
        }

    }
}
</style>
