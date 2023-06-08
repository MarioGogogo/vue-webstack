<template>
  <el-aside
    class="main-el-aside"
    :style="{ width: isCollapse ? '60px' : '200px' }"
  >
    <!-- logo -->
    <div class="logo">
      <img
        :class="isCollapse ? 'main-logo-small' : 'main-logo'"
        :src="
          isCollapse
            ? require('@/assets/images/logo_samll.png')
            : require('@/assets/images/logo.png')
        "
      />
    </div>
    <el-menu
      :collapse="isCollapse"
      background-color="#2c2c3e"
      text-color="#fff"
      :default-active="menuActive"
      active-text-color="#6240f4"
      class="el-menu-vertical-demo"
      router
    >
      <el-menu-item index="/main">
        <i class="el-icon-office-building"></i>
        <span slot="title">控制台</span>
      </el-menu-item>
      <el-menu-item index="/main/classify">
        <i class="el-icon-s-grid"></i>
        <span slot="title">分类管理</span>
      </el-menu-item>
      <el-menu-item index="/main/links">
        <i class="el-icon-attract"></i>
        <span slot="title">链接列表</span>
      </el-menu-item>
      <el-submenu index="logs">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">日志管理</span>
        </template>
        <el-menu-item index="/main/login-logs">
          <i class="el-icon-date"></i>
          <span slot="title">登录日志</span>
        </el-menu-item>
        <el-menu-item index="/main/error-logs">
          <i class="el-icon-date"></i>
          <span slot="title">错误日志</span>
        </el-menu-item>
        <el-menu-item index="/main/performance-logs">
          <i class="el-icon-date"></i>
          <span slot="title">性能日志</span>
        </el-menu-item>
        <el-menu-item index="/main/action-logs">
          <i class="el-icon-date"></i>
          <span slot="title">操作日志</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/main/setting">
        <i class="el-icon-setting"></i>
        <span slot="title">系统设置</span>
      </el-menu-item>
    </el-menu>
    <!-- 侧边栏 -->
  </el-aside>
</template>

<script>
export default {
  data () {
    return {
      menuActive: '/main' //当前激活的index
    }
  },
  computed: {

    isCollapse () {
      return this.$store.state.isCollapse;
    }
  },

}
</script>

<style lang="scss" scoped>
.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  .main-logo {
    width: 105px;
    margin: 0;
    max-width: 100%;
    height: auto;
    vertical-align: middle;
    border-style: none;
    transition: 0.4s;
  }
  .main-logo-small {
    width: 33px;
    margin: 0;
    height: auto;
    vertical-align: middle;
    border-style: none;
    transition: 0.4s;
  }
}
.main-el-aside {
  transition: 0.4s;
}
/* 关键，必须加上，否则在折叠时会出现第一个文字卡顿后消失 */
.el-menu:not(.el-menu--collapse) {
  width: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border: none;
}
</style>