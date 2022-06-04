import post from "../model/post.js"
import comment from "../model/comment.js";
import { getCommentByUserId } from "../contoller/comment.js"
import mongoose from "mongoose";
import { response } from "express";
export const getPost = async (req, res) => {
    try {
        const posts = await post.find();
        res.status(200).json(posts)

    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}
export const createPost = async (req, res) => {
    try {

        const createPost = req.body;

        const createdPost = new post(createPost);
        await createdPost.save();
        res.status(201).json(createdPost);
    } catch (error) {
        res.status(401).json({ message: error.message })

    }
}

export const getPostById = async (req, res) => {
    const id = req.query.id
    try {
        const postById = await post.findById(id);
        if (!postById) {
            res.status(401).json({ message: "Not found" })
        }
        else {
            res.status(200).json(postById);
        }

    } catch (error) {
        res.status(401).json({ message: error.message })
    }

}
export const getPostByUserId = async (req, res) => {
    const id = req.query.userId;
    try {
        const postByUserId = await post.find({ userId: id })
        if (postByUserId.length === 0) {
            res.status(200).json({ "message": "0 posts" })
        }
        else {
            res.status(200).json(postByUserId);
        }
    } catch (error) {
        res.status(401).json({ message: error.message })
    }

}


export const getPostByCommentId = async (req, res) => {
    const id = req.query.userId;
    const ids = await getCommentByUserId(id)
    try {

        post.find({
            '_id': {
                $in: ids
            }
        }, function (err, doc) {
            res.status(200).json(doc)
        })
    } catch (err) {
        res.status(401).json({ "message": err.message })
    }
}
export const delPost = async (req, res) => {
    const id = req.query.postId;
    try {
        const resp = await post.deleteOne({ "_id": id })
        if (resp.deletedCount === 1) {
            const resp2 = await comment.deleteMany({ "postId": id });
        }
        res.status(200).json({ "message": "Successfully Deleted the post" })
    } catch (error) {
        res.status(401).json({ "message": error.message })
    }
}
export const dislikePost = async (req, res) => {
    const userId = req.query.userId;
    const postId = mongoose.Types.ObjectId(req.query.postId);
    try {
        const update = await post.updateOne({ '_id': postId }, {
            $pull: { likeCount: userId }
        })
        res.status(200).json(update)
    } catch (error) {
        res.status(401).json({ "message": error.message })
    }
}
export const likePost = async (req, res) => {
    const userId = req.query.userId;
    const postId = mongoose.Types.ObjectId(req.query.postId);
    
    try {
        const update = await post.updateOne({ _id: postId },
            { $push: { likeCount: [userId] } })
        return res.status(200).json(update)
    } catch (error) {
        res.status(401).json({ "message": error.message })

    }
}
export const postLikedByUser = async (req,res)=>{
    const userId = req.query.userId;
    try{
        const posts = await post.find({likeCount : userId})
        res.status(200).json(posts)
    }catch(err){
        res.status(401).json({"message" : err.message})
    }
}