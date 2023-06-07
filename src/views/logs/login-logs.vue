<template>
  <div class="logs">
    <div class="logs-head">
      <el-input
        class="logs-head-input"
        v-model="user"
        placeholder="登录用户名"
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
        placeholder="请选择登录状态"
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
        v-loading="loading"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column label="ID" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.id.slice(-8) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" width="100" align="center">
        </el-table-column>
        <el-table-column prop="host" label="登录IP" width="140" align="center">
        </el-table-column>
        <el-table-column prop="address" label="登录地点" align="center">
        </el-table-column>
        <el-table-column prop="client" label="操作系统" align="center">
        </el-table-column>
        <el-table-column prop="browser" label="浏览器" align="center">
        </el-table-column>
        <el-table-column label="登录状态" align="center">
          <template slot-scope="scope">
            <el-tag type="success" effect="dark">
              {{ scope.row.status ? '成功' : '异常' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作信息" align="center">
        </el-table-column>
        <el-table-column prop="loginTime" label="登录日期" align="center">
        </el-table-column>
      </el-table>
    </div>
    <!-- 多页 -->
    <div class="logs-pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        :prev-text="'上一页'"
        :next-text="'下一页'"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
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
import { GetLoginLogsAPI } from '@/api/logs_api.js'
export default {
  name: "loginLogs",
  data () {
    return {
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
          label: '登录成功'
        },
        {
          value: '选项2',
          label: '登录异常'
        }
      ],
      tableData: [],
      currentPage: 1,
      total: 0
    }
  },
  mounted () {
    this.getLogs()

  },
  methods: {
    async getLogs () {
      const params = {
        page: this.currentPage,
      }
      const res = await GetLoginLogsAPI(params)
      const list = []
      res.result.data.forEach(item => {
        list.push({
          id: item._id,
          name: item.username,
          host: item.host,
          address: item.address,
          client: item.client,
          browser: item.browser,
          status: item.status,
          action: item.status ? '登录成功' : '登录异常',
          loginTime: item.last_login_time
        })
      });
      this.tableData = list
      this.total = res.result.total
      this.loading = false
      console.log('日志列表', list);
    },
    handleOpenDialog () {
      this.dialogTableVisible = true
    },

    handleCurrentChange (page) {
      console.log('当前页', page);
      this.currentPage = page
      this.getLogs()
    }
  }
}
</script>

<style lang="scss" scoped>
.logs {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .logs-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 60px;
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
  }
  .logs-table {
    flex: 1;
  }
  .logs-pagination {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
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