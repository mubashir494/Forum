import comment from "../model/comment.js";
import mongoose from "mongoose";

export const createComment = async (req,res) => {
    try{
        const createComment = req.body;
        const createdComment = new comment(createComment);
        await createdComment.save();
        res.status(201).json(createdComment);
    }
    catch(error){
        res.status(401).json({error : error.message})
    }

}
export const findCommentById = async (req,res) => {
    try{
        const id = req.query.id
        const comments = await comment.find({postId : id})
       
        res.status(200).json(comments);
    }
    catch(error) {
        res.status(401).json({message : error.message})

    }
}
export const getCommentByUserId = async (userid) =>{
    let array = [];
    const id = userid;
    try{
        
        const comments =await comment.find({userId : id})
        if(comments.length ===0){
            return array
        }
        comments.map((Element) => {
            if(!array.includes(Element.postId)){
                array.push(Element.postId)
            }
        })
        return array
        
    }catch(error){
        return array
    }
}
export const delComment = async (req,res) =>{
    const commentId = req.query.commentId;
    try{
        
        const response = await comment.deleteOne({'_id' :commentId})
        res.status(200).json({"message" : "Successfully deleted the comment"})

    }catch(error){
        res.status(401).json({"message" : error.message})
    }

}
export const dislikeComment = async (req, res) => {
    const userId = req.query.userId;
    const commentId = mongoose.Types.ObjectId(req.query.commentId);
    try {
        const update = await comment.updateOne({ '_id': commentId }, {
            $pull: { likeCount: userId }
        })
        res.status(200).json(update)
    } catch (error) {
        res.status(401).json({ "message": error.message })
    }
}

export const likeComment = async (req, res) => {
    const userId = req.query.userId;
    const commentId = mongoose.Types.ObjectId(req.query.commentId);

    try {
        const update = await comment.updateOne({ _id: commentId },
            { $push: { likeCount: [userId] } })
        return res.status(200).json(update)
    } catch (error) {
        res.status(401).json({ "message": error.message })

    }
}