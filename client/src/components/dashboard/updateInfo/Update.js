import React, { useState, useContext, useEffect } from "react";
import ContextState from "../../Context/ContextState";
import { validEmail, validPassword } from "../../../helper/Regex";
import { updateUser } from "../../../api/api";

const Update = () => {
    const currentUser = JSON.parse(localStorage.getItem('item'));
    const [firstName, setFirstName] = useState({ firstName: currentUser.firstName, valid: 1 })
    const [lastName, setLastName] = useState({ lastName: currentUser.lastName, valid: 1 });
    const [email, setEmail] = useState({ email: currentUser.email, valid: 1 })
    const [password, setPassword] = useState({ password: "", valid: 0 })
    const error = useContext(ContextState);


    const handleFirstName = (event) => {
        let text = event.target.value;
        
        if (text.split(" ").length === 1 && (text.length <= 20 && text.length >= 2)) {
            setFirstName({
                firstName: text,
                valid: 1
            })
        }
        else {
            setFirstName({
                firstName: text,
                valid: 0
            })
        }
    }

    const handleLastName = (event) => {
        let text = event.target.value;
      
        if (text.split(" ").length === 1 && (text.length <= 20 && text.length >= 2)) {
            setLastName({
                lastName: text,
                valid: 1
            })
        }
        else {
            setLastName({
                lastName: text,
                valid: 0
            })
        }
    }
    const handleEmail = (event) => {
        let text = event.target.value;
        if (validEmail.test(text)) {
            setEmail({
                email: text,
                valid: 1
            })
        }
        else {
            setEmail({
                email: text,
                valid: 0
            })
        }
    }
    const handlePassword = (event) => {
        let text = event.target.value;
        if (validPassword.test(text)) {
            setPassword({
                password: text,
                valid: 1
            })
        }
        else {
            setPassword({
                password: text,
                valid: 0
            })
        }
    }
    const onclickHandler = (e) => {
        e.preventDefault()
        if (firstName.valid === 1 && lastName.valid === 1 && email.valid === 1 && password.valid === 1) {
            const users = {
                firstName: firstName.firstName,
                lastName: lastName.lastName,
                email: email.email,
                password: password.password,

            }
          
            updateUser(currentUser.token,users).then((Response) => {
                if (Response.status === 200) {
                    error.errorFun("Successfully Updated the User")
                    const localStorageUser = {
                        id : Response.data[0]._id,
                        firstName: firstName.firstName,
                        lastName: lastName.lastName,
                        email: email.email,
                        createdAt : Response.data[0].createdAt,
                        token : currentUser.token
                    }
                    localStorage.setItem('item',JSON.stringify(localStorageUser))
                }
            }).catch((err) =>{
                if (err.response) {
              
                    error.errorFun(err.response.data.message)
                  }
                  else{
                      
                      error.errorFun(err.message)
                  }
            })
        }

    }
    return (
        <div className="container">

            <form onSubmit={onclickHandler}>
                <div className="mb-3">
                    <label htmlFor="validationCustom01" className="form-label">First name</label>
                    <input type="text" defaultValue={firstName.firstName} onChange={handleFirstName} className="form-control" id="validationCustom01" required />
                    <p><small style={{ color: "red" }}>{(firstName.valid === 1) ? 'Looks good !' : 'Invalid Name'}</small></p>

                </div>
                <div className="mb-3">
                    <label htmlFor="validationCustom01" className="form-label">Last name</label>
                    <input type="text" defaultValue={lastName.lastName} onChange={handleLastName} className="form-control" id="validationCustom01" required />
                    <p><small style={{ color: "red" }}>{(lastName.valid === 1) ? 'Looks good !' : 'Invalid Name'}</small></p>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                    <input type="email" defaultValue={email.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleEmail} />
                    <p><small style={{ color: "red" }}>{(email.valid === 1) ? 'Looks good !' : 'Invalid email'}</small></p>

                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={handlePassword} />
                    <p><small style={{ color: "red" }}>{(password.valid === 1) ? 'Looks good !' : 'Invalid password'}</small></p>

                </div>

                <button type="submit" className="btn btn-primary"  >Update</button>

            </form>
        </div>
    )
}
export default Update