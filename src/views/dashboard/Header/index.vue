<template>
  <div class="main-header">
    <div class="main-header-left">
      <i class="el-icon-s-fold icon-item" @click="handleChangeCollapse"></i>
      <div class="main-head-search">
        <i class="el-icon-search icon-item icon-search"></i>
        <el-input
          class="main-head-search--input"
          v-model="input"
          :clearable="true"
          placeholder="请输入内容"
        ></el-input>
      </div>
    </div>
    <div class="main-header-right">
      <div class="main-header-right-item">
        <i class="el-icon-sunny icon-item"></i>
      </div>
      <div class="main-header-right-item">
        <i class="el-icon-full-screen icon-item"></i>
      </div>
      <div class="main-header-right-item">
        <el-badge :value="200" :max="99" class="item">
          <i class="el-icon-bell icon-item"></i>
        </el-badge>
        <div class="msg-dialog">
          <div class="msg-dialog-head">
            <p>你有三条新的短信</p>
          </div>
          <ul>
            <li class="msg-content-item">
              <el-avatar size="large" :src="circleUrl"></el-avatar>
              <div class="msg-content">
                <p class="msg-content-title">你的好友申请已被通过</p>
                <p class="msg-content-time">状态:通过</p>
              </div>
            </li>
            <li class="msg-content-item">
              <el-avatar size="large" :src="circleUrl"></el-avatar>
              <div class="msg-content">
                <p class="msg-content-title">你的好友申请已被通过</p>
                <p class="msg-content-time">状态:通过</p>
              </div>
            </li>
            <li class="msg-content-item">
              <el-avatar size="large" :src="circleUrl"></el-avatar>
              <div class="msg-content">
                <p class="msg-content-title">你的好友申请已被通过</p>
                <p class="msg-content-time">状态:通过</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="main-header-right-item">
        <el-badge :value="200" :max="99" class="item">
          <i class="el-icon-message icon-item"></i>
        </el-badge>
      </div>
      <div class="main-header-right-item">
        <el-avatar size="large" :src="circleUrl"></el-avatar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }
  },
  methods: {
    handleChangeCollapse () {
      this.$store.commit('change_isCollapse');
    }
  },

}
</script>

<style lang="scss" scoped>
.main-header {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .main-header-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    .main-head-search {
      display: flex;
      flex-direction: row;
      align-items: center;
      background: #ecf0fa;
      padding: 16px;
      border-radius: 26px;
      height: 40px;
      box-sizing: border-box;
      margin-left: 20px;
      .icon-search {
        color: #929396;
      }
      ::v-deep .el-input__inner {
        border: none;
        background: #ecf0fa;
      }
    }
  }
  .main-header-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    .main-header-right-item {
      margin-right: 26px;
      cursor: pointer;
      position: relative;
      .msg-dialog {
        position: absolute;
        display: none;
        top: 36px;
        right: 0px;
        width: 350px;
        height: auto;
        background: #fff;
        border-radius: 6px;
        .msg-dialog-head {
          height: 50px;
          line-height: 50px;
          text-align: center;
          font-size: 16px;
          background: linear-gradient(to right, #5b46c0, #6f59cc);
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          p {
            color: #fff;
          }
        }
        ul {
          margin: 0;
          padding: 0;
        }
        .msg-content-item {
          list-style: none;
          display: flex;
          height: 70px;
          padding: 10px;
          .msg-content {
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: #000;
            .msg-content-title {
              font-size: 16px;
            }
            .msg-content-time {
              font-size: 12px;
            }
          }
          &:hover {
            background: #f6f3f3;
            opacity: 0.9;
          }
        }
      }
    }
  }
}
.icon-item {
  font-size: 26px;
}
</style>