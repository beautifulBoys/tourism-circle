<template>
<div class="personal" style="">
  <h1>个人设置</h1>


  <el-form :label-position="'right'" label-width="80px" :model="formValue">
    <el-form-item label="用户名">
      <el-input v-model="formValue.title" placeholder="20 字以内"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="formValue.email" placeholder="20 字以内"></el-input>
    </el-form-item>
    <el-form-item label="地址">
      <el-cascader :options="cityData" :show-all-levels="false" placeholder="请选择旅游城市" v-model="formValue.city"></el-cascader>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="formValue.sex">
        <el-radio-button label="男孩"></el-radio-button>
        <el-radio-button label="女孩"></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="碎碎念">
      <el-input class="textarea" type="textarea" :autosize="{minRows: 3}" placeholder="请输入旅游趣事或心得~" v-model="formValue.content"></el-input>
    </el-form-item>
    <el-form-item label="选择头像">
      <div class="add-picture" v-for="item in postImgList" :style="{background: `url(${item.url}) no-repeat center center`}"></div>
      <div class="add-picture" v-show="!(postImgList.length >= 1)" @click="imgCheckDialogShow = true">+</div>
    </el-form-item>
    <el-dialog title="选择头像" :visible.sync="imgCheckDialogShow">
      <div class="img-box">
        <load-img :data="item" v-for="(item, index) in imgList" @checkEvent="imgCheckTemporaryEvent" :key="index"></load-img>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="imgCheckDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="addPostImgEvent()">确 定</el-button>
      </span>
    </el-dialog>
  </el-form>
  <div class="footer">
    <el-button type="primary":loading="postStatus" @click="postEvent()">确　定</el-button>
  </div>

</div>
</template>
<script>
import upload from '../components/upload.vue';
import loadImg from '../components/posting/picture.vue';
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';
export default {
  components: {
    'upload': upload,
    'load-img': loadImg
  },
  computed: {
    ...mapState({
      formValue: state => state.personal.formValue,
      imgList: state => state.personal.imgList,
      cityData: state => state.personal.cityData,
      tagList: state => state.personal.tagList,
      postImgList: state => state.personal.postImgList,
      postStatus: state => state.personal.postStatus
    }),
    ...mapGetters(['postImgListLengthStatus'])
  },
  data () {
    return {
      labelPosition: 'right',
      imgCheckDialogShow: false,
      imgCheckedlistt_emporary: []
    };
  },
  methods: {
    ...mapMutations(['closeEvent']),
    ...mapActions(['postEvent']),
    addPostImgEvent () {
      if (this.imgCheckedlistt_emporary.length > 10) {
        this.$message({
          showClose: true,
          message: '最多可添加 10 张图片',
          type: 'error'
        });
        return;
      }
      this.imgCheckDialogShow = false;
      this.$store.commit('addPostImgEvent', {list: this.imgCheckedlistt_emporary.concat([])});
    },
    imgCheckTemporaryEvent (item, bool) {
      if (bool) this.imgCheckedlistt_emporary.push(item);
      else {
        for (let i = 0; i < this.imgCheckedlistt_emporary.length; i++) {
          if (this.imgCheckedlistt_emporary[i].id === item.id) this.imgCheckedlistt_emporary.splice(i, 1);
        }
      }
    },
    addTagEvent () {
      this.$store.commit('addTagEvent', {
        cb: () => {
          this.$message({
            showClose: true,
            message: '标签最多输入 8 字，请修改',
            type: 'error'
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.personal {
    box-sizing: border-box;
    padding: 20px 30px;
    h1 {
        font-size: 20px;
        font-weight: 700;
        color: #666;
        margin-bottom: 20px;
    }
    .input {
        margin-bottom: 25px;
        &.tag-input {
            width: 300px;
            appearance: none;
            background: #fff;
            border-radius: 4px;
            border: 1px solid #bfcbd9;
            box-sizing: border-box;
            color: #1f2d3d;
            font-size: inherit;
            height: 36px;
            line-height: 1;
            outline: none;
            padding: 3px 10px;
            transition: border-color 0.2s cubic-bezier(.645,.045,.355,1);
            &:focus {
                border-color: #409EFF;
                outline: 0;
            }
        }
    }
    .tag {
        margin: 0 10px 20px;
    }
    .add-picture {
      width: 150px;
      height: 150px;
      border-radius: 5px;
      border: 2px dashed #aaa;
      line-height: 150px;
      text-align: center;
      font-size: 50px;
      color: rgba(50, 65, 87, 0.4);
      cursor: pointer;
      transition: all .3s;
      margin: 10px;
      display: inline-block;
      overflow: hidden;
      background-size: auto 100%;
      &:hover {
        border: 2px dashed rgb(32, 160, 255);
        color: rgba(32, 160, 255, 0.8);
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
      }
    }
    .img-box {
      width: 100%;
      height: 400px;
      border: 1px solid #ddd;
      background: #f2f2f2;
      box-shadow: 0 0 10px rgba(0,0,0,0.3) inset;
      margin: -15px 0 -20px 0;
      overflow-y: auto;
      padding: 8px;
      .img-item {
        margin: 5px;
        border-radius: 3px;
        display: inline-block;
      }
    }
    .footer {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 50px 0;
    }

}
</style>
<style>
.el-textarea__inner {
  line-height: 30px;
  margin-bottom: 20px;
  font-size: 16px;
  font-family: "微软雅黑";
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-rate {
  margin: 5px;
}

.el-input-width-200px {
  width: 200px;
}
</style>
<style>
.el-tag {
  line-height: 34px;
  height: 36px;
  padding: 0 10px;
}
</style>
