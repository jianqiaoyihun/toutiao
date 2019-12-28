//  专门放置请求模块的逻辑
import request from '../utils/request'
import { API_ARTICLES, API_CHANNELS } from '../constent/api'
export function getArticles (params) {
  return request({
    url: API_ARTICLES,
    params
  })
}
export function getChannels (params) {
  return request({
    url: API_CHANNELS
  })
}
export function delArticle (id) {
  return request({
    url: `/articles/${id.toString()}`,
    method: 'delete'
  })
}
export function getArticlesById (id) {
  return request({
    url: `/articles/${id}`
  })
}
export function publishArticle (draft, articleId, formDatas) {
  return request({
    url: articleId ? `/articles/${articleId}` : `/articles`,
    method: articleId ? 'put' : 'post',
    params: { draft },
    data: formDatas
  })
}
