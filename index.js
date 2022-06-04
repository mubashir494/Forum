import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import express from 'express'
import post from './route/post.js'
import comment from './route/comment.js'
import user from './route/user.js'
import dotenv from 'dotenv'
import path from 'path'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config()
// app.use(express.json())
app.use(cors());


app.use('/post',post);
app.use('/comment',comment)
app.use('/user',user)


const CONNECTION_URL =  process.env.MONGODB_URI || 'mongodb+srv://server:MbIWrHCmhUYXO78b@cluster0.gdrhq.mongodb.net/secondDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT|| 5000

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get("*",(req,res) =>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
mongoose.connect(CONNECTION_URL,{useNewUrlParser : true, useUnifiedTopology : true})
.then(() => {app.listen(PORT,() => console.log("Connected to port "+PORT))}).catch((error) => {console.log(error.message)})
// mongoose.set('useFindAndModify',true);