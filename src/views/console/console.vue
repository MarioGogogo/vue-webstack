<template>
  <div class="console">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-item one-item">
          <p>错误日志</p>
          <p>29000条</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-item two-item">
          <p>操作日志</p>
          <p>29000条</p>
        </div></el-col
      >
      <el-col :span="6">
        <div class="grid-item three-item">
          <p>登录日志</p>
          <p>9123条</p>
        </div></el-col
      >
      <el-col :span="6">
        <div class="grid-item four-item">
          <p>性能日志</p>
          <p>400条</p>
        </div></el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-chart-item">
          <v-chart
            :option="logs_options"
            style="width: 100%; height: 300px"
          ></v-chart>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-chart-item">
          <v-chart
            :option="option_column"
            style="width: 100%; height: 300px"
          ></v-chart>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-chart-item">
          <v-chart
            :option="circle_options"
            style="width: 100%; height: 300px"
          ></v-chart>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-chart-item"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-updatelogs-item">
          <el-timeline>
            <p class="grid-updatelogs-item--title">更新日志</p>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
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
          top: 'top'
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
            radius: [10, 90],
            center: ['50%', '50%'],
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
          left: "5.8%",
          right: "0.5%",
          bottom: "12%",
        },
      },
      activities: [{
        content: '控制台图表搭建',
        timestamp: '2023-06-06 22:13',
        size: 'large',
        icon: 'el-icon-loading',
        color: "#6550c7"
      }, {
        content: '支持tabs页面切换',
        timestamp: '2023-06-04 12:26',
        size: 'large',
        color: '#0bbd87'
      }, {
        content: '项目基础建设搭建完成',
        timestamp: '2023-06-02 20:46',
        size: 'large',
        color: '#f4ad4c'
      }, {
        content: '项目初始化',
        timestamp: '2023-06-01 20:46',
        size: 'large',
        color: '#4e63eb'
      }]

    }
  },
}
</script>

<style lang="scss" scoped>
.grid-item {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  box-sizing: border-box;
  padding: 20px 10px;
  height: 140px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &.one-item {
    background: linear-gradient(to right, #5b46c0, #6f59cc);
  }
  &.two-item {
    background: linear-gradient(to right, #47bd2a, #7bdc4e);
  }
  &.three-item {
    background: linear-gradient(to right, #ff8a32, #ffb051);
  }
  &.four-item {
    background: linear-gradient(to right, #385dea, #5c7aec);
  }
  &:hover {
    scale: 1.1;
  }
}
.grid-chart-item {
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  box-sizing: border-box;
  height: 300px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.grid-updatelogs-item {
  display: flex;
  flex-direction: columns;
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  box-sizing: border-box;
  height: 580px;
  padding: 10px;
  .grid-updatelogs-item--title {
    font-size: 20px;
    color: #303133;
    padding-bottom: 10px;
    font-weight: bold;
  }
  .el-timeline {
    padding-left: 10px;
  }
}
.grid-item p {
  color: #fff;
  font-size: 1.5em;
}
</style>