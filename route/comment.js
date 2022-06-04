import express from "express";
import {createComment,findCommentById,getCommentByUserId,delComment,likeComment,dislikeComment} from '../contoller/comment.js'
const router = express.Router();


router.post('/',createComment)
router.get('/',findCommentById)
router.get('/getCommentByUserId',getCommentByUserId);
router.delete('/del',delComment)
router.put('/like',likeComment)
router.put('/dislike',dislikeComment)


export default router;

