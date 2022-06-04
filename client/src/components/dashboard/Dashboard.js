import React, { useEffect, useContext, useState } from "react";
import { getPostByUserId } from "../../api/api";
import ContextState from "../Context/ContextState";
import Posts from "./posts/posts";
import PostsByComment from "./postByUser/PostsByComment";
import Update from "./updateInfo/Update";
import PostLiked from "./postsLiked/PostsLiked";
import moment from 'moment'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
  

const Dashboard = () => {
    const [post, setPost] = useState([]);
    const id = JSON.parse(localStorage.getItem("item")).id
    const context = useContext(ContextState)
    useEffect(() => {getPostByUserId(id).then(response => setPost(response.data)).catch(error => context.errorFun(error.message))},[]); 
    return (
        <>
            <div className="container" style={{ marginTop: "50px" }}>
                <h1>Dash Board</h1>
                <hr />
                <div className="row">
                    <div className="col-3">
                        <nav className="nav flex-column verticleMenu ">
                            <a className="nav-link" aria-current="page" href="/dashboard">Your posts</a>
                            <a className="nav-link" aria-current="page" href="/dashboard/liked">Posts Liked By You</a>
                            <a className="nav-link" href="/dashboard/comment">Post You have commented</a>
                            <a className="nav-link" href="/dashboard/update">Update Personal Information</a>
                        </nav>
                    </div>
                    <div className="col-9">
                            <Routes>
                                <Route exact path="" element={<Posts/>}/>
                                <Route exact path="liked" element={<PostLiked/>}/>
                                <Route exact path="comment" element={<PostsByComment/>}/>
                                <Route exact path="update" element={<Update/>}/>
                            </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard