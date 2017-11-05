<template>
  <div class="posting" style="">
    <h1>发表帖子</h1>
    <el-input class="input" v-model="title" placeholder="请输入分享标题，20 字以内"></el-input>
    <el-input
      class="textarea"
      type="textarea"
      :autosize="{minRows: 6}"
      placeholder="请输入旅游趣事或心得~"
      v-model="content">
    </el-input>


    <input type="file" id="file" @change="picture()"/>
    <img :src="fileSrc"/>

    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>



    <br/>
    <input class="input tag-input" placeholder="请输入标签（6 字以内），回车确认" v-model="tag" @keyup.enter="addTagEvent()"/>
    <el-tag class="tag" v-for="tag in tagList" :key="tag.name" :closable="true" @close="closeEvent(tag)" :type="tag.type">{{tag.name}}</el-tag>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '',
        tag: '',
        content: '',
        tagList: [
          { name: '标签三', type: 'primary' },
          { name: '凤凰山', type: 'primary' }
        ],
        imageUrl: '',
        fileSrc: ''
      };
    },

    methods: {
      addTagEvent () {
        console.log('aa');
        this.tagList.push({ name: this.tag, type: 'primary' });
        this.tag = '';
      },
      closeEvent (tag) {
        this.tagList = this.tagList.filter((item) => {
          return item !== tag;
        });
      },
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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
    padding: 20px;
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
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        &:focus {
          border-color: #409EFF;
          outline: 0;
        }
      }
    }
    .tag {
      margin: 0 20px 20px 0;
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
</style>
