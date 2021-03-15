import React, { Component } from 'react';
import './editing.css';
import Searchbar from './Searchbar';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class EditingPlaylist extends Component {
    render() {
        return (
            <div className="editing">
                <Router>
                    <div className="left">
                        <Searchbar accessToken={this.props.accessToken} />
                    </div>
                    <div className="right">
                        playlist
               </div>
                </Router>
            </div>
        );
    }
}

export default EditingPlaylist;