<template>
<div class="posting" style="">
  <h1>发表帖子</h1>


  <el-form :label-position="labelPosition" label-width="80px" :model="formValue">
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
    <el-form-item label="活动性质">
      <el-checkbox-group v-model="formValue.comments">
        <el-checkbox label="美食/餐厅线上活动" name="comments"></el-checkbox>
        <el-checkbox label="地推活动" name="comments"></el-checkbox>
        <el-checkbox label="线下主题活动" name="comments"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="comments"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="景点评级">
      <el-rate v-model="formValue.rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
    </el-form-item>
    <el-form-item label="门票价格">
      <el-rate v-model="formValue.rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
    </el-form-item>
    <el-form-item label="推荐星级">
      <el-rate v-model="formValue.rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
    </el-form-item>
    <el-form-item label="旅游标签">
      <el-input v-model="formValue.tag" class="el-input-width-200px" @keyup.enter.native="addTagEvent()" placeholder="6 字以内，回车确认"></el-input>
      <el-tag class="tag" v-for="tag in tagList" :key="tag.name" :closable="true" @close="closeEvent(tag)" :type="tag.type">{{tag.name}}</el-tag>
    </el-form-item>
  </el-form>

</div>
</template>
<script>
import upload from '../components/upload.vue';
import cityData from './city.json';
export default {
  components: {
    'upload': upload
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
      options: cityData.china,
      title: '',
      tag: '',
      content: '',
      tagList: [],
      imageUrl: '',
      fileSrc: ''
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
