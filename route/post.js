import express from 'express'
import { getPost,createPost, getPostById,getPostByUserId,getPostByCommentId,delPost,dislikePost,likePost,postLikedByUser } from '../contoller/post.js';
const router = express.Router();

router.get('/',getPost)
router.get('/id',getPostById)
router.post('/',createPost)
router.get('/getpost',getPostByUserId)
router.get('/getPostbyUserId',getPostByCommentId)
router.put('/dislike',dislikePost)
router.put('/like',likePost)
router.delete('/deletePost',delPost)
router.get('/getlikedPost',postLikedByUser)

export default router;