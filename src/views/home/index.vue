<template>
  <el-container>
    <el-aside style="background-color:#353b4e;height:100vh;width:230px">
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        头部
      </el-header>
      <el-main>
        主体
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>
