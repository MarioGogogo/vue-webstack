<template>
  <el-container style="height: 100vh">
    <!-- 侧边栏 -->
    <el-aside
      class="main-el-aside"
      :style="{ width: isCollapse ? '60px' : '200px' }"
    >
      <!-- logo -->
      <div class="logo"></div>
      <el-menu
        :collapse="isCollapse"
        background-color="#565c64"
        text-color="#fff"
        :default-active="menuActive"
        class="el-menu-vertical-demo"
        router
      >
        <el-menu-item index="/main">
          <i class="el-icon-s-grid"></i>
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
        <el-menu-item index="/main/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">系统设置</span>
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
      </el-menu>
      <!-- 侧边栏 -->
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header class="main-el-header">
        <i class="el-icon-s-fold" @click="isCollapse = !isCollapse"></i>
        <div>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>账号:admin</span>
        </div>
      </el-header>
      <!-- 动态tabs -->
      <el-tabs
        v-model="activeIndex"
        type="card"
        @tab-remove="removeTab"
        @tab-click="handleTabsClick(editableTabsValue)"
      >
        <el-tab-pane
          :key="item.name"
          v-for="item in openTab"
          :label="item.name"
          :name="item.route"
          :closable="item.closable"
        >
        </el-tab-pane>
      </el-tabs>
      <el-main>
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view name="table"></router-view>
          </keep-alive>
        </transition>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>



<script>
export default {
  data () {
    return {
      isCollapse: false, //收缩 展开
      nav_title: "",
      tabIndex: 1,
      menuActive: "",
      cachedViews: []
    }
  },
  mounted () {
    this.menuActive = "console"
    // 刷新时以当前路由做为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
    // 当当前路由是首页时，添加首页到store，并设置激活状态

    console.log("%c Line:128 🥝 this.$route.path", "font-size:18px;color:#ffffff;background:#FF9966", this.$route);
    const pageName = this.$route.meta.title
    if (this.$route.path !== '/' && this.$route.path !== '/main/console') {
      console.log('1');
      this.$store.commit('add_tabs', { route: '/main/console', name: pageName, closable: false });
      this.$store.commit('add_tabs', { route: this.$route.path, name: this.$route.name, closable: true });
      this.$store.commit('set_active_index', this.$route.path);
    } else {
      console.log('2');
      this.$store.commit('add_tabs', { route: '/main/console', name: pageName, closable: false });
      this.$store.commit('set_active_index', '/main/console');
      this.$router.push('/main');
    }
  },
  computed: {
    openTab () {
      return this.$store.state.openTab;
    },
    activeIndex: {
      get () {
        return this.$store.state.activeIndex;
      },
      set (val) {
        this.$store.commit('set_active_index', val);
      }
    }
  },
  methods: {
    handleTabsClick (tab) {
      console.log("%c Line:136 🍩 tab", "font-size:18px;color:#ffffff;background:#6666FF", tab);
      console.log("tab", tab);
      console.log('active', this.activeIndex);
      this.$router.push({ path: this.activeIndex });
    },
    removeTab (targetName) {
      console.log("tabRemove", targetName);
      //首页不删
      if (targetName == '/main/console') {
        return
      }
      this.$store.commit('delete_tabs', targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.openTab && this.openTab.length >= 1) {
          console.log('=============', this.openTab[this.openTab.length - 1].route)
          this.$store.commit('set_active_index', this.openTab[this.openTab.length - 1].route);
          this.$router.push({ path: this.activeIndex });
        } else {
          this.$router.push({ path: '/main/console' });
        }
      }
    }
  },
  watch: {
    '$route' (to) {
      console.log("%c Line:180 ❤️‍🔥❤️‍🔥 to", "font-size:18px;color:#ffffff;background:#6ec1c2", to);
      //判断路由是否已经打开
      //已经打开的 ，将其置为active
      //未打开的，将其放入队列里
      const pageName = to.meta.title
      let flag = false;
      for (let item of this.openTab) {
        console.log("item.name", item.name)
        console.log("t0.name", pageName)
        if (item.name === pageName) {
          console.log('to.path', to.path);
          this.$store.commit('set_active_index', to.path)
          flag = true;
          break;
        }
      }

      if (!flag) {
        console.log('to.path', to.path);
        this.$store.commit('add_tabs', { route: to.path, name: pageName, closable: true });
        this.$store.commit('set_active_index', to.path);
      }

    }
  }

};
</script>



<style>
/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
/* fade */
.main-el-aside {
  transition: 0.4s;
  background: #575c64;
}
/* 关键，必须加上，否则在折叠时会出现第一个文字卡顿后消失 */
.el-menu:not(.el-menu--collapse) {
  width: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-header {
  padding-top: 1%;
  background-color: #d1dfff;
  display: flex;
  justify-content: space-between;
}
.el-menu {
  border: none;
}
.el-main {
  padding: 0;
}

.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
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
  padding: 10px;
}

.main-el-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.el-icon-s-fold {
  font-size: 22px;
}
</style>