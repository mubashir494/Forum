import React,{useState,useContext,useEffect} from "react"
import { getPostbyUser } from "../../../api/api"
import ContextState from "../../Context/ContextState"
import Post from "../../postContainer/post/Post"
import moment from "moment"
const PostsByComment = () =>{
    const [post, setPost] = useState([]);
    const id = JSON.parse(localStorage.getItem("item")).id
    const context = useContext(ContextState)
    useEffect(() => { getPostbyUser(id).then(response => setPost(response.data)).catch(error => context.errorFun(error.message)) }, []);
    return(
        <>
        {(post.length > 0)?
        post.map((Element) => {return(<Post title={Element.title} text = {Element.text} date= {moment(Element.createdAt).format('YYYY-MM-DD')} createdBy = {Element.creator} id ={Element._id} userId = {Element.userId} likeCount = {Element.likeCount}/>)})
        :
        <div className="container">
            <h1>You havent commented Till now</h1>
        </div>}
        </>
    )
}
export default PostsByComment