import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    useEffect(() => {
        let app = document.getElementById("App")
        let currTheme = sessionStorage.getItem("theme")
        let disabledTheme = currTheme == 'dark' ? 'light' : 'dark'
        if (currTheme) {
            if (!app.classList.contains(currTheme)) {
                app.classList.add(currTheme)
                app.classList.remove(disabledTheme)
            }
        }
    })

    function toggleThemes() {
        let app = document.getElementById("App")
        app.classList.toggle("dark")
        app.classList.toggle("light")
        let currTheme = app.classList.contains("light") ? "light" : "dark"
        sessionStorage.setItem("theme", currTheme)
    }

    function goBack() {
        window.history.back();
    }

    function logOut() {
        if (window.confirm("Are you sure you want to log out?")) {
            sessionStorage.removeItem('token')
            window.location = window.location.href.includes('localhost')
                        ? "http://localhost:3000"
                        : "https://playlistpro-spotify.herokuapp.com"
        }
    }

    return (
        <div className="nav">
            <div className="nav-back" onClick={goBack}>
                <i className="fa fa-chevron-left"></i>
            </div>
            <label className="nav-switch">
                <input type="checkbox" />
                <span className="nav-switch-slider" onClick={toggleThemes}></span>
            </label>
            <div>
                <div className="nav-button">
                    <Link to='/'>
                        <i className="fas fa-user"></i>
                    </Link>
                </div>
                <div className="nav-button signout" onClick={logOut}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        </div>
    )

}
