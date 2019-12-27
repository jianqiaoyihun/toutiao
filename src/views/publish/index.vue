<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-form label-width="100px" :model='formdata' :rules="publishRules" ref="publishForm">
      <el-form-item label="标题" prop="title">
        <el-input style="width:30%" placeholder="文章标题" v-model="formdata.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor style="height:200px;width:80%"   v-model="formdata.content" :options="editorOption" placeholder="文章内容"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" prop="type" style="margin-top:60px">
        <el-radio-group v-model="formdata.cover.type" @change="changeType">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <cover-image :list="formdata.cover.images" @selectOneImg="receiveData"></cover-image>
      </el-form-item>
      <!-- {{formdata.cover.images}} -->
      <el-form-item label="频道" prop="channel_id">
          <el-select v-model="formdata.channel_id" placeholder="请选择">
          <el-option
            v-for="item in channelsList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click="publishArticle()">发布</el-button>
        <el-button @click="publishArticle(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        channel_id: null,
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        }

      },
      channelsList: [],
      publishRules: {
        title: [{ required: true, message: '标题不能为空' }, { min: 5, max: 30, message: '标题长度需要在5到30字符之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block']
          ]
        }
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
    publishArticle (draft) {
      this.$refs.publishForm.validate((isOk) => {
        let { articleId } = this.$route.params
        this.$axios({
          url: articleId ? `/articles/${articleId}` : `/articles`,
          method: articleId ? 'put' : 'post',
          params: { draft },
          data: this.formdata
        }).then(() => {
          this.$router.push('/home/articles')
        })
      })
    },
    getArticlesById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(res => {
        this.formdata = res.data
      })
    },
    receiveData (img, index) {
      this.formdata.cover.images.splice(index, 1, img)
    },
    changeType () {
      if (this.formdata.cover.type === -1 || this.formdata.cover.type === 0) {
        this.formdata.cover.images = []
      } else if (this.formdata.cover.type === 1) {
        this.formdata.cover.images = ['']
      } else if (this.formdata.cover.type === 3) {
        this.formdata.cover.images = ['', '', '']
      }
    }
  },
  created () {
    this.getChannels()
    let { articleId } = this.$route.params
    articleId && this.getArticlesById(articleId)
  },
  watch: {
    $route: function (to, from) {
      if (Object.keys(to.params).length) {
        this.getArticlesById(to.params.articleId) // 与created中的代码功能相同
      } else {
        this.formdata = {
          channel_id: null,
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          }
        }
      }
    }
    // 'formdata.cover.type': function () {
    //   // alert(this.formdata.cover.type)
    //   let { articleId } = this.$route.params
    //   if (!articleId) {
    //     if (this.formdata.cover.type === -1 || this.formdata.cover.type === 0) {
    //       this.formdata.cover.images = []
    //     } else if (this.formdata.cover.type === 1) {
    //       this.formdata.cover.images = ['']
    //     } else if (this.formdata.cover.type === 3) {
    //       this.formdata.cover.images = ['', '', '']
    //     }
    //   } else {
    //     if (this.formdata.cover.type === -1 || this.formdata.cover.type === 0) {
    //       this.formdata.cover.images = []
    //     } else if (this.formdata.cover.type === 1) {
    //       this.formdata.cover.images = [this.formdata.cover.images[0]]
    //     } else if (this.formdata.cover.type === 3) {
    //       if (this.formdata.cover.images.length < 2) {
    //         this.formdata.cover.images = [this.formdata.cover.images[0], '', '']
    //       }
    //     }
    //   }
    // }
  }
}
</script>

<style>
</style>
