<template>
  <el-container>
    <Sidebar />
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <Main />
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Footer from './Footer/index.vue'
import Header from './Header/index.vue'
import Sidebar from './Sidebar/index.vue'
import Main from './Main/index.vue'
export default {
  name: "dashboard",
  components: {
    Header,
    Sidebar,
    Footer,
    Main
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}
.el-aside {
  background-color: #2c2c3e;
  line-height: 200px;
}
.el-main {
  padding: 0;
}
.el-footer {
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>