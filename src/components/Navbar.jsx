import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    function toggleThemes() {
        let app = document.getElementById("App")
        app.classList.toggle("dark")
        app.classList.toggle("light")
    }

    function goBack() {
        window.history.back();
    }

    return (
        <div className="nav">
            <div className="nav-back" onClick={goBack}>
                <i className="fa fa-chevron-left"></i>
            </div>
            <label className="nav-switch" >
                <input type="checkbox" />
                <span className="nav-switch-slider" onClick={toggleThemes}></span>
            </label>
            <div className="nav-profile">
                <Link to='/'>
                    <div><i className="fas fa-user"></i></div>
                </Link>
            </div>
        </div>
    )

}
