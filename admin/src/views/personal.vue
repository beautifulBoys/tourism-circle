<template>
<div class="personal" style="">
  <h1>个人设置</h1>


  <el-form :label-position="'right'" label-width="80px" :model="formValue">
    <el-form-item label="用户名">
      <el-input v-model="formValue.title" placeholder="10 字以内"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="formValue.email"></el-input>
    </el-form-item>
    <el-form-item label="地址">
      <el-cascader :options="cityData" placeholder="请选择您所在的城市" v-model="formValue.city"></el-cascader>
      <el-button type="primary" :disabled="locationObj[locationObj.index].disable" :loading="locationObj[locationObj.index].loading" @click="locationEvent()">{{locationObj[locationObj.index].text}}</el-button>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="formValue.sex">
        <el-radio-button label="男孩"></el-radio-button>
        <el-radio-button label="女孩"></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="碎碎念">
      <el-input class="textarea" type="textarea" :autosize="{minRows: 3}" placeholder="100 字以内" v-model="formValue.desc"></el-input>
    </el-form-item>
    <el-form-item label="选择头像">
      <div class="add-picture" @click="show = true">
        <img v-show="userImgSrc" :src="userImgSrc"/>
        <span v-show="!userImgSrc" >+</span>
      </div>
    </el-form-item>
    <cut-image title="选择头像" :show="show" :ratio="1" :loading="loading" @getData="getDataEvent"></cut-image>
  </el-form>
  <div id="allmap" style="display: none;"></div>
  <div class="footer">
    <el-button type="primary":loading="postStatus" @click="postEvent()">确　定</el-button>
  </div>

</div>
</template>
<script>
import upload from '../components/upload.vue';
import loadImg from '../components/posting/picture.vue';
import cutImage from '../components/gallery/cut_image.vue';

import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('box/personal');
export default {
  components: {
    'upload': upload,
    'load-img': loadImg,
    'cut-image': cutImage
  },
  computed: {
    ...mapState({
      formValue: state => state.formValue_personal,
      imgList: state => state.imgList,
      cityData: state => state.cityData,
      tagList: state => state.tagList,
      postImgList: state => state.postImgList,
      postStatus: state => state.postStatus
    }),
    ...mapGetters([])
  },
  data () {
    return {
      labelPosition: 'right',
      userImgSrc: '',
      img_size: 1,
      show: false,
      loading: false,
      locationObj: {
        data: null,
        index: 'ing',
        suc: {text: '已定位，点击填充', loading: false, disable: false},
        err: {text: '定位失败', loading: false, disable: false},
        ing: {text: '定位中', loading: true, disable: false},
        end: {text: '已填充', loading: false, disable: true}
      }
    };
  },
  mounted () {
  	this.geolocation = new BMap.Geolocation();
    this.myGeo = new BMap.Geocoder();
    this.getLocationEvent();
  },
  methods: {
    ...mapMutations(['closeEvent']),
    ...mapActions(['postEvent']),
    getLocationEvent () {
      let _this = this;
    	_this.geolocation.getCurrentPosition(function (r) {
    		if(this.getStatus() === BMAP_STATUS_SUCCESS) {
          _this.myGeo.getLocation(r.point, function (rs) {
            _this.locationObj.index = 'suc';
            _this.locationObj.data = rs.addressComponents;
          });
        } else {
          _this.locationObj.index = 'err';
        }
    	}, {enableHighAccuracy: true});
    },
    getDataEvent (data) {
      this.userImgSrc = data;
      this.show = false;
    },
    locationEvent () {
      if (this.locationObj.index === 'suc') {
        this.formValue.city = [this.locationObj.data.province, this.locationObj.data.city, this.locationObj.data.district];
        this.locationObj.index = 'end';
      } else if (this.locationObj.index === 'err') {
        this.locationObj.index === 'ing';
        this.getLocationEvent();
      } else {
        console.log('发生错误，请检查');
      }
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
      img {
        width: 100%;
      }
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
      margin: -15px 0 -10px 0;
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
