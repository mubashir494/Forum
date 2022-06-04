import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ContextState from './Context/ContextState'



export default function Navbar() {
    const context = useContext(ContextState)
    function logout() {
        context.logout()
        context.errorFun("Successfully Logged Out")
    }
    function CreateBtn() {
        return (
            <>
                <li className="nav-item">
                    <a className="nav-link" href="/post">Create</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/dashboard">Dashboard</a>
                </li>
            </>
        )

    }
    function LoginButton() {
        return (
            <>
                <a href="/login" className="btn btn-light">Login</a>
                <a href="/register" className="btn btn-light">Register</a>
            </>
        )
    }
    return (
        <nav className="navbar navbar-expand-lg bg-white">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Forum</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">
                    {context.loggedIn === true ? <CreateBtn /> : <div></div>}
                    {context.loggedIn === false ? <LoginButton /> : <a onClick={logout} className="btn btn-light">Logout</a>}
                    </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        {context.loggedIn === true ? <CreateBtn /> : <div></div>}

                    </ul>
                    <div class="btn-group" role="group" aria-label="Button group example">
                        {context.loggedIn === false ? <LoginButton /> : <a onClick={logout} className="btn btn-light">Logout</a>}

                    </div>
                </div>
            </div>
        </nav>
    )
}
