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
        <el-input style="width:30%" type="textarea" :rows="4" v-model="formdata.content"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="type">
        <el-radio-group v-model="formdata.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
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
        title: [{ required: true, message: '标题不能为空' }, { min: 5, max: 10, message: '标题长度需要在5到30字符之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
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
  }
}
</script>

<style>
</style>
