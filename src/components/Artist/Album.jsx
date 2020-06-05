import React, { Component } from 'react'
import MyPlaylist from '../Playlist/MyPlaylist'
import Track from './Track'

class Album extends Component {
    state = {
        tracks: [],
        uri: null
    }

    componentDidMount() {
        this.getTracks()
    }

    getTracks = async () => {
        const accessToken = this.props.accessToken

        const albumId = this.props.albumId;
        const BASE_URL = `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=50`
        let trackResponse = await fetch(BASE_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'GET'
        })
        let trackResult = await trackResponse.json()
        this.setState({ tracks: trackResult.items })
    }


    render() {
        const { album } = this.props
        return (
            <div className="container album">
                <div className="row">
                    <div className="col-md-3 album-cover"><img alt="album cover" className="album-cover-img" src={album.images[1].url} /></div>
                    <div className="col-md-9 album-info">
                        <div className="album-info-year">{album.release_date.slice(0, 4)}</div>
                        <div className="album-info-name">{album.name}</div>
                    </div>
                </div>
                <div className="tracks-section">
                    <div className="row album-tracks0">
                        <div className="col-1 album-tracks-index0">#</div>
                        <div className="col-11 album-tracks-title0">TITLE</div>
                    </div>
                    {
                        this.state.tracks &&
                        this.state.tracks.map((track, index) =>
                            <Track key={index} index={index} name={track.name} previewUrl={track.preview_url} />
                        )
                    }
                </div>
                <MyPlaylist uri={this.state.uri} accessToken={this.props.accessToken} />
            </div>
        )
    }
}


export default Album;