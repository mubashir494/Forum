import React, { useContext, useState } from "react";
import { Route, Redirect, Navigate } from "react-router-dom"
import ContextState from "../Context/ContextState";


const ProtectiveRoute = ({ children }) => {
    
    const context = useContext(ContextState);
    const log = localStorage.getItem("item")
    if (!log) {
        return <Navigate to="/login" />
    }
    else {

        return children
    }

}
export default ProtectiveRoute