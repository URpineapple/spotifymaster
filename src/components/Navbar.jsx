import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    state = {
        isDark: true
    }

    toggleThemes = () => {
        let app = document.getElementById("App")
        app.classList.toggle("dark")
        app.classList.toggle("light")
    }

    render() {
        return (
            <div className="nav">
                <div className="nav-back">
                    <Link to={'/'}><i className="fa fa-chevron-left"></i></Link>
                </div>
                <label className="nav-switch" >
                    <input type="checkbox" />
                    <span className="nav-switch-slider" onClick={this.toggleThemes}></span>
                </label>
                <div className="nav-profile">
                    <Link to='/'>
                        <div><i className="fas fa-user"></i></div>
                    </Link>
                </div>
            </div>
        )
    }
}
