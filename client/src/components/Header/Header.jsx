import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Header() {
    return (
        <header className="Header">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/search"
                    className={window.location.pathname === "/search" ? "nav-link active" : "nav-link"}>
                    Search
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;