<template>
  <div>
    <el-card v-loading="loading">
      <bread-crumb slot="header">
        <template slot="title">评论列表</template>
      </bread-crumb>
      <el-table :data="list">
        <el-table-column width="600" label="标题" prop="title"></el-table-column>
        <el-table-column label="评论状态" prop="comment_status" :formatter="formatterBool"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="操作">
          <!-- 放组件   作用域插槽  row column $index-->
          <template slot-scope="obj">
            <el-button type="text" size="small">修改</el-button>
            <el-button
              type="text"
              size="small"
              @click="openOrClose(obj.row)"
            >{{ obj.row.comment_status ? '关闭评论' : '打开评论' }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <!-- 用el-row  来进行布局 -->
      <el-row type="flex" justify="center" style="height:80px" align="middle">
        <el-pagination background layout="prev, pager, next"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        @current-change="changePage"></el-pagination>
      </el-row>

    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: false,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    async getComment () {
      this.loading = true
      let result = await this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
        // 增加请求参数，
      })
      this.list = result.data.results
      this.page.total = result.data.total_count // 获取文章总数
      this.loading = false
    },
    formatterBool (row, column, cellValue, index) {
      // row  当前行数据
      // column 当前列属性
      // cellValue 当前单元格的值
      // index  当前下标
      return cellValue ? '正常' : '关闭'
    },
    async openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      await this.$confirm(`您是否确定要${mess}评论？`)
      // console.log(row)
      await this.$axios({
        method: 'put',
        url: '/comments/status',
        params: { article_id: row.id.toString() },
        data: {
          allow_comment: !row.comment_status
        }
      })
      this.$message({
        type: 'success',
        message: '操作成功'
      })
      this.getComment()
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
