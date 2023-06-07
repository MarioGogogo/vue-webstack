<template>
  <el-container>
    <Sidebar />
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <Console />
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
import Console from '@/views/console/console.vue'
export default {
  name: "dashboard",
  components: {
    Header,
    Sidebar,
    Footer,
    Console
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}
.el-aside {
  background-color: #2c2c3e;
  color: #b4bfcc;
  text-align: center;
  line-height: 200px;
}
.el-header {
  background-color: #fff;
}
.el-main {
  background: #ecf0fa;
}
.el-footer {
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>