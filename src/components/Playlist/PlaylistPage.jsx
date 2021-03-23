import React, { Component } from 'react';
import PlalistTrack from './PlaylistTrack'
import defaultImg from '../images/defaultImg.jpg'
import { Link } from "react-router-dom";

class PlaylistPage extends Component {
    state = {
        items: [],
        name: '',
        newName: '',
        isEditing: false,
        coverURL: null,
        playingIndex: null
    }

    componentDidMount() {
        this.getPlaylistItem()
    }

    changePlayingIndex = (index) => {
        this.setState({ playingIndex: index })
    }

    getPlaylistItem = async () => {
        const accessToken = this.props.accessToken
        const playlistId = this.props.playlistId ? this.props.playlistId : this.props.match.params.playlistId;
        const BASE_URL = `https://api.spotify.com/v1/playlists/${playlistId}`
        let playlistResponse = await fetch(BASE_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'GET'
        })
        let playlistResult = await playlistResponse.json()

        this.setState({
            items: playlistResult.tracks ? playlistResult.tracks.items : [],
            name: playlistResult.name,
            coverURL: playlistResult?.images?.length > 0 ? playlistResult.images[0].url : ''
        })
    }

    deleteTrack = async (uri, index) => {
        const param = { "tracks": [{ "uri": uri, "positions": [index] }] }
        const accessToken = this.props.accessToken
        const playlistId = this.props.playlistId ? this.props.playlistId : this.props.match.params.playlistId;
        const BASE_URL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
        let response = await fetch(BASE_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            body: JSON.stringify(param),
            method: 'DELETE'
        })
        this.getPlaylistItem()
    }

    changePlaylistName = () => {
        const param = { "name": this.state.newName }
        const accessToken = this.props.accessToken
        const playlistId = this.props.playlistId ? this.props.playlistId : this.props.match.params.playlistId;
        const URL = `https://api.spotify.com/v1/playlists/${playlistId}`
        fetch(URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            body: JSON.stringify(param),
            method: 'PUT'
        })

        this.setState({ isEditing: false, name: this.state.newName }, () => this.getPlaylistItem())
    }

    keypressHandler = event => {
        if (event.key === "Enter") {
            this.changePlaylistName()
            this.getPlaylistItem()
        }
    }

    handleChange = event => {
        this.setState({ newName: event.target.value })
    }

    addTrack = async (trackUri) => {
        const accessToken = this.props.accessToken
        const playlistId = this.props.playlistId ? this.props.playlistId : this.props.match.params.playlistId;
        const URL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUri}`
        let response = await fetch(URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'POST',
            // mode: 'no-cors'
        })
        this.getPlaylistItem()
    }

    allowDrop = (e) => {
        e.preventDefault();
    }

    dropTrack = (e) => {
        e.preventDefault();
        let trackUri = e.dataTransfer.getData('text');
        this.addTrack(trackUri)
    }

    render() {
        const { showEditing } = this.props
        const { items } = this.state
        const playlistId = this.props.playlistId ? this.props.playlistId : this.props.match.params.playlistId;
        return (
            <div className="container playlistpage" onDrop={e => this.dropTrack(e)} onDragOver={(e) => this.allowDrop(e)}>
                <div className="row playlist-initial">
                    <div className="col-12 col-md-3 playlist-initial-cover">
                        {this.state.coverURL
                            ? <img src={this.state.coverURL} alt='playlist-cover' />
                            : <img src={defaultImg} alt='playlist-cover' />
                        }
                    </div>
                    <div className="col-12 col-md-9 playlist-initial-info">
                        <div className="playlist-label">Playlist</div>
                        <div className="playlist-name">
                            {this.state.isEditing
                                ? <input
                                    value={this.state.newName}
                                    onBlur={() => this.changePlaylistName()}
                                    onChange={event => this.handleChange(event)}
                                    onKeyPress={event => this.keypressHandler(event)}
                                    autoFocus />
                                : <div onClick={() => this.setState({ isEditing: true, newName: this.state.name })}>{this.state.name}</div>
                            }
                        </div>
                        {showEditing &&
                            <div className="add-section">
                                <Link to={`/editing/${playlistId}`}>
                                    <button className="add-btn">Add new songs</button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
                {items.length > 0
                    ? items.map((item, index) =>
                        <div key={index}>
                            <PlalistTrack index={index} track={item.track} playingIndex={this.state.playingIndex} changePlayingIndex={this.changePlayingIndex} deleteTrack={this.deleteTrack} />
                        </div>)
                    : <div className="playlist-empty">
                        <div>It's a bit empty here. </div>
                        <div>Let's find some songs for your playlist.</div>
                    </div>
                }
            </div>
        );
    }
}

export default PlaylistPage;