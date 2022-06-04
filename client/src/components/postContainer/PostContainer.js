import React, { useState,useEffect } from "react";
import Post from "./post/Post"
import { getPost} from "../../api/api";
import Pagination from "../pagination/Pagination";
import moment from 'moment'

const PostContainer = () => {
    const [array,setArray] = useState([]);
    const [currentPage,setcurrentPage] = useState(1);
    const [postperpage,setpostperpage] = useState(7);
    useEffect(() => {getPost().then(data => {setArray(data)}).catch(error => error.message)},[]); 
    const lastIndex = currentPage*postperpage;
    const firstIndex = lastIndex - postperpage;
    const array2 =array.slice(firstIndex,lastIndex);
    const inc = (num) =>{
        setcurrentPage(num)
    }
    return(
        <div className="container" style={{marginTop : "50px"}}>
            <div className="row">
                <div className="col-sm">
                <h1 style={{marginLeft : 20,marginBottom:20}}>All the Posts</h1>
                    {(array.length === 0)? <h1>No posts till now</h1>:array2.map((Element) => {return(<Post title={Element.title} text = {Element.text} date= {moment(Element.createdAt).format('YYYY-MM-DD')} createdBy = {Element.creator} id ={Element._id} userId = {Element.userId} likeCount = {Element.likeCount} page ={currentPage}/>)})}
                </div>
            </div>
            <Pagination  totalDocument={array.length} postperPage={postperpage} increase={inc}/>
            
        </div>
    )
}
export default PostContainer