import React,{useState} from "react";
import ContextState from "./ContextState";
import { isLoggedIn } from "../../api/api";



const States = (props) => {
    const [error, setError] = useState({"message" : ""})
    const [loggedIn,setLoggedIn] = useState(false)
    const [isLoading,setisLoading] = useState(false)

    const errorFun = (message) => {
        
        if(message != null){
            setError({ message: message });
        }
        setTimeout(() => {
            setError({message : ""})
            
        }, 5000);
        
    }

    const checkLoggedIn = () =>{
        const item = localStorage.getItem("item")
        if(item){ 
            setLoggedIn(true)
            const json = JSON.parse(item)
            isLoggedIn(json.token).then((response) => {
                setLoggedIn(true)
            //Loop hole 
            }).catch((error) => {
                setLoggedIn(false)
                localStorage.removeItem("item")
            })
        }
        else{
            setLoggedIn(false)
        }
    
    }

    const logout = () =>{
        localStorage.removeItem("item")
        setLoggedIn(false)
    }
    const getUserLoggedIn= () =>{
        if(loggedIn === true){
            const item = localStorage.getItem("item")
            return JSON.parse(item)
        }
    }
    return(
        <ContextState.Provider value={{error,errorFun,loggedIn,setLoggedIn,checkLoggedIn,logout,getUserLoggedIn,isLoading}}>
            {props.children}
        </ContextState.Provider>
    )
}

export default States;