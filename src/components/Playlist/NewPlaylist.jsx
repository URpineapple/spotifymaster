import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class NewPlaylist extends Component {
    state = {
        newName: ''
    }
    componentDidMount() {
        this.getUserID()
    }

    getUserID = async () => {
        const accessToken = this.props.accessToken
        const BASE_URL = "https://api.spotify.com/v1/me"
        let userResponse = await fetch(BASE_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'GET'
        })
        let userResult = await userResponse.json()
        this.setState({ userID: userResult.id })
    }

    createPlaylist = async () => {
        let name = this.state.newName ? this.state.newName : 'New Playlist'
        const userID = this.state.userID
        const accessToken = this.props.accessToken
        const param = { "name": name }
        const BASE_URL = `https://api.spotify.com/v1/users/${userID}/playlists`
        let userResponse = await fetch(BASE_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'POST',
            body: JSON.stringify(param)
        })
        let userResult = await userResponse.json()
        this.setState({ newPlaylistID: userResult.id })
        console.log('userResult', userResult)
    }

    handleChange = event => {
        this.setState({ newName: event.target.value })
    }

    cancelPlaylist = () => {
        let newPlaylist = document.querySelector(".newPlaylist")
        newPlaylist.style.display = "none"
        this.setState({ newPlaylistID: null })
    }

    render() {
        if (this.state.newPlaylistID) {
            return <Redirect to={`/playlist/${this.state.newPlaylistID}`} />
        }
        else {
            return (
                <div className="newPlaylist">
                    <div className="newPlaylist-exit"><i className="fas fa-times" onClick={() => this.cancelPlaylist()}></i></div>
                    <div className="newPlaylist-title">Create New Playlist</div>
                    <div className="newPlaylist-input">
                        <div>Playlist Name</div>
                        <input id="newPlaylist" placeholder="New Playlist" onChange={event => this.handleChange(event)} />
                    </div>
                    <div className="newPlaylist-buttons">
                        <button className="button--cancel" onClick={() => this.cancelPlaylist()}>CANCEL</button>
                        <button className="button--create" onClick={() => this.createPlaylist()}>CREATE</button>
                    </div>
                </div>
            );
        }

    }
}

export default NewPlaylist;