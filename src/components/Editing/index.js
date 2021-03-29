import React, { Component } from 'react';
import './editing.css';
import Searchbar from './Searchbar';
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import PlaylistPage from '../Playlist/PlaylistPage';
import AlbumPage from '../AlbumPage/Album';
import ArtistPage from '../ArtistPage';

class EditingPlaylist extends Component {
    render() {
        const pathname = this.props.match.url
        const playlistId = this.props.match.params.playlistId;
        return (
            <div className="editing">
                <div className="left">
                    <Switch>
                        <Route path={`${pathname}/album/:albumId`} render={
                            (props) => <AlbumPage {...props} accessToken={this.props.accessToken} playlistId={playlistId} pathname={pathname} />} />
                        <Route path={`${pathname}/artist/:artistId`} render={
                            (props) => <ArtistPage {...props} accessToken={this.props.accessToken} playlistId={playlistId} pathname={pathname}/>} />
                        <Route path={pathname} render={(props) =>
                            <Searchbar {...props} accessToken={this.props.accessToken} />} match={this.props.match} />
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