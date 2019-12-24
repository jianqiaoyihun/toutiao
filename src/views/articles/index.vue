<template>
  <el-card>
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
  .searchArea {
    margin-bottom: 20px;
    margin-left: 50px;
    .title {
      line-height: 40px
    }
  }
</style>
