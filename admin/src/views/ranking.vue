<template>
<div class="ranking">
  <h1>排行榜</h1>
  <div class="content-box">

    <el-row :gutter="30">
      <el-col :sm="24" :md="12" :lg="8" :key="index" v-for="(item, index) in list">
        <div class="item-box">
          <div class="title">{{item.title}}</div>
          <div class="content">
            <table cellspacing="0" cellpadding="0">
              <tr><th class="row-1">排名</th><th class="row-2">ID</th><th class="row-3">用户名</th><th class="row-4">数据</th></tr>
              <tr :class="{first: index1 === 0, second: index1 === 1, third: index1 === 2}" v-for="(item1, index1) in item.arr">
                <td class="row-1"><div class="index">{{index1 + 1}}</div></td>
                <td class="row-2">{{item1.id}}</td>
                <td class="row-3">{{item1.username}}</td>
                <td class="row-4">{{item1.num}}</td>
              </tr>
            </table>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</div>
</template>
<script>

import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('box/ranking');
export default {
  data () {
    return {
    };
  },
  computed: {
    ...mapState({
      list: state => state.list
    }),
    ...mapGetters([])
  },
  mounted () {
    this.getDataEvent();
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(['getDataEvent'])
  }
};
</script>

<style lang="less" scoped>
.ranking {
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
        height: 200px;
        .item-box {
          background: #fff;
          overflow: hidden;
          transition: all .5s;
          padding: 0 !important;
          margin-bottom: 30px;
          border-radius: 5px;
          overflow: hidden;
          &:hover {
            box-shadow: 0 0 15px rgba(0,0,0,0.15);
          }
          .title {
            line-height: 50px;
            text-align: center;
            color: #FFF;
            background: #20A0FF;
            border-bottom: 1px solid #ddd;

          }
          .content {
            border: 1px solid #eee;
            border-top: none;
            padding: 10px 15px;
            border-radius: 5px;
            table {
              width: 100%;
              tr {
                width: 100%;
                text-align: center;
                &.first {
                  color: red;
                  .row-1 .index {
                    color: #fff;
                    background: red;
                  }
                }

                &.second {
                  color: blue;
                  .row-1 .index {
                    color: #fff;
                    background: blue;
                  }
                }

                &.third {
                  color: green;
                  .row-1 .index {
                    color: #fff;
                    background: green;
                  }
                }

                .row-1 {
                  width: 15%;
                  .index {
                    width: 25px;
                    height: 25px;
                    margin: 0 auto;
                    line-height: 25px;
                    border-radius: 100%;
                  }
                }
                .row-2 {
                  width: 20%;
                }
                .row-3 {
                  width: 35%;
                }
                .row-4 {
                  width: 20%;
                }

                &:hover td {
                  background: #f9f9f9;
                }
                th {
                  line-height: 30px;
                  font-weight: normal;
                }
                td {
                  line-height: 40px;
                }

              }
            }
          }
        }



    }
}
</style>
