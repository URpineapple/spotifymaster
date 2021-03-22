import React, { Component } from 'react';
import './editing.css';
import Searchbar from './Searchbar';
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import PlaylistPage from '../Playlist/PlaylistPage';
import AlbumPage from '../Artist/Album';
import ArtistProfile from '../Artist/ArtistProfile';

class EditingPlaylist extends Component {
    render() {
        const pathname = this.props.match.url
        return (
            <div className="editing">
                <div className="left">
                    <Switch>
                        <Route exact path={pathname} render={() =>
                            <Searchbar accessToken={this.props.accessToken} />} />
                        <Route path={`${pathname}/test`} component={<p>Test</p>} />
                        <Route path={`${pathname}/album/:albumId`} render={
                            (props) => <AlbumPage {...props} accessToken={this.props.accessToken} />} />
                        <Route path={`${pathname}/artist/:artistId`} render={
                            (props) => <ArtistProfile {...props} accessToken={this.props.accessToken} />} />

                    </Switch>
                </div>
                <div className="right">
                    <PlaylistPage accessToken={this.props.accessToken} match={this.props.match} showEditing={false} />
                </div>
            </div>
        );
    }
}

export default withRouter(EditingPlaylist);