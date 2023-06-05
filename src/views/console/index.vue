<template>
  <div class="login-wrap">
    <div class="login-item">
      <p class="label">账号</p>
      <el-input
        v-model="username"
        placeholder="请输入账号"
        clearable
      ></el-input>
    </div>
    <div class="login-item">
      <p class="label">密码</p>
      <el-input
        type="password"
        placeholder="请输入密码"
        v-model="password"
        clearable
      >
      </el-input>
    </div>
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>


<script>
import { LoginAPI } from '@/api/login_api.js';
export default {
  name: "Console",
  data () {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    async login () {
      const pass = this.checkLogin()
      if (!pass) return
      const params = {
        username: this.username,
        password: this.password
      }
      try {
        const res = await LoginAPI(params)
        console.log("%c Line:44 🍕 res", "font-size:18px;color:#ffffff;background:#6666FF", res);
        if (res.code === 400) {
          return this.$message.error(res.message);
        }
        this.$router.push({
          path: "/main"
        })
        //做登录与退出时 ，需要清空路由
        this.$store.state.openTab = [];
        this.$store.state.activeIndex = '/main';
      } catch (error) {
        console.log("%c Line:54 🍻 login---catch", "font-size:18px;color:#ffffff;background:#6666FF", error);
      }

    },
    checkLogin () {
      let pass = false
      if (this.username === "" || this.password === "") {
        pass = false
        this.$message.error('账号或密码不能为控');
      } else {
        pass = true
      }
      return pass

    }
  },
}
</script>

<style scoped>
.login-wrap {
  position: fixed;
  width: 500px;
  height: 400px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login-wrap .label {
  font-size: 20px;
  color: #ccc;
}
.login-item {
  margin-bottom: 20px;
}
</style>