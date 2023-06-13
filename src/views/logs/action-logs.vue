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
        <el-table-column label="ID" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.id.slice(-8) }}
          </template>
        </el-table-column>

        <el-table-column
          prop="projectName"
          label="项目"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column label="服务路径" width="220" align="center">
          <template slot-scope="scope">
            <el-tag type="" effect="dark">
              {{ '/' + scope.row.pathname.match(/\/([^/?]+)[/?]?$/)[1] || '' }}
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
        <el-table-column prop="time" label="时间" width="200" align="center">
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
          <el-row type="flex">
            <el-col :span="12">
              <el-row type="flex">
                <span class="dialog-info-item__label">用户名</span>
                <el-input v-model="info.username" disabled></el-input>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row type="flex" align="center">
                <span class="dialog-info-item__label">时间</span
                ><el-input v-model="info.time" disabled></el-input>
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
            <span class="dialog-info-item__label">请求参数</span>
            <json-viewer :value="info.request" :expand-depth="3"></json-viewer>
          </el-row>
        </div>
        <div class="dialog-info-item">
          <el-row type="flex">
            <span class="dialog-info-item__label">返回响应</span>
            <json-viewer
              :value="info.response"
              style="width: 100%"
              :expand-depth="2"
              sort
            ></json-viewer>
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
        id: "",
        username: "",
        host: "",
        client: "",
        browser: "",
        service: "",
        reportTime: "",
        duration: '',
        request: "",
        response: "",
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
          id: item._id,
          time: item.reportTime,
          name: item.username,
          projectName: item.projectName,
          pathname: item.pathname,
          host: item.host,
          client: item.client,
          browser: item.userAgent,
          status: item.status,
          request: item.request,
          response: item.response,
          duration: item.duration
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
    handleOpenDialog (index, row) {
      console.log("%c Line:374 🍞 index, row", "font-size:18px;color:#ffffff;background:#666699", index, row);
      this.dialogTableVisible = true

      this.info = {
        id: row.id,
        username: row.name,
        host: row.host,
        client: row.client,
        browser: row.browser,
        service: row.pathname,
        reportTime: row.time,
        duration: row.duration,
        request: row.request ? JSON.parse(row.request) : "",
        response: row.response ? JSON.parse(row.response) : "",
      }
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

<style lang="scss" scoped>
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
  // font-size: 20px;
  margin-bottom: 20px;
}
.dialog-info-item__label {
  display: flex;
  align-items: center;
  width: 120px;
}
.my-awesome-json-theme {
  // overflow-x: hidden;
  // // background: #0c2b52;
  // white-space: nowrap;
  // // color: #01fef4;
  // font-size: 14px;
  // font-family: Consolas, Menlo, Courier, monospace;
  .jv-ellipsis {
    // color: rgb(237, 13, 13);
    // background-color: rgb(241, 11, 11);
    // display: inline-block;
    // line-height: 0.9;
    // font-size: 0.9em;
    // padding: 0px 4px 2px 4px;
    // border-radius: 3px;
    // vertical-align: 2px;
    // cursor: pointer;
    // user-select: none;
  }

  .jv-button {
    color: #49b3ff;
  }
  ::v-deep .jv-key {
    // color: #01fef4 !important;
  }
  ::v-deep .jv-push {
    // color: #fff;
  }
  ::v-deep .jv-container .jv-code {
    padding: 0 !important;
  }
  .jv-item {
    &.jv-array {
      color: #111111;
    }
    &.jv-boolean {
      color: #fc1e70;
    }
    &.jv-function {
      color: #067bca;
    }
    &.jv-number {
      color: #fc1e70;
    }
    &.jv-number-float {
      color: #fc1e70;
    }
    &.jv-number-integer {
      color: #fc1e70;
    }
    &.jv-object {
      color: #111111;
    }
    &.jv-undefined {
      color: #e08331;
    }
    &.jv-string {
      color: #42b983;
      word-break: break-word;
      white-space: normal;
    }
  }
  .jv-code {
    padding: 0 !important;
    ::v-deep .jv-toggle {
      // color: #067bca !important;
    }
  }
  &.boxed {
    border: none;
    border-radius: 0;
  }
}
</style>