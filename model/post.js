import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    title : String,
    text : String,
    creator : String,
    likeCount : {
        type : [String],
        default : []
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    userId : {
        type : String,
        required : true
    }

})

const post = mongoose.model('post',postSchema)
export default post;