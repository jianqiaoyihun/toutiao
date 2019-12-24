<template>
<div class="content">
  <el-card class="articleCard">
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>

    <!-- 文章搜索区域 -->
    <el-row class="searchArea">
      <el-col :span="2">
        <span class="title">文章状态：</span>
      </el-col>
      <el-col :span="16">
        <!--
              0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
        -->
        <!-- 单选框组 -->
        <!-- {{formdata.status}} -->
        <el-radio-group v-model="formdata.status" style="height:40px;line-height:50px" @change="changeCondition">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>

    <el-row class="searchArea">
      <el-col :span="2">
        <span class="title">频道列表：</span>
      </el-col>
      <el-col :span="16">
        <!-- 下拉菜单 -->
        <!-- {{formdata.channel_id}} -->
        <el-select v-model="formdata.channel_id" placeholder="请选择" @change="changeCondition">
          <el-option
            v-for="item in channelsList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row class="searchArea" style="margin-bottom:0">
      <el-col :span="2">
        <span class="title">时间选择：</span>
      </el-col>
      <el-col :span="16">
        <!-- 时间 -->
        <div class="block">
          <el-date-picker
            @change="changeCondition"
            value-format="yyyy-MM-dd"
            v-model="formdata.dateRange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-col>
      <!-- {{formdata.dateRange.length}} -->
    </el-row>
  </el-card>
  <el-card class="articleCard">
    <el-row class="total">
      <span>共找到{{page.total}}条符合条件的内容</span>
    </el-row>
     <el-row  v-for="item in articlesList" :key="item.id.toString()" class='article-item' type='flex' justify="space-between">
        <!-- 左侧 -->
       <el-col :span="14">
           <el-row type='flex'>
             <img :src=" item.cover.images.length ? item.cover.images : defaultImage " alt="">
              <div class='info'>
                <span>{{ item.title }}</span>
                <!-- 过滤器不但可以在插值表达中使用 还可以在v-bind表达式中使用 -->
                <el-tag class='tag' :type=" item.status | filterType ">{{ item.status | filterStatus }}</el-tag>
                <span class='date'>{{ item.pubdate }}</span>
              </div>
           </el-row>
       </el-col>
       <!-- 右侧 -->
       <el-col :span="6">
           <el-row class='right' type='flex' justify="end">
               <span><i class="el-icon-edit"></i>修改</span>
               <span @click="delArticle(item.id)"><i class="el-icon-delete"></i> 删除</span>
           </el-row>
       </el-col>
    </el-row>
    <!-- 分页 -->
    <el-row type='flex' justify="center" align="middle" style='height:60px'>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="changePage"
        >
        </el-pagination>
    </el-row>
  </el-card>
</div>

</template>

<script>
export default {
  data () {
    return {
      formdata: {
        status: 5,
        channel_id: null,
        dateRange: []
      },
      defaultImage: require('../../assets/img/404.png'),
      channelsList: [],
      articlesList: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channelsList = result.data.channels
      })
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        console.log(result)
        this.articlesList = result.data.results
        this.page.total = result.data.total_count // 文章总数
      })
    },
    changeCondition () {
      this.page.currentPage = 1
      this.getConditionArticle()
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getConditionArticle()
    },
    getConditionArticle () {
      if (this.formdata.dateRange === null) {
        this.formdata.dateRange = []
      }
      let params = {
        page: this.page.currentPage, // 分页信息
        per_page: this.page.pageSize, // 分页信息
        status: this.formdata.status === 5 ? null : this.formdata.status,
        channel_id: this.formdata.channel_id,
        begin_pubdate: this.formdata.dateRange.length ? this.formdata.dateRange[0] : '',
        end_pubdate: this.formdata.dateRange.length > 1 ? this.formdata.dateRange[1] : null
      }
      this.getArticles(params)
    },
    delArticle (id) {
      this.$confirm('您确定要删除这篇文章吗？').then(() => {
        this.$axios({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除文章成功'
          })
          this.getConditionArticle()
        })
      })
    }
  },
  filters: {
    filterStatus (value) {
      // value 是过滤器前面表达式计算得到的值
      // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  created () {
    this.getChannels()
    this.getArticles({ page: 1, per_page: 10 })
  }
}
</script>

<style lang="less" scoped>
  .content {
    background-color:#f2f3f5
  }
  .articleCard {
    margin-bottom:10px;
  }
  .searchArea {
    margin-bottom: 20px;
    margin-left: 50px;
    .title {
      line-height: 40px
    }
  }
  .total {
    border-bottom:1px dashed #ccc;
    height: 55px;
    line-height: 35px
  }
  .article-item {
      margin: 20px 0;
      padding: 10px 0;
      border-bottom: 1px solid #f2f3f5;
      img {
          width: 180px;
          height: 100px;
          margin-right: 10px;
          border-radius: 4px;
      }
      .info {
          height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .tag {
              max-width:60px;
              text-align: center
          }
          .date {
              color: #999;
              font-size:12px;
          }
      }
      .right {
          span {
              margin-left:8px;
              font-size: 14px;
              cursor: pointer;
          }
      }
  }
</style>
