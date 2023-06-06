<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "dashboard"
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
  background: #b4bfcc;
}
.el-footer {
  background-color: #fff;
}
</style>