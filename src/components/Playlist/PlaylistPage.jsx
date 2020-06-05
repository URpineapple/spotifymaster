import React, { Component } from 'react';
import PlalistTrack from './PlaylistTrack'

class PlaylistPage extends Component {
    state = {
        items: [],
        name: '',
        coverURL: null,
        playingIndex: null
    }

    componentDidMount() {
        this.getPlaylistItem()
    }

    changePlayingIndex = (index) => {
        this.setState({playingIndex: index})
    }


    getPlaylistItem = async () => {
        const accessToken = this.props.accessToken
        const playlistId = this.props.match.params.playlistId;
        const BASE_URL = `https://api.spotify.com/v1/playlists/${playlistId}`
        let playlistResponse = await fetch(BASE_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'GET'
        })
        let playlistResult = await playlistResponse.json()

        this.setState({
            items: playlistResult.tracks.items,
            name: playlistResult.name,
            coverURL: playlistResult.images[0].url
        })
    }

    render() {
        return (
            <div className="container playlistpage">
                <div className="row playlist-initial">
                    <div className="col-12 col-md-3 playlist-initial-cover">
                        <img src={this.state.coverURL} alt='playlist-cover' />
                    </div>
                    <div className="col-12 col-md-9 playlist-initial-info">
                        <div className="playlist-label">Playlist</div>
                        <div className="playlist-name">{this.state.name}</div>
                    </div>
                </div>
                {this.state.items &&
                    this.state.items.map((item, index) => <div key={index}>
                        <PlalistTrack index={index} track={item.track} playingIndex={this.state.playingIndex} changePlayingIndex={this.changePlayingIndex} />
                    </div>)}
            </div>
        );
    }
}

export default PlaylistPage;