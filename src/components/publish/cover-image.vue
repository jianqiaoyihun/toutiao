<template>
  <div class="cover">
    <div v-for="(item,index) in list" :key="index" class='cover-item' @click="openDialog(index)">

         <img :src="item ? item : defaultImage" alt="">
    </div>
    <el-dialog :visible="dialogVisible" @close="closeDialog">
      <upload-image @selectOneImg="receiveData"></upload-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      // imageUrl: this.list[0] ? '../../assets/img/pic_bg.png' : this.list[0],
      defaultImage: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      selectIndex: -1
    }
  },
  methods: {
    openDialog (index) {
      this.dialogVisible = true
      this.selectIndex = index
    },
    closeDialog () {
      this.dialogVisible = false
    },
    receiveData (imageUrl) {
      this.$emit('selectOneImg', imageUrl, this.selectIndex)
      this.closeDialog()
    }

  },
  created () {
    // console.log(this.list)
  }
}
</script>

<style lang="less" scoped>
  .cover {
    display: flex;
    margin:20px 0;
    // margin-left: 100px;
     .cover-item {
       border: 1px solid #ccc;
       width: 178px;
       height: 178px;
       border-radius: 5px;
      //  padding: 10px;
      margin-right: 20px;
       img {
         height: 100%;
         width:100%;
       }
     }
  }
</style>
