<template>
<!-- 新建页面 -->
  <el-card>
    <bread-crumb slot="header">
        <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="activeName" @tab-click="changeTab">
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
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      activeName: 'all'
    }
  },
  methods: {
    getAllMaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect' }
        // 在这里collect需要的参数是布尔值，this.activeName是当前所在的页面的name，可以和collect进行判断
        // 因为默认的是all，这里如果是all，就是false，如果不是就是true，
      }).then((result) => {
        this.list = result.data.results
      })
    },
    changeTab () {
      this.getAllMaterial()
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
         width: 200px;
         height:240px;
         margin: 20px 30px;
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
