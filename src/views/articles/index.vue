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
        <el-radio-group v-model="formdata.status" style="height:40px;line-height:50px">
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
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
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
            v-model="value1"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="articleCard">
    <el-row class="total" style="">
      <span>共找到62282条符合条件的内容</span>
    </el-row>
     <el-row  v-for="item in 100" :key="item" class='article-item' type='flex' justify="space-between">
        <!-- 左侧 -->
       <el-col :span="14">
           <el-row type='flex'>
             <img src="../../assets/img/404.png" alt="">
              <div class='info'>
                <span>年少不听李宗盛，听懂己是不惑年。</span>
                <el-tag class='tag'>标签一</el-tag>
                <span class='date'>2019-12-24 09:15:42</span>
              </div>
           </el-row>
       </el-col>
       <!-- 右侧 -->
       <el-col :span="6">
           <el-row class='right' type='flex' justify="end">
               <span><i class="el-icon-edit"></i>修改</span>
               <span><i class="el-icon-delete"></i> 删除</span>
           </el-row>
       </el-col>
    </el-row>
  </el-card>
</div>

</template>

<script>
export default {
  data () {
    return {
      formdata: {
        status: 5
      }
    }
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
              max-width:80px;
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
