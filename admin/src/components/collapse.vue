<template>
<div class="collapse">
  <div class="line">
    <div class="btn right" @click="collapseEvent"><i class="el-icon-arrow-right" :class="{rotate: !collapse}"></i>{{num > 0 ? (num + ' 条') : '添加'}}评论</div>
    <div class="btn left" @click="starEvent">
      <i class="el-icon-star-on" v-show="isStar"></i>
      <i class="el-icon-star-off" v-show="!isStar"></i>
    </div>
    <div class="btn left" @click="pinglunEvent()"><i class="el-icon-message"></i></div>
  </div>
  <div class="box" :class="{collapse: !collapse}">
    <slot></slot>
  </div>

</div>
</template>

<script>
export default {
  props: ['num', 'isStared'],
  data () {
    return {
      collapse: true,
      isStar: false
    };
  },
  // watch: {
  //   isStared (n) {
  //     this.isStar = (n || false);
  //   }
  // },
  mounted () {
    this.isStar = this.isStared;
  },
  methods: {
    starEvent () {
      let _this = this;
      this.$emit('starEvent', {
        cbb (status) {
          _this.isStar = status;
        }
      });
    },
    pinglunEvent () {
      let _this = this;
      this.$prompt('请输入评论内容', '输入提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        _this.$emit('pinglunEvent', {
          value,
          cbb () {
            _this.$message({type: 'success', message: '评论成功'});
          }
        });
      }).catch(() => {});
    },
    collapseEvent () {
      if (this.num > 0) this.collapse = !this.collapse;
      else this.pinglunEvent();
    }
  }
};
</script>

<style lang="less" scoped>
  .collapse {
    width: 100%;
    font-size: 0;
    border-radius: 0 0 5px 5px;
    .line {
      line-height: 40px;
      border-top: 1px solid #ddd;
      font-size: 0;
      .el-icon-arrow-right {
        color: #777;
        margin-right: 5px;
        transition: all 0.5s;
        font-size: 16px;
        &.rotate {
          transform: rotate(90deg);
        }
      }
      .btn {
        display: inline-block;
        cursor: pointer;
        padding: 0 20px;
        font-size: 16px;
        line-height: 40px;
        &:hover {
          background: #eee;
        }
        &.right {
          float: right;
          border-left: 1px solid #ddd;
        }
        &.left {
          border-right: 1px solid #ddd;
        }
        .el-icon-star-on {
            color: rgb(255, 153, 0);
        }
        .el-icon-star-off {
            color: #999;
        }
        .el-icon-message {
            color: #999;
        }
      }
    }
    .box {
      width: 100%;
      max-height: 0;
      display: block;
      overflow: hidden;
      background: #fbfbfb;
      padding: 0 15px;
      box-sizing: border-box;
      transition: max-height .5s;
      margin-top: -6px;
      &.collapse {
        max-height: 500px;
        border-top: 1px solid #ddd;
      }
    }
  }
</style>
