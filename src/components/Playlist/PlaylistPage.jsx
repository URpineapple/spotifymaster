import React, { Component } from 'react';
import PlalistTrack from './PlaylistTrack'

class PlaylistPage extends Component {
    state = {
        items: [],
        name: '',
        nameText: '',
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
        console.log('items', playlistResult.tracks.items)
        this.setState({
            items: playlistResult.tracks.items,
            name: playlistResult.name,
            coverURL: playlistResult.images[0].url
        })
    }

    deleteTrack = async (uri, index) => {
        console.log("delete function triggered")
        const param = { "tracks": [{ "uri": uri, "positions": [index] }] }
        const accessToken = this.props.accessToken
        const playlistId = this.props.playlistId ? this.props.playlistId : this.props.match.params.playlistId;
        const BASE_URL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
        let playlistResponse = await fetch(BASE_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            body: JSON.stringify(param),
            method: 'DELETE'
        })
        let playlistResult = await playlistResponse.json()
        console.log('playlistResult', playlistResult)
        this.getPlaylistItem()
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

                        <div className="playlist-name">
                            {this.state.isEditing
                                ? <input onBlur={() => this.setState({ isEditing: false })} value={this.state.name} autoFocus />
                                : <div onClick={() => this.setState({ isEditing: true })}>{this.state.name}</div>
                            }
                        </div>
                    </div>
                </div>
                {this.state.items &&
                    this.state.items.map((item, index) => <div key={index}>
                        <PlalistTrack index={index} track={item.track} playingIndex={this.state.playingIndex} changePlayingIndex={this.changePlayingIndex} deleteTrack={this.deleteTrack} />
                    </div>)}
            </div>
        );
    }
}

export default PlaylistPage;