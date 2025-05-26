import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src="/img/argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
            </Link>
            <div>
                <Link className="main-nav-item" to="/sign-in">
                    <FontAwesomeIcon icon={faUserCircle} /> Sign In
                </Link>
            </div>
        </nav>
    )
}
