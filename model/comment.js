import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
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
    postId : {
        type :String,
        required : true
    },
    userId : {
        type : String,
        required : true
    }

})

const comment = mongoose.model('comment',commentSchema)
export default comment;