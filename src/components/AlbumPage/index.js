import React, { Component } from 'react'
import Track from '../track'
import TrackHeader from '../track/trackHeader';
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
        const albumId = this.props.albumId ? this.props.albumId : this.props.match.params.albumId;
        const BASE_URL = `https://api.spotify.com/v1/albums/${albumId}`
        let trackResponse = await fetch(BASE_URL, {
            headers: { 'Authorization': 'Bearer ' + accessToken },
            method: 'GET'
        })
        let trackResult = await trackResponse.json()
        this.setState({ album: trackResult, tracks: trackResult.tracks.items })
    }

    showPlaylist(uri) {
        const popup = document.querySelector(".playlist")
        popup.style.display = "block"
        this.setState({ uri })
    }

    render() {
        const { playlistId, pathname } = this.props
        const { album, tracks } = this.state;
        return (
            <div className="container album">
                <div className="row">
                    <div className="col-md-3 album-cover">
                        <img alt="album cover" className="album-cover-img" src={album?.images[1]?.url} />
                    </div>
                    <div className="col-md-9 album-info">
                        <div className="album-info-year">{album?.release_date.slice(0, 4)}</div>
                        <div className="album-info-name">{album?.name}</div>
                    </div>
                </div>
                <div className="tracks-section">
                    <TrackHeader />
                    {
                        tracks.map((track, index) =>
                            <Track key={index}
                                index={index}
                                track={track}
                                draggable="true"
                                accessToken={this.props.accessToken}
                                playlistId={playlistId}
                                updatePlaylist={this.props.updatePlaylist}
                                pathname={pathname}
                            />
                        )
                    }
                </div>
            </div>
        )
    }
}


export default Album;