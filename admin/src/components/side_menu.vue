<template>
  <el-row class="tac">
    <el-col :span="12">
    <el-menu default-active="2" class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :unique-opened="true"
      router
      theme="dark">
      <div class="logo"></div>
      <el-menu-item index="/"><i class="el-icon-setting"></i>首页</el-menu-item>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>逛圈子</template>
        <el-menu-item-group>
          <el-menu-item index="circles">最新动态</el-menu-item>
          <el-menu-item index="1-2">最热动态</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>我的圈友</template>
        <el-menu-item-group>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-message"></i>个人中心</template>
        <el-menu-item-group>
          <el-menu-item index="posting">发表帖子</el-menu-item>
          <el-menu-item index="posted">我发表的</el-menu-item>
          <el-menu-item index="3-2">我点赞的</el-menu-item>
          <el-menu-item index="3-2">我评论的</el-menu-item>
          <el-menu-item index="3-2">私人空间</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-message"></i>数据中心</template>
        <el-menu-item-group>
          <el-menu-item index="3-1">发表帖子</el-menu-item>
          <el-menu-item index="3-2">我发表的</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-message"></i>设置</template>
        <el-menu-item-group>
          <el-menu-item index="3-1">发表帖子</el-menu-item>
          <el-menu-item index="3-2">我发表的</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"><i class="el-icon-message"></i>说明</template>
        <el-menu-item-group>
          <el-menu-item index="3-1">发表帖子</el-menu-item>
          <el-menu-item index="3-2">我发表的</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>

  </el-row>
</template>
<script>
  export default {
    data () {
      return {
        defaultActive: '1'
      };
    },
    methods: {
      handleOpen () {},
      handleClose () {}
    }
  };
</script>
<style lang="less" scoped>
.logo {
  width: 100%;
  line-height: 80px;
  text-align: center;
  height: 80px;
  color: #20A0FF;
  font-size: 30px;
  font-family: "微软雅黑";
  border-bottom: 1px solid #000;
  //background: url(../images/logo.png) no-repeat center center;
  background-size: 100px;
  cursor: pointer;
}
.el-col-12 {
  width: 100%;
}
.el-menu.el-menu-vertical-demo {
  border: none;
}
</style>
<style>
.el-menu-item-group__title {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
