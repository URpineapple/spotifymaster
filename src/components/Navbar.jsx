import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    state = {
        isDark: true
    }

    toggleThemes = () => {
        if (this.state.isDark) {
            this.setState({ isDark: false }, () => {
                document.documentElement.style.setProperty("--main-bg-color", '#54e487');
                document.documentElement.style.setProperty("--main-tx-color", '#191414');
                document.documentElement.style.setProperty("--header-tx-color", '#edfcf2');
                document.documentElement.style.setProperty("--tx-color-disable", '#3a2e2e');
                document.documentElement.style.setProperty("--lighter-bg-color", '#87ecab');

                document.documentElement.style.setProperty("--nav-bg-color", '#191414');
                document.documentElement.style.setProperty("--nav-tx-color", '#54e487');
                document.documentElement.style.setProperty("--switch-bg-color", '#54e487');
                document.documentElement.style.setProperty("--slider-color", '#191414');
            })
        } else {
            this.setState({ isDark: true }, () => {
                document.documentElement.style.setProperty("--main-bg-color", '#191414');
                document.documentElement.style.setProperty("--main-tx-color", '#edfcf2');
                document.documentElement.style.setProperty("--header-tx-color", '#b7b7b7');
                document.documentElement.style.setProperty("--tx-color-disable", '#b7b7b7');
                document.documentElement.style.setProperty("--lighter-bg-color", '#271f1f');

                document.documentElement.style.setProperty("--nav-bg-color", '#271f1f');
                document.documentElement.style.setProperty("--nav-tx-color", '#edfcf2');
                document.documentElement.style.setProperty("--switch-bg-color", '#edfcf2');
                document.documentElement.style.setProperty("--slider-color", '#271f1f');
            })
        }
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
                        <div>Your Profile</div>
                </Link>
                </div>
            </div>
        )
    }
}
