import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import users from '../../../img/user.png';
import del from '../../../img/del.png'
import "../../../css/image.css"
import { Link } from "react-router-dom";
import { delPost, dislike, like } from "../../../api/api";
import ContextState from "../../Context/ContextState"
import "../../../css/like.css"
const Post = (prop) => {
    const [user, setuser] = useState("")
    const [Liked, setLiked] = useState(false)
    const [Length, setLength] = useState(0)

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
            else {
                setLiked(false)
            }
        }
    }, [prop.page])


    const deletecomment = (e) => {
        delPost(prop.id).then((response) => {
            window.location.reload(false)
            context.errorFun(response.data.message)

        }).catch((error) => {

            context.errorFun(error.message)
        })
    }
    const postLike = () => {
        const userId = JSON.parse(localStorage.getItem('item')).id;
        if (Liked === false) {

            like(prop.id, userId).then((response) => {
                setLiked(true)
                setLength(Length + 1);
            }).catch((error) => {
                context.errorFun(error.message)
            })
        }
        else {
            dislike(prop.id, userId).then((response) => {
                setLiked(false)
                setLength(Length - 1)
            }).catch(error => {
                context.errorFun(error.message)
            })
        }
    }
    return (
        <div className="container my-3" >
            <div className="card " style={{ maxWidth: "8000px", border: "1px solid black" }} >
                <div className="card-body row" >
                    <div className="col-sm-2" >
                        <div className="container" style={{ paddingTop: "20px", marginLeft: "20px" }}>

                            <img src={users} className="rounded  img-fluid " alt="Picture not found" height={130} width={100} />
                            <p><small>Posted by : {prop.createdBy}</small></p>
                        </div>

                    </div>
                    <div className="col-sm-9">
                        <div className="container" style={{ padding: "20px" }}>

                            <h2 className="card-title" onClick={`${prop.id}`} ><Link to={`/${prop.id}`} style={{ color: "black", textDecoration: "none" }}>{(prop.title.length > 40 ? prop.title.substring(0, 39) + "..." : prop.title)}</Link></h2>
                            <p className="card-text">{prop.text.length > 80 ? prop.text.substring(0, 79) + ".." : prop.text}</p>
                            <p><small>Posted at : {prop.date}</small></p>
                        </div>
                    </div>
                    <div className="col-sm-1 response" style={{ paddingTop: "20px",maxWidth:"50px"}}>
                        <div >
                            {(JSON.parse(localStorage.getItem('item'))) ?
                                <><i onClick={postLike} className={`fa ${(Liked === true) ? "fa-thumbs-down" : "fa-thumbs-up"}`}></i>
                                    <p><small>{Length}</small></p></>
                                : <div></div>
                            }
                            {prop.userId === user && (JSON.parse(localStorage.getItem('item'))) ?
                                <button className="btn btn-default" onClick={deletecomment} style={{ marginLeft: "-15px", marginTop: "-15px" }}>
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
export default Post