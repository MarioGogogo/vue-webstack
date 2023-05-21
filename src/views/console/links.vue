<template>
  <div class="links">
    <!-- 选择器 -->
    <div class="links-head">
      <el-select
        v-model="selectValue"
        placeholder="请选择"
        @change="handleSelectChange"
      >
        <el-option
          v-for="item in options"
          :key="item.label"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
    </div>
    <!-- 列表 -->
    <el-table
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
      <el-table-column prop="icon" label="图标" width="220" align="center">
      </el-table-column>
      <el-table-column prop="address" label="链接地址" align="center">
      </el-table-column>
      <el-table-column prop="description" label="描述" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" width="240">
        <template slot-scope="scope">
          <el-button
            type="success"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
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
          <p>名称</p>
          <el-input v-model="editValue" placeholder="请输入名称"></el-input>
        </div>
        <div class="classify-edit-item">
          <p>链接地址</p>
          <el-input
            v-model="addressValue"
            placeholder="请输入链接地址"
          ></el-input>
        </div>
        <!-- 描述 -->
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea"
        >
        </el-input>
        <div class="classify-edit-item">
          <p>图标</p>
          <el-select v-model="iconValue" placeholder="请选择">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { GetCategoryAPI } from '@/api/category_api.js';
import { GetLinksAPI, CreateLinksAPI, UpdateLinksAPI, DeleteLinksAPI, BathDeleteLinksAPI } from '@/api/links_api.js';
export default {
  data () {
    return {
      options: [],
      selectValue: '', //选中
      drawerTitle: "",
      visible: false,
      drawer: false,
      direction: 'rtl',
      tableData: [],
      editValue: "",
      iconValue: "",
      addressValue: "",
      textarea: "",//描述语言
      multipleSelection: [],  //多选
      edit_id: "",//编辑 id

    }
  },
  async mounted () {
    await this.getCategory();
    if (this.options && this.options[0]._id) {
      this.selectValue = this.options[0].label
      await this.getLinks(this.options[0]._id)
    }
  },
  methods: {
    async getCategory () {
      const res = await GetCategoryAPI()
      //转一下
      const data = []
      res.data.forEach(item => {
        data.push({
          label: item.category_name,
          value: item.icon_name,
          _id: item._id,
        })
      })
      console.log("%c Line:149 🥶 获取类别", "font-size:18px;color:#ffffff;background:#6ec1c2", data);
      this.options = data
    },
    async getLinks (_id) {
      const data = []
      const params = {
        category_id: _id
      }
      const res = await GetLinksAPI(params)
      console.log(res.data);
      res.data.forEach(item => {
        data.push({
          _id: item._id,
          id: item.links_seq,
          name: item.title,
          icon: item.icon,
          address: item.url,
          description: item.des
        })
      })
      this.tableData = data
    },
    handleSelectChange (val) {
      console.log("%c Line:167 🍓 handleSelectChange", "font-size:18px;color:#ffffff;background:#1dd1a1", val);
      //获取下拉选中的id
      const res = this.options.filter(item => item.label === val)
      const id = res[0]._id
      this.getLinks(id)
    },
    handleAdd () {
      this.drawer = true
      this.drawerTitle = "新增"
    },
    async handlePopverDelete (index, row) {
      const params = {
        id: row._id
      }
      await DeleteLinksAPI(params)
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      const res = this.options.filter(item => item.label === this.selectValue)
      const id = res[0]._id
      this.getLinks(id)
    },
    checkSaveRules () {
      let bool = false
      if (this.editValue && this.addressValue && this.iconValue) {
        bool = true
      }
      return bool
    },
    //保存
    async handleSave () {
      if (!this.checkSaveRules()) {
        this.$message({
          type: 'error',
          message: '请填写完整信息'
        });
        return
      }
      this.drawer = false
      const res = this.options.filter(item => item.label === this.selectValue)
      const id = res[0]._id
      const params = {
        category_id: id,
        title: this.editValue,
        icon: this.iconValue,
        url: this.addressValue,
        des: this.textarea
      }
      if (this.drawerTitle === "新增") {
        await CreateLinksAPI(params)
      } else if (this.drawerTitle === "编辑") {
        const new_params = Object.assign({ id: this.edit_id }, params)
        await UpdateLinksAPI(new_params)
      }
      this.$message({
        type: 'success',
        message: this.drawerTitle + '成功'
      });
      this.getLinks(id)
    },
    //批量删除
    handleBatchDelete () {
      this.$confirm('此操作将批量删除选中文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const params = {
          ids: this.multipleSelection.map(item => item._id)
        }
        await BathDeleteLinksAPI(params)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    handleEdit (index, row) {
      console.log(index, row);
      this.drawer = true
      this.drawerTitle = "编辑"
      const { address, description, icon, _id, name } = row
      this.editValue = name
      this.iconValue = icon
      this.addressValue = address
      this.textarea = description
      this.edit_id = _id
    },
    handleDelete (index, row) {
      console.log(index, row);
      this.visible = !this.visible
      this.activeIndex = index
    },
    handleClose (done) {
      done()
      this.resetDrawer()
    },
    resetDrawer () {
      this.editValue = ""
      this.iconValue = ""
      this.addressValue = ""
      this.textarea = ""
    }
  },
}
</script>

<style lang="scss" scoped>
</style>