<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material">
      <div class="select-img-list">
        <el-card class="img-card" v-for="(item,index) in list" :key="index">
          <img @click="clickImg(item.url)" :src="item.url" alt />
        </el-card>
      </div>
      <el-row type="flex" justify="center">
        <el-pagination background layout="prev, pager, next"
         :total="page.total"
         :current-page="page.currenPage"
         :page-size="page.pageSize"
         @current-change="changePage"
         ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="uploadImg"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      imageUrl: '',
      activeName: 'material',
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 8

      }
    }
  },
  methods: {
    getImageUrl () {
      this.$emit('ImageUrl', this.imageUrl)
    },
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    clickImg (url) {
      this.$emit('selectOneImg', url)
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
  .select-img-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img-card {
      width: 120px;
      height: 120px;
      margin: 10px 10px;
      img {
        width: 100%;
        height: 100%;
      }
  }
}
</style>
