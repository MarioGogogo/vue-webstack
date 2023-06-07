<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: "main",
  data () {
    return {
      key: "value",
      cachedViews: []   //需要缓存的页面
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
}
</script>

<style lang="scss" scoped>
// 动画效果
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
</style>

<style scoped>
/deep/.el-main {
  padding: 20px;
  background-color: #edf0fa;
  height: calc(100vh - 60px - 60px - 41px);
}
/deep/.el-tabs {
  height: 40px;
  box-sizing: border-box;
  border: none;
}
/*/deep/ .el-tabs__nav-wrap {
  height: 40px;
}
/deep/ .el-tabs__nav-scroll .el-tabs__nav {
  border: none;
}
/deep/ .el-tabs__nav .el-tabs__item {
  height: 40px;
  line-height: 40px;
} */
</style>