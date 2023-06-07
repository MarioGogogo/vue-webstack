<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: #565c64">
      <!-- logo -->
      <div class="logo"></div>
      <!-- 侧边栏 -->
      <el-menu
        :default-openeds="['1', '3']"
        background-color="#565c64"
        text-color="#fff"
        @select="onSelect"
      >
        <el-menu-item index="classify">
          <i class="el-icon-s-grid"></i>
          <span slot="title">分类管理</span>
        </el-menu-item>
        <el-menu-item index="links">
          <i class="el-icon-attract"></i>
          <span slot="title">链接列表</span>
        </el-menu-item>
        <el-menu-item index="setting">
          <i class="el-icon-setting"></i>
          <span slot="title">系统设置</span>
        </el-menu-item>
        <el-menu-item index="logs">
          <i class="el-icon-date"></i>
          <span slot="title">日志管理</span>
        </el-menu-item>
        <el-submenu index="other">
          <template slot="title"
            ><i class="el-icon-message"></i>导航一</template
          >
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
      <!-- 侧边栏 -->
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>账号:admin</span>
      </el-header>
      <el-main>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
        <!-- 内容区域 -->
        <div class="layout-content-main">
          <router-view name="table"></router-view>
        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>



<script>
export default {
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item)
    }
  },
  methods: {
    onSelect (key) {
      console.log("%c Line:71 🍉 key", "font-size:18px;color:#ffffff;background:#1dd1a1", key);
      this.$router.push({
        path: "/main/" + key
      })
    }
  }
};
</script>



<style scoped>
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
}

.el-main {
  flex: 1;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
.logo {
  width: 100%;
  height: 60px;
  background: #b3c0d1;
}
.layout-content-main {
  /* padding: 10px; */
}
</style>