import React, { Component } from 'react';
import { Link } from "react-router-dom";
import defaultImg from '../components/images/defaultImg.jpg'

class MyPage extends Component {
    state = {
        playlists: null
    }

    componentDidMount() {
        this.getMyPlaylists()
    }

    getMyPlaylists = async () => {
        const accessToken = this.props.accessToken
        const BASE_URL = 'https://api.spotify.com/v1/me/playlists'
        let playlistResponse = await fetch(BASE_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'GET'
        })
        let playlistResult = await playlistResponse.json()
        this.setState({ playlists: playlistResult.items })

    }

    render() {
        return (
            <div className="container-fluid playlist--me">
                <button className="playlist-addnew">New playlist</button>
                <div className="row">
                    {this.state.playlists
                        &&
                        this.state.playlists.map((playlist, index) =>
                            <div key={index} className="col-3 playlist-item">
                                <div className="playlist-item-cover">
                                    {
                                        playlist.images[0]
                                            ? <img alt="playlist cover" className="playlist-item-cover-img" src={playlist.images[0].url} />
                                            : <img alt="playlist default cover" className="playlist-item-cover-img" src={defaultImg} />
                                    }
                                </div>
                                <div className="playlist-item-name">
                                    <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
                                </div>
                            </div>)}
                </div>
            </div>
        );
    }
}

export default MyPage;