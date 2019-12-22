<template>
<!-- 新建页面 -->
  <el-card v-loading="loading">
    <bread-crumb slot="header">
        <template slot="title">素材管理</template>
    </bread-crumb>
    <el-row type="flex" justify="end">
      <el-upload :http-request="uploadImg" :show-file-list="false">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="changeTab" v-loading="loading">
      <el-tab-pane label="全部素材" name="all">
        <!-- 用于存放内容 -->
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img :src="item.url" alt="">
            <el-row type="flex" justify="space-around" align="middle" class="operate">
               <i class='el-icon-star-on'></i>
               <i class='el-icon-delete-solid'></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <!-- 用于存放内容 -->
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img :src="item.url" alt="">
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-row type="flex" justify="center" style="height:80px" align="middle">
        <el-pagination background layout="prev, pager, next"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        @current-change="changePage"></el-pagination>
      </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      activeName: 'all',
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 8
      },
      loading: false
    }
  },
  methods: {
    getAllMaterial () {
      this.loading = true
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect', page: this.page.currentPage, per_page: this.page.pageSize }
        // 在这里collect需要的参数是布尔值，this.activeName是当前所在的页面的name，可以和collect进行判断
        // 因为默认的是all，这里如果是all，就是false，如果不是就是true，
      }).then((result) => {
        this.loading = false
        this.list = result.data.results
        this.page.total = result.data.total_count // 获取文章总数
      })
    },
    changeTab () {
      this.page.currentPage = 1
      this.getAllMaterial()
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllMaterial()
    },
    uploadImg (params) {
      this.loading = true
      let form = new FormData()
      form.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: form
      }).then(result => {
        this.loading = false
        this.getAllMaterial()
      })
    }
  },
  created () {
    this.getAllMaterial()
  }
}
</script>

<style lang="less" scoped>
  .img-list {
     display: flex;
     flex-wrap: wrap;
     .img-card {
         width: 150px;
         height:200px;
         margin: 20px 40px;
         position: relative;
         img {
             width: 100%;
             height: 100%;
         }
         .operate {
           position: absolute;
           left: 0;
           bottom: 0;
           width: 100%;
           font-size: 20px;
           background-color: #f4f5f6;
           height: 30px;
         }
     }
  }
</style>
