import React, { useState,useContext } from "react";
import { login } from "../../api/api";
import ContextState from "../Context/ContextState";

const Login = () => {
    const context = useContext(ContextState);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const handleEmail = (e) =>{
        setEmail(e.target.value)
    }
    const handlPassword = (e) =>{
        setPassword(e.target.value)
    }
    const loginAttempt = (e) => {
        e.preventDefault()
        const user = {
            email,
            password
        }
        login(user).then((response) => {
            localStorage.setItem('item',JSON.stringify(response.data))
            context.setLoggedIn(true)
            context.errorFun("Successfully Logged In")
        }).catch((error) =>{
            if (error.response) {
                context.errorFun(error.response.data.message);
              } else if (error.request) {
                context.errorFun("The request was made but no response was received");
              } else {
                context.errorFun(error.message);
              }
        })


    }
    return (

        <>
        <di className="container">

        <h1 style={{ marginTop: 60 }}>Login</h1>
        <form style={{ marginTop: 60 }} onSubmit={loginAttempt}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" onChange={handleEmail} id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" onChange={handlPassword}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </di>
        </>
    )
}
export default Login