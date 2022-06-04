import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String,
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
})

const user = mongoose.model('user',userSchema)
export default user