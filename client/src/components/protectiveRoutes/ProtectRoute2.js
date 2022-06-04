import React from "react";
import { Navigate } from "react-router-dom"


const ProtectiveRoute2 = ({ children }) => {
    const log = localStorage.getItem("item")
    if (log) {
        return <Navigate to="/" />
    }
    else {
        return children
    }

}
export default ProtectiveRoute2