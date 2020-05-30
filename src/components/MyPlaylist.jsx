import React, { Component } from 'react'
import defaultImg from '../images/defaultImg.jpg'

export default class MyPlaylist extends Component {
    state = {
        playlists: null,
        addedPlaylist: []
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

    cancelDisplay = () => {
        const popup = document.querySelector(".playlist")
        popup.style.display = "none"

        let arr = this.state.addedPlaylist
        arr.forEach(e => {
            const icon = document.getElementById(e)
            icon.classList.remove('fa-check');
            icon.classList.add('fa-plus');
        })
        this.setState({addedPlaylist: []})
    }

    addTracks = async (e) => {
        const accessToken = this.props.accessToken
        const BASE_URL = 'https://api.spotify.com/v1/playlists/'
        let FETCH_URL = `${BASE_URL}${e}/tracks?uris=${this.props.uri}`
        // console.log('uri', this.props.uri)
        let trackResponse = await fetch(FETCH_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'POST'
        })
        let trackResult = await trackResponse.json()
        console.log('result', trackResult)
        const icon = document.getElementById(e)
        if (icon.classList.contains('fa-plus')) {
            icon.classList.add('fa-check');
            icon.classList.remove('fa-plus');
        }

        let arr = this.state.addedPlaylist
        arr.push(e)
        console.log(arr)
        this.setState({addedPlaylist: arr})
    }

    render() {
        return (
            <div className="container-fluid playlist">
                <div className="playlist-cancel" onClick={this.cancelDisplay}>x</div>
                <div className="playlist-title">Add to playlist</div>
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
                                    <div className="playlist-item-cover--overlay" onClick={event => this.addTracks(event.target.id)}>
                                        <i id={`${playlist.id}`} className="fa fa-plus" ></i>
                                    </div>
                                </div>
                                <div className="playlist-item-name">{playlist.name}</div>
                            </div>)}
                </div>
            </div>
        )
    }
}
