import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom'
import { getPostById, getCommentById, createComment } from '../../api/api.js';
import moment from 'moment'
import Comment from  '../commentContainer/Comment/Comment'
import ContextState from '../Context/ContextState'
const PostPage = () => {
    const context = useContext(ContextState)
    let { id } = useParams();
    const [Obj, setObj] = useState({})
    const [comment, setComment] = useState([]);
    const [commentText, setcommentText] = useState("");
    const getComment = () => {
        getCommentById(id).then(value => setComment(value.data)).catch(error => console.log(error.message))
    }
    useEffect(() => { getPostById(id).then(value => setObj(value)).catch(error => console.log(error.message)) }, [])
    useEffect(() => { getCommentById(id).then(value => setComment(value.data)).catch(error => console.log(error.message)) }, [])

    const postComment = () => {
        if (context.loggedIn === true) {
            const currentUser = JSON.parse(localStorage.getItem('item'))
            const obj = {
                "text": commentText,
                "creator": currentUser.firstName,
                "postId": id,
                "userId": currentUser.id
            }
           
            createComment(obj).then((response) => {
                setcommentText("")
                document.getElementById("clear").children[1].value = ""
                context.errorFun("Successfully Posted the comment")
                getComment()
            }).catch((error) => {
                context.errorFun(error.message)
            })

        }
        else {
            context.errorFun("Please login to post the comment")
        }

    }
    const handleChange = (e) => {
        const text = e.target.value;
        setcommentText(text)
    }

    return (
        <>
            <div className="container my-4">
                <h1 style={{wordWrap : "break-word"}}>

                    {Obj.title}              
                </h1>

                <hr />
                <p style={{wordWrap : "break-word"}}>
                    {Obj.text}
                </p>
                <p style={{ marginTop: 150 }}>
                    <small>
                        By : {Obj.creator} <br />
                    </small>
                
                    <small>
                        Posting Date : {moment(Obj.createdAt).format('YYYY-MM-DD')} <br />
                    </small>
                    <small>
                        Posting Time : {moment(Obj.createdAt).format('hh:mm:ss')}
                    </small>
                </p>
            </div>
            <div className="container">
                <h1>Comments</h1>
                <hr />
                {comment.map((element) => {
                    return (<Comment text={element.text} id = {element._id} userId = {element.userId} createdBy={element.creator} date={moment(element.createdAt).format('YYYY-MM-DD')}  likeCount = {element.likeCount} />)
                })}
                {(context.loggedIn === true) ?
                    <div>
                        <div className="mb-3" id='clear'>
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Comment Here </label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" onChange={handleChange} rows="3" value={commentText} />
                        </div>
                        <button className="btn btn-primary" onClick={postComment}>Post your comment</button>
                    </div>
                    :
                    <a href='/login' style={{ textAlign: "center", textDecoration: "none", color: "black", marginTop: "150px" }}><h1>Please Login to post the Comment</h1></a>
                }

            </div>
        </>

    )

}
export default PostPage