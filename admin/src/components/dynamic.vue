<template>
<div class="dynamic">
  <div class="li-left" v-if="!type">
    <img :src="listItem.avatar"/>
  </div>
  <div class="li-right">
    <div class="title">
      <span>{{listItem.title}}</span>
      <div class="sign-box" v-if="!type"><span class="sign"></span></div>
      <el-dropdown trigger="click" style="float: right;" @command="dropdownEvent" v-if="control">
        <el-button class="el-dropdown-link">操作</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">隐藏</el-dropdown-item>
          <el-dropdown-item command="b">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown trigger="click" style="float: right;" v-if="listItem.tagList.length">
        <el-button class="el-dropdown-link">标签（{{listItem.tagList.length}}）</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, index) in listItem.tagList" :key="index">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="content">{{listItem.content}}</div>
    <div class="img-box">
      <div class="item" v-for="item in listItem.urls">
        <load-img :src="item.url"></load-img>
      </div>
    </div>
    <collapse :num="listItem.commentList.length">
      <ul class="ul">
        <li v-for="item in listItem.commentList">
          <div class="left"><img :src="item.user.url"/></div>
          <div class="right">
            <div class="name">{{item.user.name}}</div>
            <div>{{item.content}}</div>
          </div>
        </li>
      </ul>
      <div class="pagination">
        <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </collapse>
  </div>
</div>
</template>

<script>
import Collapse from './collapse.vue';
import loadImg from './load_img.vue';
export default {
  components: {
    'collapse': Collapse,
    'load-img': loadImg
  },
  props: ['listItem', 'type', 'control'],
  methods: {
    dropdownEvent (value) {
      console.log(value);
    }
  }
};
</script>

<style lang="less" scoped>
.dynamic {
    width: 100%;
    display: flex;
    .li-left {
        width: 60px;
        height: 60px;
        margin-right: 20px;
        img {
            width: 100%;
            height: 100%;
            border-radius: 4px;
            transition: box-shadow .5s;
            &:hover {
              box-shadow: 0 0 10px rgba(0,0,0,0.4);
            }
        }
    }
    .li-right {
        flex: 1;
        font-size: 0;
        border: 1px solid #ddd;
        font-size: 16px;
        border-radius: 5px;
        transition: box-shadow .5s;
        &:hover {
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
        }
        .title {
            line-height: 45px;
            font-size: 16px;
            color: #333;
            font-weight: 700;
            background: rgb(210, 236, 255);
            border-bottom: 1px solid #ddd;
            padding: 0 15px;
            position: relative;
            .sign-box {
                width: 10px;
                height: 20px;
                position: absolute;
                top: 12px;
                left: -10px;
                overflow: hidden;
                z-index: 6;
                .sign {
                    width: 20px;
                    height: 20px;
                    display: block;
                    background: rgb(210, 236, 255);
                    border-left: 1px solid #ddd;
                    border-bottom: 1px solid #ddd;
                    transform: rotate(45deg);
                    margin-left: 5px;
                }
            }
        }
        .content {
            font-size: 15px;
            color: #555;
            line-height: 30px;
            padding: 10px 15px 0;
        }
        .img-box {
            width: 100%;
            padding: 0 15px;
            box-sizing: border-box;
            margin-bottom: 5px;
            .item {
                width: 180px;
                border-radius: 5px;
                border: 1px solid #ddd;
                padding: 7px;
                font-size: 0;
                display: inline-block;
                margin: 10px;
                cursor: pointer;
                transition: all 0.5s;
                &:hover {
                    box-shadow: 0 0 15px rgba(0,0,0,0.2);
                }
                img {
                    width: 100%;
                }
            }
        }
        .ul {
          margin: 0;
          padding: 0;
          li {
            list-style-type: none;
            display: flex;
            margin: 10px;
            max-height: 80px;
            overflow: hidden;
            .left {
              width: 50px;
              padding: 5px;
              margin-right: 10px;
              img {
                width: 50px;
                border-radius: 50%;
              }
            }
            .right {
              flex: 1;
              padding: 5px;
              font-size: 15px;
              line-height: 20px;
              border-bottom: 1px solid #ddd;
              padding-bottom: 10px;
              color: #777;
              .name {
                color: #444;
                line-height: 16px;
                height: 20px;
              }
            }
          }
        }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
          margin-bottom: 15px;
        }
    }
}
</style>
