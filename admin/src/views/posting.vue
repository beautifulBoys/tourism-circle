<template>
<div class="posting" style="">
  <h1>发表帖子</h1>


  <el-form :label-position="'right'" label-width="80px" :model="formValue">
    <el-form-item label="分享标题">
      <el-input v-model="formValue.title" placeholder="20 字以内"></el-input>
    </el-form-item>
    <el-form-item label="景点名称">
      <el-input v-model="formValue.spot" placeholder="10 字以内"></el-input>
    </el-form-item>
    <el-form-item label="地点时间">
      <el-cascader :options="options" :show-all-levels="false" placeholder="请选择旅游城市" v-model="formValue.city"></el-cascader>
      <el-date-picker v-model="formValue.time" type="daterange" placeholder="请选择旅游时间" range-separator=" 至 " start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="正文内容">
      <el-input class="textarea" type="textarea" :autosize="{minRows: 6}" placeholder="请输入旅游趣事或心得~" v-model="formValue.content"></el-input>
    </el-form-item>
    <el-form-item label="添加图片">
      <div class="add-picture" @click="addImgEvent()">+</div>
    </el-form-item>
    <el-dialog title="选择图片" :visible.sync="imgCheckShow">
      <div class="img-box">
        <img :src="item" />
        <load-img :src="item" v-for="item in imgList" class="img-item" :style="'img-item'"></load-img>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-form-item label="推荐指数">
      <el-rate v-model="formValue.rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
    </el-form-item>
    <el-form-item label="旅游标签">
      <el-input v-model="formValue.tag" class="el-input-width-200px" @keyup.enter.native="addTagEvent()" placeholder="6 字以内，回车确认"></el-input>
      <el-tag class="tag" v-for="tag in tagList" :key="tag.name" :closable="true" @close="closeEvent(tag)" :type="tag.type">{{tag.name}}</el-tag>
    </el-form-item>
  </el-form>
  <div class="footer">
    <el-button type="primary":loading="true">发　表</el-button>
  </div>

</div>
</template>
<script>
import upload from '../components/upload.vue';
import cityData from './city.json';
import gallery from './gallery.json';
import loadImg from '../components/load_img.vue';
export default {
  components: {
    'upload': upload,
    'load-img': loadImg
  },
  data () {
    return {
      labelPosition: 'right',
      formValue: {
        title: '',
        city: [],
        spot: '',
        comments: [],
        time: '',
        content: '',
        tag: ''
      },
      imgList: gallery.list,
      imgCheckShow: false,
      options: cityData.china,
      tagList: []
    };
  },
  methods: {
    addTagEvent () {
      this.tagList.push({
        name: this.formValue.tag,
        type: 'primary'
      });
      this.formValue.tag = '';
    },
    addImgEvent () {
      this.imgCheckShow = true;
    },
    closeEvent (tag) {
      this.tagList = this.tagList.filter((item) => {
        return item !== tag;
      });
    },
    picture () {
      let val = document.getElementById('file').value;
      console.log(val);
      this.fileSrc = val;
    }
  }
};
</script>

<style lang="less" scoped>
.posting {
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
      &:hover {
        border: 2px dashed rgb(32, 160, 255);
        color: rgba(32, 160, 255, 0.8);
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
      }
    }
    .img-box {
      width: 100%;
      height: 400px;
      background: red;
      margin: -15px 0 -20px 0;
      overflow-y: auto;
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
