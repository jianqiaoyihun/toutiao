<template>
  <el-container>
    <el-aside :style="{ width: collapse ? '60px' : '230px' }" style="background-color:#353b4e;min-height:100vh" >
      <layout-aside :collapse='collapse' class="home-aside"></layout-aside>
    </el-aside>
    <el-container>
      <el-header style="padding:0">
        <layout-header ></layout-header>
      </el-header>
      <el-main style="padding:0">
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
// import layoutAside from '../../components/home/layout-aside'
// import layoutHeader from '../../components/home/layout-header'
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false
    }
  },
  components: {
    // 'layout-aside': layoutAside,
    // 'layout-header': layoutHeader
  },
  created () {
    eventBus.$on('collapseOrOpen', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>

<style lang="less" scoped>
  .home-aside {
    position: fixed;
    // z-index: -100;
  }
</style>
