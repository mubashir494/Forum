import React, { useState,useContext } from "react";
import { createPost } from "../api/api";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ContextState from "./Context/ContextState";


export default function Form(prop) {
    const navigate = useNavigate()
    const [text, setText] = useState("")
    const [title,setTitle] = useState("")
    const [id,setId] = useState("");
    const context = useContext(ContextState)
    const handleChange = (event) => {
        setText(event.target.value);
    }
    const handletitle = (event) =>{
        setTitle(event.target.value);
      
    }
    

    const createpost = () =>{
        if(context.loggedIn === true){
            const userdetail = JSON.parse(localStorage.getItem("item"));
           
            const obj = {
                "title":title,
                "text" : text,
                "creator" : userdetail.firstName,
                "userId" : userdetail.id
            } 
            
            if(title.length > 100){
                context.errorFun("Heading cannot be more then 100 characters")
            }
            else{

                createPost(obj).then((response) => {
                    navigate(`/${response.data._id}`)
                    context.errorFun("Successfully Created Post")
                }
                ).catch(error => context.errorFun(error.message));
            }
        }
        else{
            context.errorFun("Please Login to post")
        }

        
    }
    return (
        <>
            <h1 className="my-3">Create Post</h1>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label" >Enter the title</label>
                <input type="text" value ={title} className="form-control" onChange={handletitle} id="exampleFormControlInput1" placeholder="Title"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter the text</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="6" placeholder="Please add the text here" onChange={handleChange}>{text}</textarea>
            </div>
            <button className="btn btn-primary" onClick={createpost}>Create the post</button>
        </>
    )
}