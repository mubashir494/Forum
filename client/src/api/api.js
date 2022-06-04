import axios from 'axios'


const URL = "https://forum-q.herokuapp.com"

export const createPost = async (obj) => { return axios.post(`${URL}/post`, obj)};

export const getPost = async () => {
    return axios.get(`${URL}/post`).then(response => response.data);
}
export const getPostById = async (id) => {
    const url = `${URL}/post/id?id=${id}`
    return axios.get(url).then(response => response.data);

}
export const createComment  = async (obj) => {
  axios.post(`${URL}/comment`, obj)
}

export const getCommentById = async (id) => {
  return axios.get(`${URL}/comment?id=${id}`)
} 

export const registerUser = async (userObj) =>{
  return axios.post(`${URL}/user/register`,userObj)
}
export const login = (userObj) =>{
  return axios.post(`${URL}/user/`,userObj)
} 

export const isLoggedIn = (token) => {
  return axios.post(`${URL}/user/get`,null,{
    headers : {
      'Content-Type' : 'application/json',
      'token' : token
    }
  })
}

export const getPostByUserId = (userid) =>{
  return axios.get(`${URL}/post/getpost?userId=${userid}`)

}
export const getPostbyUser = (userid) =>{
  return axios.get(`${URL}/post/getPostbyUserId?userId=${userid}`)
} 
export const updateUser = (token,obj) =>{
  return axios.put(`${URL}/user/update`,obj,{
    headers : {
      'Content-Type' : 'application/json',
      'token' : token
    }
  })
}
export const delPost = (id) =>{
  return axios.delete(`${URL}/post/deletePost?postId=${id}`)
}
export const delComment = (id) =>{
  return axios.delete(`${URL}/comment/del?commentId=${id}`)
}
export const like = (postId,userId)=>{
  return axios.put(`${URL}/post/like?userId=${userId}&postId=${postId}`)
}
export const dislike = (postId,userId)=>{
  return axios.put(`${URL}/post/dislike?userId=${userId}&postId=${postId}`)
}

export const likeComment =(commentId,userId) =>{
  return axios.put(`${URL}/comment/like?userId=${userId}&commentId=${commentId}`)
}
export const dislikeComment = (commentId,userId) =>{
  return axios.put(`${URL}/comment/dislike?userId=${userId}&commentId=${commentId}`)
}
export const postLikedByUser = (userId) =>{
  return axios.get(`${URL}/post/getlikedPost?userId=${userId}`)
}