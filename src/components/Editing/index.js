import React, { Component } from 'react';
import './editing.css';
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import PlaylistPage from '../Playlist/PlaylistPage';
import AlbumPage from '../AlbumPage';
import ArtistPage from '../ArtistPage';
import Searchbar from './Searchbar';
import defaultImg from '../images/defaultImg.jpg'

class EditingPlaylist extends Component {
    state = {
        items: [],
        coverURL: ''
    }

    componentDidMount() {
        requestAnimationFrame(()=> {this.showLeftSide()}); 
        this.updatePlaylist()
    }

    showLeftSide() {
        document.getElementById("left").style.width = "50vw"
        document.getElementById("right").style.marginLeft = "50vw"
    }

    updatePlaylist = async () => {
        const accessToken = JSON.parse(sessionStorage.getItem('token'))
        const playlistId = this.props.playlistId ? this.props.playlistId : this.props.match.params.playlistId;
        const BASE_URL = `https://api.spotify.com/v1/playlists/${playlistId}`
        let playlistResponse = await fetch(BASE_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'GET'
        })
        let playlistResult = await playlistResponse.json()

        this.setState({
            items: playlistResult.tracks ? playlistResult.tracks.items : [],
            coverURL: playlistResult?.images?.length > 0 ? playlistResult.images[0].url : defaultImg
        })
        sessionStorage.setItem(`playlist${playlistId}`, JSON.stringify(playlistResult))
    }

    render() {
        const pathname = this.props.match.url;
        const playlistId = this.props.match.params.playlistId;
        const { items, coverURL } = this.state;
        return (
            <div className="editing">
                <div id="left">
                    <Switch>
                        <Route exact path={pathname}
                            render={(props) =>
                                <Searchbar {...props} playlistId={playlistId}
                                    accessToken={this.props.accessToken}
                                    match={this.props.match}
                                    updatePlaylist={this.updatePlaylist} />}
                        />
                        <Route path={`${pathname}/album/:albumId`}
                            render={(props) =>
                                <AlbumPage {...props}
                                    accessToken={this.props.accessToken}
                                    playlistId={playlistId}
                                    pathname={pathname}
                                    updatePlaylist={this.updatePlaylist}
                                    pathname={pathname} />}
                        />
                        <Route exact path={`${pathname}/artist/:artistId`}
                            render={(props) =>
                                <ArtistPage
                                    {...props}
                                    accessToken={this.props.accessToken}
                                    playlistId={playlistId}
                                    pathname={pathname}
                                    updatePlaylist={this.updatePlaylist}
                                    pathname={pathname} />}
                        />
                    </Switch>
                </div>
                <div id="right">
                    <PlaylistPage accessToken={this.props.accessToken}
                        match={this.props.match}
                        showEditing={false}
                        items={items}
                        coverURL={coverURL}
                        updatePlaylist={this.updatePlaylist}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(EditingPlaylist);