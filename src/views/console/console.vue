<template>
  <div class="console">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-item">
          <p>日志记录</p>
          <p>29000条</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-item">
          <p>日志记录</p>
          <p>29000条</p>
        </div></el-col
      >
      <el-col :span="6">
        <div class="grid-item">
          <p>登录次数</p>
          <p>9123条</p>
        </div></el-col
      >
      <el-col :span="6">
        <div class="grid-item">
          <p>数据库统计</p>
          <p>400.88MB</p>
        </div></el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-item">
          <v-chart :option="logs_options" style="height: 200px"></v-chart>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-item">
          <v-chart :option="circle_options" style="height: 200px"></v-chart>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-item">
          <v-chart :option="option_column" style="height: 200px"></v-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { logs_options } from '@/data/index.js'
export default {
  name: "console",
  data () {
    return {
      logs_options: logs_options,
      circle_options: {
        legend: {
          top: 'bottom'
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        series: [
          {
            name: '日志记录',
            type: 'pie',
            radius: [5, 60],
            center: ['50%', '40%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 4
            },
            data: [
              { value: 40, name: 'rose 1' },
              { value: 38, name: 'rose 2' },
              { value: 32, name: 'rose 3' },
              { value: 30, name: 'rose 4' },
              { value: 28, name: 'rose 5' },
              { value: 26, name: 'rose 6' },
              { value: 22, name: 'rose 7' },
              { value: 18, name: 'rose 8' }
            ]
          }
        ]
      },
      option_column: {
        title: { text: "登录区域" },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "2.8%",
          right: "0.5%",
          bottom: "6%",
        },
      },

    }
  },
}
</script>

<style  scoped>
.grid-item {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  box-sizing: border-box;
  padding: 20px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.grid-item p {
  color: #409eff;
  font-size: 1.5em;
}
</style>