<template>
  <div class="cover">
    <div v-for="(item,index) in list" :key="index" class='cover-item'>
         <!-- <upload-image @ImageUrl="receiveData"></upload-image> -->
         <img :src="list[0] ? list[index] : defaultImage" alt="">
      </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      // imageUrl: this.list[0] ? '../../assets/img/pic_bg.png' : this.list[0],
      defaultImage: require('../../assets/img/pic_bg.png')
    }
  },
  methods: {
    receiveData (imageUrl) {
      this.imageUrl = imageUrl
      this.getImageUrl()
    },
    getImageUrl () {
      this.$emit('ImageUrl', this.imageUrl)
    }
  },
  created () {
    console.log(this.list)
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
