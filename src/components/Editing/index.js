import React, { Component } from 'react';
import './editing.css';
import Searchbar from './Searchbar';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PlaylistPage from '../Playlist/PlaylistPage';

class EditingPlaylist extends Component {
    render() {
        return (
            <div className="editing">
                <Router>
                    <div className="left">
                        <Searchbar accessToken={this.props.accessToken} />
                    </div>
                    <div className="right">
                        <PlaylistPage accessToken={this.props.accessToken} match={this.props.match} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default EditingPlaylist;