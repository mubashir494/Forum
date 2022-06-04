import React, { useState,useContext } from "react";
import { validEmail,validPassword } from "../../helper/Regex";
import ContextState from "../Context/ContextState";
import { registerUser } from "../../api/api";

const Register = () => {
    const [firstName, setFirstName] = useState({firstName : "",valid : 0})
    const [lastName, setLastName] = useState({lastName : "",valid : 0});
    const [email, setEmail] = useState({email : "",valid : 0})
    const [password, setPassword] = useState({password : "",valid : 0})
    const error = useContext(ContextState);


    const handleFirstName = (event) => {
        let text = event.target.value;
        
        if (text.split(" ").length === 1 && (text.length<=20 && text.length>=2)) {
            setFirstName({
                firstName : text,
                valid : 1
            })
        }
        else{
            setFirstName({
                firstName : text,
                valid : 0
            })
        }
    }

    const handleLastName = (event) => {
        let text = event.target.value;
    
        if (text.split(" ").length === 1 && (text.length<=20 && text.length>=2)) {
            setLastName({
                lastName : text,
                valid : 1
            })
        }
        else{
            setLastName({
                lastName : text,
                valid : 0
            })
        }
    }
    const handleEmail = (event) => {
        let text = event.target.value;
        if (validEmail.test(text)) {
            setEmail({
                email : text,
                valid : 1
            })
        }
        else{
            setEmail({
                email : text,
                valid : 0
            })
        }
    }
    const handlePassword = (event) => {
        let text = event.target.value;
        if (validPassword.test(text)) {
            setPassword({
                password : text,
                valid : 1
            })
        }
        else{
            setPassword({
                password : text,
                valid : 0
            })
        }
    }

    const onclickHandler = (e) => {
        
        e.preventDefault();
        if(firstName.valid === 1 && lastName.valid === 1 && email.valid === 1 && password.valid === 1){
            const users = {
                firstName : firstName.firstName,
                lastName : lastName.lastName,
                email : email.email,
                password : password.password,
                
            }
           
            registerUser(users).then((response) => {
                if(response.status === 200){
                    error.setLoggedIn(true)
                    localStorage.setItem('item',JSON.stringify(response.data))
                    error.errorFun("Successfully Registered")
                }
                
            }).catch((errors)=>{
                if(errors.response){
                    error.errorFun(errors.response.data.message)
                }
                else{
                  
                    error.errorFun(errors.message)
                }
            })
        }else{
            error.errorFun("Invalid Inputs")
            
        }
    }
    


    return (
        <div className="container">

            <form style={{ marginTop: 60 }} onSubmit={onclickHandler}>
                <div className="mb-3">
                    <label htmlFor="validationCustom01" className="form-label">First name</label>
                    <input type="text" onChange={handleFirstName} className="form-control" id="validationCustom01" required />       
                    <p><small style={{color : "red"}}>{(firstName.valid === 1) ? 'Looks good !':'Invalid Name'}</small></p>
                
                </div>
                <div className="mb-3">
                    <label htmlFor="validationCustom01" className="form-label">Last name</label>
                    <input type="text" onChange={handleLastName} className="form-control" id="validationCustom01" required />
                    <p><small style={{color : "red"}}>{(lastName.valid === 1) ? 'Looks good !':'Invalid Name'}</small></p>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleEmail} />
                    <p><small style={{color : "red"}}>{(email.valid === 1) ? 'Looks good !':'Invalid email'}</small></p>

                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={handlePassword} />
                    <p><small style={{color : "red"}}>{(password.valid === 1) ? 'Looks good !':'Invalid password'}</small></p>

                </div>

                <button type="submit" className="btn btn-primary"  >Register</button>

            </form>
        </div>
    )
}
export default Register