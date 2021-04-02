import React, { Component } from 'react';
import PlalistTrack from './PlaylistTrack'
import defaultImg from '../images/defaultImg.jpg'
import { Link } from "react-router-dom";
import './playlist.css';

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
        const accessToken = JSON.parse(sessionStorage.getItem('token'))
        const playlistId = this.props.playlistId ? this.props.playlistId : this.props.match.params.playlistId;
        let playlistData;
        if (sessionStorage.getItem(`playlist${playlistId}`)) {
            const storedPlaylist = sessionStorage.getItem(`playlist${playlistId}`)
            playlistData = JSON.parse(storedPlaylist)
        }
        else {
            const BASE_URL = `https://api.spotify.com/v1/playlists/${playlistId}`
            let playlistResponse = await fetch(BASE_URL, {
                headers: { 'Authorization': 'Bearer ' + accessToken },
                method: 'GET'
            })
            playlistData = await playlistResponse.json()
            sessionStorage.setItem(`playlist${playlistId}`, JSON.stringify(playlistData))
        }

        this.setState({
            items: playlistData.tracks ? playlistData.tracks.items : [],
            name: playlistData.name,
            coverURL: playlistData?.images?.length > 0 ? playlistData.images[0].url : defaultImg
        })
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
            name: playlistResult.name,
            coverURL: playlistResult?.images?.length > 0 ? playlistResult.images[0].url : ''
        })

        sessionStorage.setItem(`playlist${playlistId}`, JSON.stringify(playlistResult))
    }

    addTrack = async (trackUri) => {
        const accessToken = this.props.accessToken
        const playlistId = this.props.playlistId ? this.props.playlistId : this.props.match.params.playlistId;
        const URL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUri}`
        let response = await fetch(URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'POST'
        })
        if (typeof (this.props.updatePlaylist) == "function") {
            this.props.updatePlaylist()
        }
        else {
            this.updatePlaylist()
        }
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
        if (typeof (this.props.updatePlaylist) == "function") {
            this.props.updatePlaylist()
        }
        else {
            this.updatePlaylist()
        }
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
        const items = this.props.items ? this.props.items : this.state.items
        const coverURL = this.props.coverURL ? this.props.coverURL : this.state.coverURL
        const playlistId = this.props.playlistId ? this.props.playlistId : this.props.match.params.playlistId;
        return (
            <div className="container playlistpage" id={playlistId} onDrop={e => this.dropTrack(e)} onDragOver={(e) => this.allowDrop(e)}>
                <div className="row playlist-initial">
                    <div className="col-12 col-md-3 playlist-initial-cover">
                        {coverURL
                            ? <img src={coverURL} alt='playlist-cover' />
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
                    ? <>
                        <div className="row playlist-tracks0">
                            <div className="col-1 playlist-tracks-index0">#</div>
                            <div className="col-9 playlist-tracks-title0">TITLE</div>
                            <div className="col-1 playlist-tracks-time"><i className="far fa-clock"></i></div>
                            <div className="col-1"></div>
                        </div>
                        {items.map((item, index) =>
                            <div key={index}>
                                <PlalistTrack
                                    index={index}
                                    track={item.track}
                                    playingIndex={this.state.playingIndex}
                                    changePlayingIndex={this.changePlayingIndex}
                                    deleteTrack={this.deleteTrack} />
                            </div>)}
                    </>
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