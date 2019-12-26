<template>
  <div class="cover">
    <div v-for="(item,index) in list" :key="index" class='cover-item'>
         <img src="../../assets/img/pic_bg.png" alt="">
      </div>
  </div>
</template>

<script>
export default {
  props: ['list']
}
</script>

<style lang="less" scoped>
  .cover {
    display: flex;
    margin:20px 0;
    // margin-left: 100px;
     .cover-item {
       border: 1px solid #ccc;
       width: 250px;
       height: 250px;
       padding: 10px;
       img {
         height: 100%;
         width:100%;
       }
     }
  }
</style>
