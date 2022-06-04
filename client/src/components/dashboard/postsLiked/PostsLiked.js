import React, { useEffect, useState, useContext } from "react";
import ContextState from "../../Context/ContextState";
import { postLikedByUser } from "../../../api/api";
import Posts from '../../postContainer/post/Post'
import moment from "moment"
const PostLiked = () => {
    const [Post,setPost] = useState([])
    const context = useContext(ContextState)
    const id = JSON.parse(localStorage.getItem('item')).id;
    useEffect(() => {postLikedByUser(id).then((Response) => {setPost(Response.data)}).catch((err) => {context.errorFun(err.message)})},[])
    return(
        <>
        {
            (Post.length === 0) ? <h1>No Liked Post</h1> : Post.map((Element) => {
                return(
                    <Posts title={Element.title} text = {Element.text} date= {moment(Element.createdAt).format('YYYY-MM-DD')} createdBy = {Element.creator} id ={Element._id} userId = {Element.userId} likeCount = {Element.likeCount}/>
                )
            })
        }

        </>
    )
}
export default PostLiked