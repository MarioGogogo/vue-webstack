<template>
  <div>
    <div class="classify-head">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
    </div>
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column prop="id" label="序号" width="100" align="center">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="220" align="center">
      </el-table-column>
      <el-table-column label="图标" align="center">
        <template slot-scope="scope">
          <i class="iconfont" :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="360">
        <template slot-scope="scope">
          <el-col :span="6" :offset="2">
            <el-button
              type="success"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
          </el-col>
          <el-col :span="6" :offset="2">
            <el-popover
              :key="scope.$index"
              placement="top"
              width="200"
              trigger="manual"
              :value="visible && scope.$index === activeIndex"
            >
              <p>确定需要删除第{{ scope.$index + 1 }}条内容吗?</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false"
                  >取消</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="handlePopverDelete(scope.$index, scope.row)"
                  >确定</el-button
                >
              </div>
              <el-button
                slot="reference"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </el-popover>
          </el-col>
        </template>
      </el-table-column>
    </el-table>
    <!-- 抽屉 -->
    <el-drawer
      :title="drawerTitle"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <div class="classify-edit">
        <div class="classify-edit-item">
          <p class="classify-edit-item__title">名称</p>
          <el-input v-model="editValue" placeholder="请输入名称"></el-input>
        </div>
        <div class="classify-edit-item">
          <p class="classify-edit-item__title">图标</p>
          <el-select
            class="classify-edit-select"
            v-model="selectValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <i style="float: right" class="iconfont" :class="item.value"></i>
            </el-option>
          </el-select>
        </div>
        <el-button
          class="classify-edit-btn"
          type="primary"
          @click="handleSave"
          >{{ saveTitle }}</el-button
        >
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { GetCategoryAPI, CreateCategoryAPI, UpdateCategoryAPI, DeleteCategoryAPI, BathDeleteCategoryAPI } from '@/api/category_api.js';
export default {
  data () {
    return {
      loading: true,  //加载
      drawerTitle: "",
      visible: false,
      drawer: false,
      direction: 'rtl',
      tableData: [],
      multipleSelection: [],  //多选
      options: [{
        value: 'icon-APPtuisong',
        label: 'APP'
      }, {
        value: 'icon-app1',
        label: 'APP2'
      }, {
        value: 'icon-remen',
        label: '热门'
      }, {
        value: 'icon-yunduanxiazai',
        label: '下载'
      }, {
        value: 'icon-qitafuwu',
        label: '其他'
      }],
      editValue: "",
      selectValue: '',
      saveTitle: "",
      edit_id: ""

    }
  },
  mounted () {
    this.getCategory();
  },

  methods: {
    resetDrawer () {
      this.editValue = ""
      this.selectValue = ""
      this.saveTitle = ""
      this.edit_id = ""
    },
    async getCategory () {
      const res = await GetCategoryAPI()
      console.log("%c Line:149 🥶 获取类别", "font-size:18px;color:#ffffff;background:#6ec1c2", res);
      //转一下
      const data = []
      res.data.forEach(item => {
        data.push({
          id: item.category_seq,
          name: item.category_name,
          icon: item.icon_name,
          _id: item._id,
        })
      })
      this.tableData = data
      this.loading = false
    },
    //添加
    handleAdd () {
      this.drawer = true
      this.drawerTitle = "新增"
      this.saveTitle = "添加"
    },
    async handleSave () {
      if (this.editValue === "" || this.selectValue === "") {
        return this.$message.error("请输入名称和图标");
      }
      this.drawer = false
      if (this.saveTitle === "添加") {

        const params = {
          name: this.editValue,
          icon: this.selectValue
        }
        await CreateCategoryAPI(params)

      } else if (this.saveTitle === "修改") {
        const params = {
          id: this.edit_id,
          name: this.editValue,
          icon: this.selectValue
        }
        await UpdateCategoryAPI(params)
      }
      this.$message({
        type: 'success',
        message: this.drawerTitle + '成功'
      });
      this.resetDrawer()
      this.getCategory()
    },
    handleBatchDelete () {
      this.$confirm('此操作将批量删除选中文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (this.multipleSelection.length === 0) {
          return this.$message.error("请选择要删除的文件");
        }
        const params = {
          ids: this.multipleSelection.map(item => item._id)
        }
        console.log("%c Line:183 🌽 params", "font-size:18px;color:#ffffff;background:#66CCFF", params);
        await BathDeleteCategoryAPI(params)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getCategory()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSelectionChange (val) {
      console.log("%c Line:208 🥒 val", "font-size:18px;color:#ffffff;background:#f368e0", val);
      this.multipleSelection = val;
    },
    //编辑
    handleEdit (index, row) {
      console.log(index, row);
      this.drawer = true
      this.drawerTitle = "编辑"
      this.saveTitle = "修改"
      this.editValue = row.name
      this.selectValue = row.icon
      this.edit_id = row._id

    },
    async handlePopverDelete (index, row) {
      const params = {
        id: row._id
      }
      await DeleteCategoryAPI(params)
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.getCategory()
    },
    handleDelete (index, row) {
      console.log(index, row);
      this.visible = !this.visible
      this.activeIndex = index
    },
    handleClose (done) {
      done();
      this.resetDrawer()
      // this.$confirm('确认关闭？')
      //   .then(() => {
      //     done();

      //   })
      //   .catch(() => { });
    }
  }
}
</script>


<style scoped>
/deep/ #el-drawer__title span {
  font-size: 20px;
}
.classify-head {
  padding: 10px 0;
}
.classify-edit {
  padding: 10px;
}
.classify-edit-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}
.classify-edit-item__title {
  width: 20%;
  font-size: 20px;
}
.classify-edit-select {
  width: 100%;
}
.classify-edit-btn {
  width: 100%;
  font-size: 20px;
}
</style>