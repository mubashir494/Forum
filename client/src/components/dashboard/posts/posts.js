import React, { useEffect, useContext, useState } from "react";
import { getPostByUserId } from "../../../api/api";
import ContextState from "../../Context/ContextState";
import Post from "../../postContainer/post/Post";
import moment from 'moment'

const Posts = () => {
    
    const [post, setPost] = useState([]);
    const id = JSON.parse(localStorage.getItem("item")).id
    const context = useContext(ContextState)
    useEffect(() => { getPostByUserId(id).then(response => setPost(response.data)).catch(error => context.errorFun(error.message)) }, []);

    
    return (
        <>
        {(post.length > 0)?
        post.map((Element) => {return(<Post title={Element.title} text = {Element.text} date= {moment(Element.createdAt).format('YYYY-MM-DD')} createdBy = {Element.creator} id ={Element._id} userId ={Element.userId} likeCount = {Element.likeCount}/>)})
        :
        <div className="container">
            <h1 >No Posts</h1>
        </div>
        }
        </>
    )
}
export default Posts;