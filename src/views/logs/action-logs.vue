<template>
  <div class="logs">
    <!-- 头部 -->
    <div class="logs-head">
      <el-input
        class="logs-head-input"
        v-model="user"
        placeholder="请输入用户名"
      ></el-input>
      <el-date-picker
        v-model="logs_date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-select
        class="logs-head-select"
        v-model="logsType"
        placeholder="请选择日志类型"
      >
        <el-option
          v-for="item in logs_options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        class="logs-head-btn"
        type="success"
        icon="el-icon-search"
        @click="handleOpenDialog(scope.$index, scope.row)"
        >查询</el-button
      >
    </div>
    <!-- 列表 -->
    <div class="logs-table">
      <el-table
        class="logs-table-list"
        v-loading="loading"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column prop="time" label="时间" width="200" align="center">
        </el-table-column>
        <el-table-column prop="name" label="用户名" width="100" align="center">
        </el-table-column>
        <el-table-column label="服务名" width="220" align="center">
          <template slot-scope="scope">
            <el-tag type="" effect="dark">
              {{ scope.row.service }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="host" label="ip地址" align="center">
        </el-table-column>
        <el-table-column prop="client" label="客户端" align="center">
        </el-table-column>
        <el-table-column label="浏览器" align="center">
          <template slot-scope="scope">
            <p class="logs-table__borwser">{{ scope.row.browser }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="success"
              icon="el-icon-edit"
              @click="handleOpenDialog(scope.$index, scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="table-pagination" v-if="total">
        <el-pagination
          background
          :current-page="currentPage"
          prev-text="上一页"
          next-text="下一页"
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
          @prev-click="handlePrevClick"
          @next-click="handleNextClick"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="查看信息" :visible.sync="dialogTableVisible">
      <div class="dialog-info">
        <div class="dialog-info-item">
          <el-row>
            <el-col :span="12">
              <el-row type="flex">
                <span class="dialog-info-item__label">用户名</span>
                <el-input
                  v-model="info.username"
                  placeholder="请输入用户名"
                  disabled
                ></el-input>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="dialog-info-item">
          <el-row type="flex">
            <el-col :span="12">
              <el-row type="flex" align="center">
                <span class="dialog-info-item__label">IP地址</span
                ><el-input
                  v-model="info.host"
                  placeholder="请输入内容"
                  disabled
                ></el-input>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row type="flex">
                <span class="dialog-info-item__label">客户端</span
                ><el-input
                  v-model="info.client"
                  placeholder="请输入内容"
                  disabled
                ></el-input>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="dialog-info-item">
          <el-row type="flex">
            <span class="dialog-info-item__label">浏览器</span>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="info.browser"
              disabled
            >
            </el-input>
          </el-row>
        </div>
        <div class="dialog-info-item">
          <el-row type="flex">
            <span class="dialog-info-item__label">服务名</span>
            <el-input
              v-model="info.service"
              placeholder="请输入服务名"
              disabled
            ></el-input>
          </el-row>
        </div>
        <div class="dialog-info-item">
          <el-row type="flex">
            <el-col :span="12">
              <el-row type="flex" align="center">
                <span class="dialog-info-item__label">时间</span
                ><el-input
                  v-model="info.reportTime"
                  placeholder="请输入内容"
                  disabled
                ></el-input>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row type="flex">
                <span class="dialog-info-item__label">持续时间</span
                ><el-input
                  v-model="info.duration"
                  placeholder="请输入内容"
                  disabled
                ></el-input>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="dialog-info-item">
          <el-row type="flex">
            <span class="dialog-info-item__label">参数</span>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="info.request"
              disabled
            >
            </el-input>
          </el-row>
        </div>
        <div class="dialog-info-item">
          <el-row type="flex">
            <span class="dialog-info-item__label">自定义数据</span>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="info.response"
              disabled
            >
            </el-input>
          </el-row>
        </div>
        <div class="dialog-info-item">
          <el-row type="flex">
            <span class="dialog-info-item__label">异常</span>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="info.message"
              disabled
            >
            </el-input>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetLogsAPI } from '@/api/logs_api.js'
export default {
  data () {
    return {
      currentPage: 1, // 当前页码
      total: 0, // 数据总数
      loading: true,
      info: {
        username: "",
        host: "",
        client: "",
        browser: "",
        service: "",
        reportTime: "",
        duration: '',
        request: "",
        response: "",
        message: ""
      },
      user: "",
      logs_date: "",
      dialogTableVisible: false,
      textarea2: "",
      logsType: "",
      logs_options: [
        {
          value: '选项1',
          label: '超时日志'
        },
        {
          value: '选项2',
          label: '请求方法错误日志'
        }
      ],
      tableData: [],
    }
  },
  mounted () {
    this.getLogs()

  },
  methods: {
    async getLogs () {
      const params = {
        page: this.currentPage,
        type: "xhr"
      }
      const res = await GetLogsAPI(params)
      let list = []
      const { data, total } = res.result
      data.forEach(item => {
        list.push({
          time: item.reportTime,
          name: item.username,
          service: item.url,
          host: item.host,
          client: item.client,
          browser: item.browser,
        })
      });
      this.total = total
      this.tableData = list
      this.loading = false
      console.log('日志列表', data);
    },
    // 跳转到指定页码
    goToPage (page) {
      // 更新当前页码
      this.currentPage = page;
      // 加载数据
      this.getLogs();
    },
    handleOpenDialog () {
      this.dialogTableVisible = true
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getLogs()
    },
    handlePrevClick () {
      this.currentPage--
    },
    handleNextClick () {
      this.currentPage++
    }
  }
}
</script>

<style scoped>
.el-table::before {
  content: '';
  position: absolute;
  background-color: #fff; /* 底部颜色 */
  z-index: 1;
}
.logs-head {
  display: flex;
  flex-direction: row;
  padding: 10px 0;
}
.logs-head-select {
  margin-left: 10px;
}
.logs-head-input {
  width: 200px;
  margin-right: 10px;
}
.logs-head-btn {
  margin-left: 10px;
}
.logs-table-list {
  height: calc(100vh - 280px);
  border-bottom: none;
}
.logs-table {
  /* background: saddlebrown; */
}
.table-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}
.logs-table__borwser {
  /*文字最多显示二行 */
  display: -webkit-box; /* 设置为基于 WebKit 的盒子模型 */
  -webkit-line-clamp: 2; /* 设置最大显示行数 */
  -webkit-box-orient: vertical; /* 设置为垂直方向 */
  overflow: hidden; /* 设置溢出隐藏 */
}
.dialog-info-item {
  font-size: 20px;
  margin-bottom: 20px;
}
.dialog-info-item__label {
  display: flex;
  align-items: center;
  width: 120px;
}
</style>