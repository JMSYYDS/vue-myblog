import requests from './index'

// 保存文章
export const SetEssay = (data) => {
  return requests({
      url: '/set_essay/',
      method: 'post',
      data
  })
}

// 获取全部文章
export const GetAllEssay = () => {
  return requests({
      url: '/get_all_essay/',
      method: 'get',
  })
}

// 获取用户发表文章
export const GetUserEssay = (data) => {
  return requests({
      url: '/get_user_essay/',
      method: 'post',
      data
  })
}

// 获取某一文章
export const GetEssay = (data) => {
  return requests({
      url: '/get_essay/',
      method: 'post',
      data
  })
}

// 文章点赞
export const SupportEssay = (data) => {
  return requests({
      url: '/support_essay/',
      method: 'post',
      data
  })
}

// 查看是否点赞
export const GetSupportEssay = (data) => {
  return requests({
      url: '/get_support_essay/',
      method: 'post',
      data
  })
}

// 增加点击量
export const AddReadEssay = (data) => {
  return requests({
      url: '/add_read_essay/',
      method: 'post',
      data
  })
}

// 文章评论
export const SetEssayComment = (data) => {
  return requests({
      url: '/set_essay_comment/',
      method: 'post',
      data
  })
}

// 获取所有文章评论
export const GetEssayComment = (data) => {
  return requests({
      url: '/get_essay_comment/',
      method: 'post',
      data
  })
}

// 获取评论的点赞信息
export const GetSupportComment = (data) => {
  return requests({
      url: '/support_comment/',
      method: 'post',
      data
  })
}

// 删除文章
export const DeleteEssay = (data) => {
  return requests({
      url: '/delete_essay/',
      method: 'post',
      data
  })
}

// 删除评论
export const DeleteComment = (data) => {
  return requests({
      url: '/delete_comment/',
      method: 'post',
      data
  })
}