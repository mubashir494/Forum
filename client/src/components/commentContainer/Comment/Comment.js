import React, { useState, useContext, useEffect } from "react";
import users from "../../../img/user.png"
import "../../../css/image.css"
import del from '../../../img/del.png'
import { delComment,likeComment,dislikeComment } from '../../../api/api'
import ContextState from "../../Context/ContextState";
import { useNavigate } from "react-router-dom";

const Comment = (prop) => {
    const [user, setuser] = useState("")
    const [Liked, setLiked] = useState(false)
    const [Length,setLength] = useState(0)

    const navigate = useNavigate();
    const context = useContext(ContextState)
    useEffect(() => {
        const post = localStorage.getItem('item')
        if (post) {
            const json = JSON.parse(post);
            setuser(json.id);
        }
    }, [])
    useEffect(() => {
        const currentUserId = localStorage.getItem('item')
        
        setLength(prop.likeCount.length)
        if (currentUserId) {
            const id = JSON.parse(currentUserId).id
            if (prop.likeCount.includes(id)) {
                setLiked(true)
            }
        }
    },[])
    const postLike = () => {
        const userId = JSON.parse(localStorage.getItem('item')).id;
        if (Liked === false) {

            
            likeComment(prop.id, userId).then((response) => {
                
                setLiked(true)
                setLength(Length+1);
            }).catch((error) => {
                context.errorFun(error.message)
            })
        }
        else {
           
            dislikeComment(prop.id, userId).then((response) => {
            
                setLiked(false)
                setLength(Length-1)
            }).catch(error => {
                context.errorFun(error.message)
            })
        }
    }
    const deletePost = () => {
        delComment(prop.id).then((response) => {
            
            context.errorFun(response.data.message)
            window.location.reload(false)
        }).catch((error) => {
            context.errorFun(error.message)
        })


    }
    return (
        <div className="container my-3" >
            <div className="card" >
                <div className="card-body row" >
                    <div className="col-sm-2">
                        <div className="container" style={{ marginLeft: "10px" }}>

                            <img src={users} className="rounded float-left img-fluid " alt="Picture not found" height={130} width={100} />
                            <p><small>Posted by : {prop.createdBy}</small></p>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="container" style={{ marginTop: "8px",wordWrap :"break-word" }}>
                            <p className="card-text">{prop.text}</p>
                        </div>
                        <div className="container" style={{ marginTop: "10px" }}>

                            <p><small>Posted at : {prop.date}</small></p>
                        </div>
                    </div>
                    <div className="col-sm-1" style={{ paddingTop: "60px" }}>
                        <div>
                            {(JSON.parse(localStorage.getItem('item'))) ?
                                <><i onClick={postLike} className={`fa ${(Liked === true) ? "fa-thumbs-down" : "fa-thumbs-up"}`}></i>
                                    <p><small>{Length}</small></p></>
                                : <div></div>
                            }

                            {prop.userId === user ?
                                <button class="btn btn-default" onClick={deletePost} style={{ marginLeft: "-15px", marginTop: "-15px" }}>
                                    <img src={del} width="20" />
                                </button> : <div></div>
                            }

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Comment