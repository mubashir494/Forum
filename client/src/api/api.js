import axios from 'axios'

export const createPost = async (obj) => { return axios.post('http://localhost:5000/post', obj)};

export const getPost = async () => {
    return axios.get('http://localhost:5000/post').then(response => response.data);
}
export const getPostById = async (id) => {
    const url = `http://localhost:5000/post/id?id=${id}`
    return axios.get(url).then(response => response.data);

}
export const createComment  = async (obj) => {
  axios.post('http://localhost:5000/comment', obj)
}

export const getCommentById = async (id) => {
  return axios.get(`http://localhost:5000/comment?id=${id}`)
} 

export const registerUser = async (userObj) =>{
  return axios.post('http://localhost:5000/user/register',userObj)
}
export const login = (userObj) =>{
  return axios.post('http://localhost:5000/user/',userObj)
} 

export const isLoggedIn = (token) => {
  return axios.post('http://localhost:5000/user/get',null,{
    headers : {
      'Content-Type' : 'application/json',
      'token' : token
    }
  })
}

export const getPostByUserId = (userid) =>{
  return axios.get(`http://localhost:5000/post/getpost?userId=${userid}`)

}
export const getPostbyUser = (userid) =>{
  return axios.get(`http://localhost:5000/post/getPostbyUserId?userId=${userid}`)
} 
export const updateUser = (token,obj) =>{
  return axios.put('http://localhost:5000/user/update',obj,{
    headers : {
      'Content-Type' : 'application/json',
      'token' : token
    }
  })
}
export const delPost = (id) =>{
  return axios.delete(`http://localhost:5000/post/deletePost?postId=${id}`)
}
export const delComment = (id) =>{
  return axios.delete(`http://localhost:5000/comment/del?commentId=${id}`)
}
export const like = (postId,userId)=>{
  return axios.put(`http://localhost:5000/post/like?userId=${userId}&postId=${postId}`)
}
export const dislike = (postId,userId)=>{
  return axios.put(`http://localhost:5000/post/dislike?userId=${userId}&postId=${postId}`)
}

export const likeComment =(commentId,userId) =>{
  return axios.put(`http://localhost:5000/comment/like?userId=${userId}&commentId=${commentId}`)
}
export const dislikeComment = (commentId,userId) =>{
  return axios.put(`http://localhost:5000/comment/dislike?userId=${userId}&commentId=${commentId}`)
}
export const postLikedByUser = (userId) =>{
  return axios.get(`http://localhost:5000/post/getlikedPost?userId=${userId}`)
}