import React, { Component } from 'react';
import { Link } from "react-router-dom";
import defaultImg from '../../components/images/defaultImg.jpg'
import PlaylistPage from '../Playlist/PlaylistPage'
import NewPlaylist from '../Playlist/NewPlaylist'

class MyPage extends Component {
    state = {
        playlists: [],
        isCollapsed: true,
        profileUrl: '',
        userID: ''
    }

    componentDidMount() {
        this.getUserData()
        this.getMyPlaylists()
    }

    getMyPlaylists = async () => {
        const accessToken = this.props.accessToken;
        const BASE_URL = 'https://api.spotify.com/v1/me/playlists'
        let playlistResponse = await fetch(BASE_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'GET'
        })
        let playlistResult = await playlistResponse.json()
        this.setState({ playlists: playlistResult.items })
    }

    getUserData = async () => {
        const accessToken = this.props.accessToken
        const BASE_URL = "https://api.spotify.com/v1/me"
        let userResponse = await fetch(BASE_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'GET'
        })
        let userResult = await userResponse.json()
        this.setState({ profileUrl: userResult.images[0].url, userID: userResult.id })
    }

    showNewPlaylist = () => {
        let newPlaylist = document.querySelector(".newPlaylist")
        newPlaylist.style.display = "flex"
    }

    render() {
        const { profileUrl } = this.state
        return (
            <div className="container playlist--me">
                <div><img src={profileUrl ? profileUrl : defaultImg} alt="user profile" className="playlist-profile" /></div>
                <button className="playlist-addnew--me" onClick={() => this.showNewPlaylist()}>New playlist</button>
                <div className="row playlist-item-initial--me">
                    <div className="title">Your Playlists</div>
                    <div className="displayIcons">
                        <i className="fas fa-border-all" onClick={() => this.setState({ isCollapsed: true })}></i>
                        <i className="fas fa-list" onClick={() => this.setState({ isCollapsed: false })}></i>
                    </div>
                </div>
                {this.state.isCollapsed
                    ?
                    <div className="row">
                        {this.state.playlists
                            &&
                            this.state.playlists.map((playlist, index) =>
                                <div key={index} className="col-6 col-md-3 playlist-item--me">
                                    <div className="playlist-item-cover">
                                        <Link to={`/playlist/${playlist.id}`}>
                                            {playlist.images[0]
                                                ? <img alt="playlist cover" className="playlist-item-img--me" src={playlist.images[0].url} />
                                                : <img alt="playlist default cover" className="playlist-item-img--me" src={defaultImg} />
                                            }
                                        </Link>
                                    </div>
                                    <div className="playlist-item-name">
                                        <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
                                    </div>
                                </div>)
                        }
                    </div>
                    :
                    <div className="row">
                        {
                            this.state.playlists.map((item, index) =>
                                <PlaylistPage key={index}
                                    playlistId={item.id}
                                    accessToken={this.props.accessToken}
                                    showEditing={true}
                                />)
                        }
                    </div>
                }
                <NewPlaylist accessToken={this.props.accessToken} />
            </div>
        );
    }
}

export default MyPage;